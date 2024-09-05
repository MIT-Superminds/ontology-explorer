import React, { use } from 'react';
import type { Map as YMap } from 'yjs';
import { Activity } from '@/app/constants/Activity';
import ReactFlowComponent from './ReactFlowComponent';
import { OntologyNode } from './ReactFlowComponent/config/types';
import { createNode, generateEdges } from './ReactFlowComponent/util/transform';

interface OntologyGraphProps {
    activities: YMap<Activity[]>;
    type?: string;
    changeCurrentActivity?: Function;
    currentActivity?: Activity[] | undefined;
}
const OntologyGraph: React.FC<OntologyGraphProps> = ({ activities, type, changeCurrentActivity }) => {
    const nodes: OntologyNode[] = [];

    function addToCharts(_activityA: Activity) {
        const _uuidA = _activityA.uuid;
        const titleA = _activityA.title;
        const specList = _activityA.specializations;
        const partList = _activityA.subactivities;

        nodes.push(createNode(_uuidA, titleA, specList, changeCurrentActivity));
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
            <ReactFlowComponent _nodes={nodes} _edges={edges} />
        </div>
    );
};

export default OntologyGraph;
