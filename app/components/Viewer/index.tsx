import { Activity } from '@/app/constants/Activity';
import { ExplorerProps } from '@/app/constants/CustomProps';
import { ReactNode } from 'react';

const Viewer: React.FC<ExplorerProps> = (props) => {
    const renderActivityList = (_uuid: string, _activityList: Activity[] | undefined) => {
        if(_activityList){
            const _activity = _activityList[0];
            return(
                <p
                    key={_uuid}
                    id={_uuid}
                    onClick={(event) => props.setActivity(event)}
                    onDoubleClick={(event) => props.removeActivity(event)}
                >
                    {_activity.title}
                </p>
            )
        }
    }

    function handleCreateActivityClick(){
        props.createActivity();
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

    return(
        <div>
            {/* <button onClick = {handleCreateActivityClick}>
                Create Activity
            </button> */}

            {/* {currentUUID() &&
                <div>Current Activity: {currentUUID()}</div>
            } */}

            {Array.from(props.activities.keys()).map( (_uuid: string) => (
                renderActivityList(_uuid, props.activities.get(_uuid))
            ))}
        </div>
    )
}

export default Viewer;
