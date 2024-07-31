'use client'

import React from 'react';
import type { Map as YMap } from 'yjs';
import { Container, Header, TextArea } from 'semantic-ui-react';

import { Activity } from '@/app/constants/Activity';
import { ActivityFieldText } from '@/app/constants/CustomProps';
import { updateActivitiesText } from '@/app/utils/utils';


interface InputFieldProps {
    currentActivity: Activity[],
    activities: YMap<Activity[]>,
    fieldTitle: string,
    propertyName: ActivityFieldText,
    description: string,
    showInstructions: boolean,
}

export const InputField: React.FC<InputFieldProps> = (props) => {
    const currentActivity = props.activities.get(props.currentActivity[0].uuid)
    if(currentActivity){
        return(
            <div className="InputField">
                <Container fluid>
                    <Header as='h5'>{props.fieldTitle}</Header>
                    {( props.showInstructions && 
                    <p className="description">
                        {props.description}
                    </p>
                    )}
                </Container>
                <TextArea
                    key={currentActivity[0].uuid+props.fieldTitle}
                    id={props.fieldTitle}
                    rows={1}
                    value={currentActivity[0][props.propertyName]}
                    placeholder={props.propertyName.toUpperCase()}
                    onChange={(e) => {
                        e.preventDefault();
                        updateActivitiesText(e.target.value, currentActivity, props.activities, props.propertyName)
                    }}
                />
            </div>
        );
    }
}
