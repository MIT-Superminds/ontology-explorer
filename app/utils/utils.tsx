import type { Map as YMap } from 'yjs'

import { Activity } from '@/app/constants/Activity';
import { ActivityFieldText, ActivityFieldList } from '@/app/constants/CustomProps';


export function randomColor() {
    const hue = Math.random() * 360
    const value = Math.random() * 0.5 + 0.25
    return `hsl(${hue}, 75%, ${value * 100}%)`
}


function getCookie(_document: Document, name: string) {
    var match = _document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
}


export async function checkLoginStatus(document: Document): Promise<boolean> {
    let response = await fetch(process.env.API_PATH+"/checkUser",
        {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "access_token": getCookie(document, "ontology_access_token")
            })
        }
    );
    let data = await response.json();
    return data;
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
