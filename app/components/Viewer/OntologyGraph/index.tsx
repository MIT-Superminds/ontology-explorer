import React, { use, useEffect } from 'react';
import type { Map as YMap } from 'yjs';
import { Activity } from '@/app/constants/Activity';
import ReactFlowComponent from './ReactFlowComponent';
import { graphDirection, OntologyNode } from './ReactFlowComponent/config/types';
import { createNode, generateEdges } from './ReactFlowComponent/util/transform';
import { useGraphStore } from './ReactFlowComponent/store/graphStore';

interface OntologyGraphProps {
    activities: YMap<Activity[]>;
    type?: string;
    currentActivity?: Activity[] | undefined;
    changeCurrentActivity: Function;
}
const OntologyGraph: React.FC<OntologyGraphProps> = ({ activities, type, changeCurrentActivity, currentActivity }) => {
    const nodes: OntologyNode[] = [];

    let direction: graphDirection = 'LR';

    function addToCharts(_activityA: Activity) {
        const _uuidA = _activityA.uuid;
        const titleA = _activityA.title;
        const specList = _activityA.specializations;
        const partList = _activityA.subactivities;

        if (type === 'Generalizations/Specializations') {
            nodes.push(createNode(_uuidA, titleA, specList, changeCurrentActivity, direction));
        } else {
            direction = 'TB';
            if (partList.length > 0) nodes.push(createNode(_uuidA, titleA, partList, changeCurrentActivity, direction));
            partList.forEach((_uuidB:string) => {
                let _activityB = activities.get(_uuidB);
                if (_activityB){
                    let titleB = _activityB[0].title;
                    console.log('Activity B exists:', titleB);
                    nodes.push(createNode(_uuidB, titleB, undefined, changeCurrentActivity, direction));
                }
            })
        }
    } 

    const traverseActivityList = ( _uuid: string, _activityList: Activity[] | undefined ) => {
        if (_activityList) {
            const _activity = _activityList[0];
            addToCharts(_activity);
        }
    };

    Array.from(activities.keys()).map((_uuid: string) =>
        traverseActivityList(_uuid, activities.get(_uuid))
    );

    const edges = generateEdges(nodes);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowComponent _nodes={nodes} _edges={edges} currentActivityId={currentActivity && currentActivity[0].uuid} direction={direction}/>
        </div>
    );
};

export default OntologyGraph;
