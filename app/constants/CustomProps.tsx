import type { Map as YMap } from 'yjs'

import { Activity } from '@/app/constants/Activity';
import { Dependency } from '@/app/constants/Dependency';
import { EvaluationDimension } from '@/app/constants/EvaluationDimension';
import { Role } from '@/app/constants/Role';


export type ActivityFieldText = 'title' | 'description' | 'activityType' | 'preconditions' | 'goal' | 'otherResults' | 'equipment' | 'performance' | 'sources'


export type ActivityFieldList = 'subactivities' | 'uses' | 'specializations' | 'generalizations'


export interface OntologyProps {
    uuid: string,
}

export interface ExplorerProps {
    createActivity: Function,
    removeActivity: Function,
    setActivity: Function,
    currentActivity: Activity[] | undefined,
    activities: YMap<Activity[]>,
    roles: YMap<Role[]>,
    dependencies: YMap<Dependency[]>,
    evaluationDimensions: YMap<EvaluationDimension[]>,
}
