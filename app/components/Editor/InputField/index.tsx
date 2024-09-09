'use client'

import React from 'react';
import type { Map as YMap } from 'yjs';
import { Container, Dropdown, Header, TextArea } from 'semantic-ui-react';

import { Activity } from '@/app/constants/Activity';
import { ActivityFieldText } from '@/app/constants/CustomProps';
import { calculateInheritance, updateActivitiesText } from '@/app/utils/utils';
import { InheritableFieldNames } from '@/app/constants/Inheritance';


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
    let fieldInheritance: Array<string> = []
    let inheritedActivity: Activity[] | undefined;
    let inheritedValue: any;
    if(currentActivity){
        if (InheritableFieldNames.includes(props.propertyName)){
            fieldInheritance = calculateInheritance(props.activities, currentActivity, props.propertyName)
            if (fieldInheritance.length > 0){
                inheritedActivity = props.activities.get(fieldInheritance[0])
                if(inheritedActivity){
                    inheritedValue = inheritedActivity[0][props.propertyName]
            
                }
            }
        }

        if(currentActivity[0][props.propertyName]){
            return(
                <div className="InputField" style={{paddingBottom: '2em'}}>
                    <Container fluid>
                        <Header as='h5' style={{marginBottom: '0'}}>{props.fieldTitle}</Header>
                        {( props.showInstructions && 
                        <p className="description">
                            {props.description}
                        </p>
                        )}
                    </Container>
                    <TextArea
                        key={currentActivity[0].uuid+props.fieldTitle}
                        id={currentActivity[0].uuid+props.fieldTitle}
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
        }else{
            if(inheritedValue && inheritedActivity){
                return(
                    <div className="InputField" style={{paddingBottom: '2em'}}>
                        <Container fluid>
                            <Header as='h5' style={{marginBottom: '0'}}>{props.fieldTitle}</Header>
                            {( props.showInstructions && 
                            <p className="description">
                                {props.description}
                            </p>
                            )}
                        </Container>
                        <TextArea
                            key={currentActivity[0].uuid+props.fieldTitle}
                            id={currentActivity[0].uuid+props.fieldTitle}
                            rows={1}
                            value={currentActivity[0][props.propertyName]}
                            placeholder={inheritedValue}
                            onChange={(e) => {
                                e.preventDefault();
                                updateActivitiesText(e.target.value, currentActivity, props.activities, props.propertyName)
                            }}
                        />
                        <span>Inherited from: {inheritedActivity[0].title}</span>
                    </div>
                );
            }else{
                return(
                    <div className="InputField" style={{paddingBottom: '2em'}}>
                        <Container fluid>
                            <Header as='h5' style={{marginBottom: '0'}}>{props.fieldTitle}</Header>
                            {( props.showInstructions && 
                            <p className="description">
                                {props.description}
                            </p>
                            )}
                        </Container>
                        <TextArea
                            key={currentActivity[0].uuid+props.fieldTitle}
                            id={currentActivity[0].uuid+props.fieldTitle}
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
    }
}
