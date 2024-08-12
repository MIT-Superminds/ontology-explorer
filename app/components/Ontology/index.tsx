'use client'

import { useMap, usePresence, usePresenceSetter } from '@y-sweet/react'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Grid } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'

import { Activity } from '@/app/constants/Activity'
import { Role } from '@/app/constants/Role'
import { Dependency } from '@/app/constants/Dependency'
import { EvaluationDimension } from '@/app/constants/EvaluationDimension'
import { OntologyProps } from '@/app/constants/CustomProps'

import { randomColor, cleanUpRelatedBeforeDelete, checkLoginStatus } from '@/app//utils/utils'

import Editor from '@/app/components/Editor'
import Viewer from '@/app/components/Viewer'

type Presence = { id_focus: string; color: string; }

const Ontology: React.FC<OntologyProps> = (props) => {
    const router = useRouter();

    const activities = useMap<Array<Activity>>('activities')
    const dependencies = useMap<Array<Dependency>>('dependencies')
    const evaluationDimensions = useMap<Array<EvaluationDimension>>('evaluationDimensions')
    const roles = useMap<Array<Role>>('roles')
    const [currentActivity, setCurrentActivity] = useState<Activity[] | undefined>()

    // TODO: detect back and forward browser button actions and update state
    // window.onpopstate = function (){
    //     let pageUrlChanged = location.href;
    //     let newUUID = pageUrlChanged.split('/').findLast((val) => val)
    //     if(newUUID && newUUID !== "explorer"){
    //         console.log(newUUID);
    //         setCurrentActivity(activities.get(newUUID));
    //     }
    // }

    useEffect(() => {
        setCurrentActivity(activities.get(props.uuid))
    })

    const [myColor, _] = useState(randomColor)
    const [loggedIn, setLoggedIn] = useState(false)
    const presence = usePresence<Presence>({ includeSelf: true })
    const setPresence = usePresenceSetter<Presence>()

    useEffect(() => {
        checkLoginStatus(document).then((loggedIn) => {
            if(loggedIn){
                setLoggedIn(true);
                setPresence({
                    id_focus: '',
                    color: myColor,
                })
            }
            else{
                router.push(process.env.NEXT_PUBLIC_API_PATH+'/login');
            }
        })
    }, [], )

    function createActivity(title: string = "New Activity", changeToNewActivity: boolean = true): string {
        const newActivity = new Activity(uuid());
        newActivity.title = title;
        const newActivityList = [newActivity];
        activities.set(newActivity.uuid, newActivityList);
        if(changeToNewActivity){
            setCurrentActivity([newActivity]);
        }
        return newActivity.uuid;
    }

    const removeActivity = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        let uuidToDelete = event.currentTarget.id;
        cleanUpRelatedBeforeDelete(uuidToDelete)
        activities.delete(uuidToDelete);
        setCurrentActivity(undefined);
    }

    const handleClickOnActivity = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        props.uuid = event.currentTarget.id;
        changeCurrentActivity(event.currentTarget.id);
    }

    const changeCurrentActivity = (_uuid: string) => {
        props.uuid = _uuid;
        window.history.pushState({}, '', '/explorer/'+_uuid);
        setCurrentActivity(activities.get(_uuid));
    }

    return (
        (loggedIn &&
        <Grid>
            <Grid.Column width={6}>
                <Editor
                    createActivity = {createActivity}
                    removeActivity = {removeActivity}
                    handleClickOnActivity = {handleClickOnActivity}
                    changeCurrentActivity = {changeCurrentActivity}
                    currentActivity = {currentActivity}
                    activities = {activities}
                    dependencies = {dependencies}
                    evaluationDimensions = {evaluationDimensions}
                    roles = {roles}
                />
            </Grid.Column>
            <Grid.Column width={10} textAlign='center'>
                <Viewer
                    createActivity = {createActivity}
                    removeActivity = {removeActivity}
                    handleClickOnActivity = {handleClickOnActivity}
                    changeCurrentActivity = {changeCurrentActivity}
                    currentActivity = {currentActivity}
                    activities = {activities}
                    dependencies = {dependencies}
                    evaluationDimensions = {evaluationDimensions}
                    roles = {roles}
                />
            </Grid.Column>
        </Grid>
        )
    )
}

export default Ontology;
