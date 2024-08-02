'use client'

import React, { SyntheticEvent, useState } from 'react';
import type { Map as YMap } from 'yjs'
import { Dropdown, DropdownProps, DropdownItemProps } from 'semantic-ui-react'

import { Activity } from '@/app/constants/Activity';

interface ActivitySearchProps {
    createActivity: Function,
    changeCurrentActivity: Function
    currentActivity: Activity[] | undefined,
    activities: YMap<Activity[]>,
}

function checkOption(_uuid: string, _activities: YMap<Activity[]>): DropdownItemProps {
    const _activity = _activities.get(_uuid);
    if(_activity !== undefined){
        return { key: _uuid, value: _uuid, text: _activity[0].title }
    }
    else return { key: '', value: '', text: ''}
}

export const ActivitySearch: React.FC<ActivitySearchProps> = (props) => {
    const [currentSearchQuery, setCurrentSearchQuery] = useState('')

    const handleSelectorChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        if(event.type === 'click'){
            props.changeCurrentActivity(data.value as Array<string>);
        }
        return true;
    }

    const handleSearchChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setCurrentSearchQuery(data.searchQuery as string);
    }

    const handleClickCreateNewActivity = () => {
        let newActivityUUID: string = props.createActivity(currentSearchQuery);
        props.changeCurrentActivity(newActivityUUID);
    }

    let activityOptions = Array.from(props.activities.keys()).map( (_uuid: string) => (
        checkOption(_uuid, props.activities)
    ));

    const noResults: React.ReactNode = <button onClick={handleClickCreateNewActivity}>Create New Activity: {currentSearchQuery}</button>

    return (
        <Dropdown
            key='searchDropdown'
            placeholder='Search for an Activity'
            value={''}
            defaultSelectedLabel={''}
            search
            selection
            options={activityOptions}
            noResultsMessage={noResults}
            onSearchChange={handleSearchChange.bind(this)}
            onChange={handleSelectorChange.bind(this)}
        />
    );
}