'use client'

import { Button, Container, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import { ExplorerProps } from '@/app/constants/CustomProps';
import { InputField } from './InputField';
import { ActivitySelector } from './ActivitySelector';
import { deleteActivity } from './../../utils/utils';
import { useState } from 'react';


const Editor: React.FC<ExplorerProps> = (props) => {
    const [showInstructions, setShowInstructions] = useState(true);
    const [showOptionalFields, setShowOptionalFields] = useState(false);


    function handleClickShowInstructions(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        setShowInstructions(!showInstructions);
    }

    function handleClickShowOptionalFields(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        setShowOptionalFields(!showOptionalFields);
    }

    function handleClickDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        const _currentActivity = props.currentActivity;
            if(_currentActivity){
                if (confirm("Are you sure you want to delete this activity?")) {
                    deleteActivity(props.activities, _currentActivity[0].uuid);
                    props.changeCurrentActivity(undefined);
                }
          }
    }

    function currentUUID(): string {
        if(props.currentActivity){
            const _currentActivity = props.activities.get(props.currentActivity[0].uuid);
            if (_currentActivity){
                return _currentActivity[0].uuid;
            }
        }
        return ''
    }

    if(currentUUID() && props.currentActivity){
        return(
            <div id='Editor' style={{padding: '1vh', height: '98vh', overflowY: 'auto'}}>
                <Form id='Form' size='mini'>
                    <Container
                        id='requiredFields'
                        fluid
                    >
                    <Button
                        id='showHideInstructionsButton'
                        onClick={handleClickShowInstructions}
                        size='mini'
                    >
                    {(showInstructions && 
                        'Hide Instructions'
                    )}
                    {(!showInstructions && 
                        'Show Instructions'
                    )}
                    </Button>
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Title'}
                        propertyName = {'title'}
                        description = {'Name of activity. This should usually start with a verb. E.g., "Load baggage on plane"'}
                        showInstructions = {showInstructions}
                    />
                    <ActivitySelector
                        createActivity = {props.createActivity}
                        currentActivity = {props.currentActivity}
                        changeCurrentActivity = {props.changeCurrentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Sub-Activities'}
                        description = {'Select other processes that make up this process (either that already exist or that you will create). Subactivities are performed to achieve the goal of the overall activity. Each of these subactivities is itself another activity with its own description in the format shown here.'}
                        propertyName = {'subactivities'}
                        showInstructions = {showInstructions}
                    />
                    <ActivitySelector
                        createActivity = {props.createActivity}
                        currentActivity = {props.currentActivity}
                        changeCurrentActivity = {props.changeCurrentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Uses'}
                        description = {'Select other processes that use this process (either that already exist or that you will create). Uses are larger activities of which this process is a sub-activity, for example: for the process "Selling" the Use would be "Running a business"'}
                        propertyName = {'uses'}
                        showInstructions = {showInstructions}
                    />
                    <ActivitySelector
                        createActivity = {props.createActivity}
                        currentActivity = {props.currentActivity}
                        changeCurrentActivity = {props.changeCurrentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Specializations'}
                        description = {'Select other processes that are specializations of this process (either that already exist or that you will create). Specializations are variants of the process under consideration, for example for "Selling", specializations could include "Selling in a retail store", "Selling online", "Selling with direct sales force", etc'}
                        propertyName = {'specializations'}
                        showInstructions = {showInstructions}
                    />
                    <ActivitySelector
                        createActivity = {props.createActivity}
                        currentActivity = {props.currentActivity}
                        changeCurrentActivity = {props.changeCurrentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Generalizations'}
                        description = {'Select other processes that are generalizations of this process (either that already exist or that you will create). Generalizations are more general activities of which the process is a Specialization. For example: "Provide" is a Generalization of "Selling". Provide can include providing items for a price (that is Selling), but also giving items away for free, providing items via barter, etc'}
                        propertyName = {'generalizations'}
                        showInstructions = {showInstructions}
                    />
                    {/* <DependencySelector
                        currentActivity = {props.currentActivityUUID}
                        activities = {props.activities}
                        dependencies = {props.dependencies}
                    /> */}
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Equipment / Tools / Other Resources'}
                        propertyName = {'equipment'}
                        description = {'This includes artifacts and resources (e.g. space) needed to perform the process'}
                        showInstructions = {showInstructions}
                    />
                    <Button
                        id='showHideOptionalFieldsButton'
                        onClick={handleClickShowOptionalFields}
                        size='mini'
                    >
                    {(showOptionalFields && 
                        'Hide Optional Fields'
                    )}
                    {(!showOptionalFields && 
                        'Show Optional Fields'
                    )}
                    </Button>
                    </Container>

                    {(showOptionalFields && 
                    <Container
                        id='optionalFields'
                        fluid
                    >
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Description'}
                        propertyName = {'description'}
                        description = {'This field can include all kinds of things, such as textual descriptions of how the process works and pointers to places to find more relevant information.'}
                        showInstructions = {showInstructions}
                    />
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Preconditions'}
                        propertyName = {'preconditions'}
                        description = {'What inputs or other resources need to be available? What other conditions need to be true?'}
                        showInstructions = {showInstructions}
                    />
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Goal'}
                        propertyName = {'goal'}
                        description = {'What is the primary goal of this activity? E.g., "the baggage is in the cargo hold"'}
                        showInstructions = {showInstructions}
                    />
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Other Possible Results'}
                        propertyName = {'otherResults'}
                        description = {'What other possible changes in the world may result from the activity E.g., "some bags may have been damaged"'}
                        showInstructions = {showInstructions}
                    />
                    {/* <EvaluationDimensions
                        currentActivity = {props.currentActivityUUID}
                        activities = {props.activities}
                        evaluationDimensions = {props.evaluationDimensions}
                    /> */}
                    {/* <Roles
                        currentActivity = {props.currentActivityUUID}
                        activities = {props.activities}
                        roles = {props.roles}
                    /> */}
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Performance predicition models'}
                        propertyName = {'performance'}
                        description = {'For some processes, there are models that predict outcomes under various circumstances. If these are present for the process in question, please describe below, otherwise leave this blank'}
                        showInstructions = {showInstructions}
                    />
                    <InputField
                        currentActivity = {props.currentActivity}
                        activities = {props.activities}
                        fieldTitle = {'Sources'}
                        propertyName = {'sources'}
                        description = {'List materials used to fill out this process map e.g. title of document received from partner organization, field interviews, reference model (including URL), LLM-generated synthetic map, etc.'}
                        showInstructions = {showInstructions}
                    />
                    <Button
                        onClick={handleClickDelete}
                    >Delete</Button>
                    </Container>
                    )}
                </Form>
            </div>
        )
    }
}

export default Editor;
