'use client'

import { useState } from 'react';
import { Radio } from 'semantic-ui-react'

import { ExplorerProps } from '@/app/constants/CustomProps';
import { ActivitySearch } from './ActivitySearch';
import { MermaidChart } from './MermaidChart';

const Viewer: React.FC<ExplorerProps> = (props) => {
    const [chartToggle, setChartToggle] = useState<boolean>(false);

    function handleChartToggle(){
        console.log(chartToggle);
        setChartToggle(!chartToggle);
    }

    const toggleLabelText = ():string => {
        if (chartToggle==true){
            return "Generalizations/Specializations"
        }
        else{
            return "Uses/Subactivities"
        }
    }

    return(
        <div>
            <ActivitySearch
                createActivity = {props.createActivity}
                changeCurrentActivity = {props.changeCurrentActivity}
                currentActivity = {props.currentActivity}
                activities = {props.activities}
            />
            <br/>
            <Radio
                toggle
                label={toggleLabelText()}
                onChange={handleChartToggle}
            />
            <MermaidChart
                activities={props.activities}
                type={toggleLabelText()}
                changeCurrentActivity = {props.changeCurrentActivity}
            />
        </div>
    )
}

export default Viewer;
