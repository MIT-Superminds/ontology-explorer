import React from 'react';
import type { Map as YMap } from 'yjs';
import { Activity } from '@/app/constants/Activity';
import ReactFlowComponent from './ReactFlowComponent';
import { graphDirection, OntologyNode } from './ReactFlowComponent/config/types';
import { createNode, generateEdges } from './ReactFlowComponent/util/transform';

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
        const { uuid, title, generalizations, specializations, subactivities } = _activityA;

        if (type === 'Generalizations/Specializations') {
            // Temporary check to exclude 'use/part' nodes from the 'gen/spec' graph rendering
            // TODO: Implement a more comprehensive check
            if (!specializations.length && !generalizations.length) return;

            nodes.push(createNode(uuid, title, specializations, changeCurrentActivity, direction));
        } else {
            direction = 'TB';
            if (subactivities.length > 0)  {
                nodes.push(createNode(uuid, title, subactivities, changeCurrentActivity, direction));
            }
            subactivities.forEach((_uuidB:string) => {
                let _activityB = activities.get(_uuidB);
                if (_activityB){
                    let titleB = _activityB[0].title;
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
        <div style={{ width: '100%', height: '88vh' }}>
            <ReactFlowComponent
                _nodes={nodes}
                _edges={edges}
                currentActivityId={currentActivity?.[0]?.uuid}
                direction={direction}
            />
        </div>
    );
};

export default OntologyGraph;
