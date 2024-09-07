import type { Map as YMap } from 'yjs'

import { Activity } from '@/app/constants/Activity';
import { ActivityFieldText, ActivityFieldList } from '@/app/constants/CustomProps';


export function activitySorter(a: Activity | undefined, b: Activity | undefined){
    if(a && b){
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    }else{
        return 0;
    }
}


export function randomColor() {
    const hue = Math.random() * 360
    const value = Math.random() * 0.5 + 0.25
    return `hsl(${hue}, 75%, ${value * 100}%)`
}


export function getCookie(_document: Document, name: string) {
    var match = _document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
}


export async function checkLoginStatus(document: Document): Promise<boolean> {
    let email = getCookie(document, "ontology_auth_email");
    let access = getCookie(document, "ontology_auth_access");
    if(email && access){
        try{
            let response = await fetch(process.env.NEXT_PUBLIC_API_PATH+'/verify',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    access_token: access,
                })
            })
            if (!response.ok) throw response.statusText;
            const res_bool = await response.json();
            return res_bool;
            
        }catch{
            return false;
        }
    }
    else{
        return false;
    }
    
}


export function updateActivitiesText(_value: string, _currentActivity: Activity[], _activities: YMap<Activity[]>, _propertyName: ActivityFieldText){
    _currentActivity[0][_propertyName] = _value;
    _activities.set(_currentActivity[0].uuid, _currentActivity);
}


function typeRelationMap(_switch: ActivityFieldList): ActivityFieldList {
    switch(_switch){
        case 'uses':
            return 'subactivities'
        case 'subactivities':
            return 'uses'
        case 'specializations':
            return 'generalizations'
        case 'generalizations':
            return 'specializations'
    }
}


export function deleteActivity(_activities: YMap<Activity[]>, UUIDtoDelete: string,){
    const _activityToDelete = _activities.get(UUIDtoDelete)
    if (_activityToDelete){
        _activities.delete(UUIDtoDelete);
    }
}


function removeRelatedEntries(_activities: YMap<Activity[]>, changedUUID: string, type: ActivityFieldList, originUUID: string){
    console.log('drop', changedUUID, type, originUUID)
    const _otherActivity = _activities.get(changedUUID)
    if (_otherActivity){
        let newArr = _otherActivity[0][typeRelationMap(type)];
        newArr = newArr.filter(item => item !== originUUID)
        _otherActivity[0][typeRelationMap(type)] = newArr;
        _activities.set(_otherActivity[0].uuid, _otherActivity);
    }
}


function addRelatedEntries(_activities: YMap<Activity[]>, changedUUID: string, type: ActivityFieldList, originUUID: string){
    console.log('add', changedUUID, type, originUUID)
    const _otherActivity = _activities.get(changedUUID)
    if (_otherActivity){
        _otherActivity[0][typeRelationMap(type)].push(originUUID);
        _activities.set(_otherActivity[0].uuid, _otherActivity);
    }
}


export function cleanUpRelatedBeforeDelete(uuidToClean: string){
    
}


export function updateActivitiesList(_value: Array<string>, _currentActivityUUID: string, _activities: YMap<Activity[]>, _propertyName: ActivityFieldList){
    const _currentActivity = _activities.get(_currentActivityUUID);
    if (_currentActivity){
        const curActUUID = _currentActivity[0].uuid;
        const curActArray = _currentActivity[0][_propertyName];
        const curActArrayLen = curActArray.length;
        const newActArrayLen = _value.length;
        console.log(curActUUID, curActArrayLen, newActArrayLen)
        if(curActArrayLen > newActArrayLen){
            let difference = curActArray.filter(x => !_value.includes(x));
            removeRelatedEntries(_activities, difference[0], _propertyName, curActUUID);
        }else{
            let difference = _value.filter(x => !curActArray.includes(x));
            addRelatedEntries(_activities, difference[0], _propertyName, curActUUID);
        }
        _currentActivity[0][_propertyName] = _value;
        _activities.set(_currentActivity[0].uuid, _currentActivity);
        }
}
