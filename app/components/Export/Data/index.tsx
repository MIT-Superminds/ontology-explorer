'use client'

import { useEffect, useState } from "react"
import { useMap } from "@y-sweet/react"

import { Activity } from "@/app/constants/Activity"

import { SimpleActivitySearch } from "../SimpleActivitySearch"
import { Container, Segment } from "semantic-ui-react"


export const Data: React.FC = () => {
    const activities = useMap<Array<Activity>>('activities')
    const [currentActivity, setCurrentActivity] = useState<Activity[] | undefined>()
    const [currentActivityUUID, setcurrentActivityUUID] = useState<string>()

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
                    JSON.stringify(currentActivity[0], null, 2)
                )}
            </Container>
        </div>
    )
}