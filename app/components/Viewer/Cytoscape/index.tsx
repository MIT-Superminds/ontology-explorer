import React, { memo } from 'react';
import type { Map as YMap } from 'yjs';
import { Activity } from '@/app/constants/Activity';
import CytoscapeComponent from './CytoscapeComponent';
import { createNode, generateLinks } from './CytoscapeComponent/util/graphUtil';

interface CytoscapeProps {
    activities: YMap<Activity[]>;
    type?: string;
    changeCurrentActivity?: Function;
    currentActivity?: Activity[] | undefined;
}
const Cytoscape: React.FC<CytoscapeProps> = ({
    activities,
    changeCurrentActivity,
}) => {
    const nodes: any[] = [];

    // TODO: add functionality for use/part axes
    function addToCharts(_activityA: Activity) {
        const _uuidA = _activityA.uuid;
        const titleA = _activityA.title;
        const specList = _activityA.specializations;
        const partList = _activityA.subactivities;

        nodes.push(createNode(_uuidA, titleA, specList));
    }

    const traverseActivityList = (_uuid: string, _activityList: Activity[] | undefined) => {
        if (_activityList) {
            const _activity = _activityList[0];
            addToCharts(_activity);
        }
    };

    Array.from(activities.keys()).map((_uuid: string) =>
        traverseActivityList(_uuid, activities.get(_uuid))
    );

    const links = generateLinks(nodes);

    const elements = {
        nodes: nodes,
        edges: links,
    };

    return (
        <CytoscapeComponent
            data={elements}
            onNodeClick={changeCurrentActivity}
        />
    );
};

export default memo(Cytoscape);
