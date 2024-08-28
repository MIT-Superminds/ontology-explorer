'use client'

import { useEffect, useState } from "react"
import { useMap } from "@y-sweet/react"

import { Activity } from "@/app/constants/Activity"

import { SimpleActivitySearch } from "./SimpleActivitySearch"
import { Container, Segment, Form, TextArea } from "semantic-ui-react"


const Admin: React.FC = () => {
    const activities = useMap<Array<Activity>>('activities')
    const [currentActivity, setCurrentActivity] = useState<Activity[] | undefined>()
    const [currentActivityUUID, setcurrentActivityUUID] = useState<string>()

    function updateActivityFromJSON(_value: string, _currentActivity: Activity[]){
        const _updatedActivity: Activity[] = [JSON.parse(_value)];
        activities.set(_currentActivity[0].uuid, _updatedActivity);
        setCurrentActivity(_updatedActivity)
    }

    const changeCurrentActivity = (_uuid: string) => {
        setCurrentActivity(activities.get(_uuid));
    }

    useEffect(() => {
        if(currentActivity){
            setcurrentActivityUUID(currentActivity[0].uuid)
        }
    }, [currentActivity])


    return (
        <div>
            <Segment padded>
                <SimpleActivitySearch
                    changeCurrentActivity={changeCurrentActivity}
                    activities={activities}
                    currentActivityUUID={currentActivityUUID}
                />
            </Segment>
            <Container>
                {(currentActivity && 
                    <Form>
                        <TextArea
                            fluid
                            value={JSON.stringify(currentActivity[0], null, 2)}
                            onChange={(e) => {
                                e.preventDefault();
                                updateActivityFromJSON(e.target.value, currentActivity)
                            }}
                        />
                    </Form>
                )}
            </Container>
        </div>
    )
}

export default Admin;