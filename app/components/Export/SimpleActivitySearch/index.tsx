'use client'

import { SyntheticEvent } from 'react'
import type { Map as YMap } from 'yjs'
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { Activity } from '@/app/constants/Activity';

interface ExportProps {
    changeCurrentActivity: Function,
    activities: YMap<Activity[]>,
    currentActivityUUID: string | undefined,
}

export const SimpleActivitySearch: React.FC<ExportProps> = (props) => {
    function checkOption(_uuid: string, _activities: YMap<Activity[]>): DropdownItemProps {
        const _activity = _activities.get(_uuid);
        if(_activity !== undefined){
            return { key: _uuid, value: _uuid, text: _activity[0].title }
        }
        else return { key: '', value: '', text: ''}
    }

    const handleSelectorChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        if(event.type === 'click'){
            props.changeCurrentActivity(data.value as Array<string>);
        }
        return true;
    }

    let activityOptions = Array.from(props.activities.keys()).map( (_uuid: string) => (
        checkOption(_uuid, props.activities)
    ));

    return (
        <Dropdown
            key='simpleSearchDropdown'
            placeholder='Pick an Activity'
            value={props.currentActivityUUID}
            defaultSelectedLabel={''}
            selection
            options={activityOptions}
            onChange={handleSelectorChange.bind(this)}
        />
    );
}