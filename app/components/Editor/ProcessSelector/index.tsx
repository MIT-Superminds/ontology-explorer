'use client'

import React, { SyntheticEvent, useState } from 'react';
import type { Map as YMap } from 'yjs'
import { Dropdown, DropdownProps, DropdownItemProps } from 'semantic-ui-react'

import { Activity } from '@/app/constants/Activity';
import { ActivityFieldList } from '@/app/constants/CustomProps';
import { updateActivitiesList } from '@/app/utils/utils';

interface ProcessSelectorProps {
    createActivity: Function,
    currentActivity: Activity[],
    activities: YMap<Activity[]>,
    fieldTitle: string,
    propertyName: ActivityFieldList,
    description: string,
}

const jumpToActivity = () => {
    console.log('click');
}

function checkOption(_uuid: string, _activities: YMap<Activity[]>): DropdownItemProps {
    const _activity = _activities.get(_uuid);
    if(_activity !== undefined){
        return { key: _uuid, value: _uuid, text: _activity[0].title, onDoubleClick: jumpToActivity }
    }
    else return { key: '', value: '', text: ''}
}

export const ProcessSelector: React.FC<ProcessSelectorProps> = (props) => {
    const [currentSearchQuery, setCurrentSearchQuery] = useState('')

    const handleSelectorChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        updateActivitiesList(data.value as Array<string>, props.currentActivity[0].uuid, props.activities, props.propertyName);
    }

    const handleSearchChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setCurrentSearchQuery(data.searchQuery as string);
    }

    const handleClickCreateNewActivity = () => {
        let newActivityUUID: string = props.createActivity(currentSearchQuery, false);
        // make deep copy because array pointers
        let newList = structuredClone(props.currentActivity[0][props.propertyName])
        newList.push(newActivityUUID)
        updateActivitiesList(newList, props.currentActivity[0].uuid, props.activities, props.propertyName);
    }

    let activityOptions = Array.from(props.activities.keys()).map( (_uuid: string) => (
        checkOption(_uuid, props.activities)
    ));

    const noResults: React.ReactNode = <button onClick={handleClickCreateNewActivity}>Create New Activity: {currentSearchQuery}</button>

    const currentActivity = props.activities.get(props.currentActivity[0].uuid)

    if(currentActivity){
        let activityValues = Array.from(currentActivity[0][props.propertyName]);
        return (
            <div className="InputField">
                <h5>{props.fieldTitle}</h5>
                {/* {( props.showInstructions &&  */}
                <p className="description">
                    {props.description}
                </p>
                {/* )} */}
                <Dropdown
                    key={currentActivity[0].uuid+props.fieldTitle}
                    placeholder={props.propertyName.toUpperCase()}
                    fluid
                    multiple
                    search
                    selection
                    value={activityValues}
                    options={activityOptions}
                    noResultsMessage={noResults}
                    onSearchChange={handleSearchChange.bind(this)}
                    onChange={handleSelectorChange.bind(this)}
                />
            </div>
        );
    }
}