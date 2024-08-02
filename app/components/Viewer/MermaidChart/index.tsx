import React, { act, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import mermaid from 'mermaid';
import type { Map as YMap } from 'yjs'

import { Activity } from '@/app/constants/Activity';

interface MermaidChartProps {
    activities: YMap<Activity[]>,
    type: string,
    changeCurrentActivity: Function,
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ activities, type, changeCurrentActivity }) => {    
    const chartRef = useRef<HTMLDivElement>(null);
    mermaid.initialize({ startOnLoad: true, securityLevel: 'loose'})
    
    let genSpec: string = '';
    let usePart: string = '';

    let chartDefinition = () => {
        if(type=="Generalizations/Specializations")
            return genSpec;
        else{
            return usePart;
        }
    }
  
    function addToCharts(_activityA: Activity) {
        const _uuidA = _activityA.uuid
        const titleA = _activityA.title
        const specList = _activityA.specializations
        const partList = _activityA.subactivities
  
        specList.forEach((_uuidB:string) => {
            let _activityB = activities.get(_uuidB)
            if (_activityB){
                let titleB = _activityB[0].title
                genSpec += `\n${_uuidA}["${titleA}"]---${_uuidB}["${titleB}"];`
            }
        })
  
        partList.forEach((_uuidB:string) => {
            let _activityB = activities.get(_uuidB)
            if (_activityB){
                let titleB = _activityB[0].title
                usePart += `\n${_uuidA}["${titleA}"]---${_uuidB}["${titleB}"];`
            }
        })
    }

    const traverseActivityList = (_uuid: string, _activityList: Activity[] | undefined) => {
        if(genSpec === ''){
            genSpec = `graph LR;`;
        }
        if(usePart === ''){
            usePart = `graph TD;`;
        }
        if(_activityList){
            const _activity = _activityList[0];
            addToCharts(_activity)
        }
    }

    Array.from(activities.keys()).map( (_uuid: string) => (
        traverseActivityList(_uuid, activities.get(_uuid))
    ))

    useEffect(() => {
        if (chartRef.current){
            chartRef.current.removeAttribute('data-processed');
            mermaid.contentLoaded();
        }
    }, [type, chartDefinition])

    return (
        <div ref={chartRef} className="mermaid">
            {chartDefinition()}
        </div>
    );
};
