import type { Map as YMap } from 'yjs'

import { Activity } from '@/app/constants/Activity';
import { Dependency } from '@/app/constants/Dependency';
import { EvaluationDimension } from '@/app/constants/EvaluationDimension';
import { Role } from '@/app/constants/Role';


export type ActivityFieldText = 'title' | 'description' | 'preconditions' | 'goal' | 'otherResults' | 'equipment' | 'performance' | 'sources'


export type ActivityFieldList = 'subactivities' | 'uses' | 'specializations' | 'generalizations'


export type Presence = { id_focus: string; email: string|null; name: string|null; color: string; }


export interface OntologyProps {
    uuid: string,
}

export interface OnlinePresenceProps {
    presence: Map<number, Presence>,
    activities: YMap<Activity[]>,
}

export interface ExplorerProps {
    createActivity: Function,
    removeActivity: Function,
    handleClickOnActivity: Function,
    changeCurrentActivity: Function,
    currentActivity: Activity[] | undefined,
    activities: YMap<Activity[]>,
    roles: YMap<Role[]>,
    dependencies: YMap<Dependency[]>,
    evaluationDimensions: YMap<EvaluationDimension[]>,
    presence: Map<number, Presence>
}
