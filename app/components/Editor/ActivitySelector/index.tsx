'use client'

import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import type { Map as YMap } from 'yjs'
import { Header, Container } from 'semantic-ui-react'
import Select, { components, MultiValueGenericProps, MultiValueProps, OnChangeValue, Props } from 'react-select';
import { SortableContainer, SortableContainerProps, SortableElement, SortEndHandler, SortableHandle } from 'react-sortable-hoc';

import { Activity } from '@/app/constants/Activity';
import { ActivityFieldList } from '@/app/constants/CustomProps';
import { calculateInheritance, updateActivitiesList } from '@/app/utils/utils';
import { InheritableFieldNames } from '@/app/constants/Inheritance';

interface SelectorOption {
    readonly value: string;
    readonly label: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }

interface ActivitySelectorProps {
    createActivity: Function,
    changeCurrentActivity: Function,
    currentActivity: Activity[],
    activities: YMap<Activity[]>,
    fieldTitle: string,
    propertyName: ActivityFieldList,
    description: string,
    showInstructions: boolean,
}

function populateOption(_uuid: string, _activities: YMap<Activity[]>): SelectorOption {
    const _activity = _activities.get(_uuid);
    if(_activity !== undefined){
        return { value: _uuid, label: _activity[0].title }
    }
    else return { value: '', label: ''}
}

function arrayMove<T>(array: readonly T[], from: number, to: number) {
    const slicedArray = array.slice();
    slicedArray.splice(
      to < 0 ? array.length + to : to,
      0,
      slicedArray.splice(from, 1)[0]
    );
    return slicedArray;
  }
  
  const SortableMultiValue = SortableElement(
    (props: MultiValueProps<SelectorOption>) => {
      // this prevents the menu from being opened/closed when the user clicks
      // on a value to begin dragging it. ideally, detecting a click (instead of
      // a drag) would still focus the control and toggle the menu, but that
      // requires some magic with refs that are out of scope for this example
      const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      const innerProps = { ...props.innerProps, onMouseDown };
      return <components.MultiValue {...props} innerProps={innerProps} />;
    }
  );
  
  const SortableMultiValueLabel = SortableHandle(
    (props: MultiValueGenericProps) => <components.MultiValueLabel {...props} />
  );
  
  const SortableSelect = SortableContainer(Select) as React.ComponentClass<
    Props<SelectorOption, true> & SortableContainerProps
  >;

export const ActivitySelector: React.FC<ActivitySelectorProps> = (props) => {
    let activityOptions = Array.from(props.activities.keys()).map( (_uuid: string) => (
        populateOption(_uuid, props.activities)
    ));

    let selectedOptions = Array.from(props.currentActivity[0][props.propertyName]).map( (_uuid: string) => (
        populateOption(_uuid, props.activities)
    ));

    const [selected, setSelected] = React.useState<readonly SelectorOption[]>(selectedOptions)
    const onChange = (activityOptions: OnChangeValue<SelectorOption, true>) => {
        setSelected(activityOptions);
    }
    
    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
    };

    useEffect(() => {
        let newList = Array.from(selected.map((i) => i.value))
        if (newList !== props.currentActivity[0][props.propertyName]){
            updateActivitiesList(newList, props.currentActivity[0].uuid, props.activities, props.propertyName);
        }
    }, [selected])

    const [currentSearchQuery, setCurrentSearchQuery] = useState('')

    const handleSearchChange = (searchQuery: string) => {
        setCurrentSearchQuery(searchQuery);
    }

    // const handleLabelClick = (event: SyntheticEvent<HTMLElement, Event>, data: LabelProps) => {
    //     props.changeCurrentActivity(data.value);
    // }

    const handleClickCreateNewActivity = () => {
        let newActivityUUID: string = props.createActivity(currentSearchQuery, false);
        setCurrentSearchQuery('');
        setSelected([...selected, {value: newActivityUUID, label: currentSearchQuery}])
    }

    const noResults = () => {
        return (
            <button onClick={handleClickCreateNewActivity}>Create New Activity: {currentSearchQuery}</button>
        )
    }

    const placeholder: React.FC<{inheritedValue: Array<string>, activities: YMap<Activity[]>}> = (props) => {
        // TODO: return something fancier than a string in a div
        let list: string = ''
        props.inheritedValue.map((uuid: string) => {
            let inheritedActvity = props.activities.get(uuid)
            if (inheritedActvity){
                if(list == ''){
                    list = inheritedActvity[0].title
                }else{
                    list += ', ' + inheritedActvity[0].title
                }
            }
        })
        return (
            <div>
                {list}
            </div>
        )
    }

    const currentActivity = props.activities.get(props.currentActivity[0].uuid)

    useEffect(() => {
        setSelected(selectedOptions)
    },[currentActivity])

    let fieldInheritance: Array<string> = []
    let inheritedActivity: Activity[] | undefined;
    let inheritedValue: Array<string> | undefined;

    if(currentActivity){
        if (InheritableFieldNames.includes(props.propertyName)){
            fieldInheritance = calculateInheritance(props.activities, currentActivity, props.propertyName)
            if (fieldInheritance.length > 0){
                inheritedActivity = props.activities.get(fieldInheritance[0])
                if(inheritedActivity){
                    inheritedValue = inheritedActivity[0][props.propertyName]
                    console.log(inheritedValue, 'from', inheritedActivity)
                }
            }
        }
        if(inheritedValue && inheritedActivity && inheritedValue.length != 0 && currentActivity[0][props.propertyName].length == 0){
            let activities = props.activities;
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
                    <SortableSelect
                        useDragHandle
                        // react-sortable-hoc props:
                        axis="xy"
                        onSortEnd={onSortEnd}
                        distance={4}
                        // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
                        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                        // react-select props:
                        isMulti
                        options={activityOptions}
                        value={selected}
                        onChange={onChange}
                        inputValue={currentSearchQuery}
                        onInputChange={handleSearchChange}
                        placeholder={placeholder({inheritedValue, activities})}
                        noOptionsMessage={noResults}
                        components={{
                            // @ts-ignore We're failing to provide a required index prop to SortableElement
                            MultiValue: SortableMultiValue,
                            // @ts-ignore
                            MultiValueLabel: SortableMultiValueLabel,
                            // will need to extend SortableMultiValueLabel to make clickable
                            // like previously with onLabelClick={handleLabelClick.bind(this)}
                        }}
                        closeMenuOnSelect={false}
                    />
                    <span>Inherited from: {inheritedActivity[0].title}</span>
                </div>
            )
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
                    <SortableSelect
                        useDragHandle
                        // react-sortable-hoc props:
                        axis="xy"
                        onSortEnd={onSortEnd}
                        distance={4}
                        // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
                        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                        // react-select props:
                        isMulti
                        options={activityOptions}
                        value={selected}
                        onChange={onChange}
                        inputValue={currentSearchQuery}
                        onInputChange={handleSearchChange}
                        noOptionsMessage={noResults}
                        components={{
                            // @ts-ignore We're failing to provide a required index prop to SortableElement
                            MultiValue: SortableMultiValue,
                            // @ts-ignore
                            MultiValueLabel: SortableMultiValueLabel,
                            // will need to extend SortableMultiValueLabel to make clickable
                            // like previously with onLabelClick={handleLabelClick.bind(this)}
                        }}
                        closeMenuOnSelect={false}
                    />
                </div>
            )
        }
    }
}