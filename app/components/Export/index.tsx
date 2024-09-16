'use client'

import type { Map as YMap } from 'yjs'
import { useMap } from "@y-sweet/react"
import { Button, Form, Segment } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'

import { Activity } from "@/app/constants/Activity"
import { activitySorter } from "@/app/utils/utils"

// ActivityFieldText does not need to be exhaustive here, will iterate over all regardless
export type ActivityFieldText = 'title' 

const Export: React.FC = () => {
    const activities = useMap<Array<Activity>>('activities')

    const getAllData = (_uuid: string, _activities: YMap<Activity[]>) => {
        let _activity = _activities.get(_uuid)
        if (_activity){
            let _out: Activity = new Activity(_uuid);
            var keys = Object.keys(_activity[0]);
            keys.forEach( (key: string) => {
                console.log(key);
                const keyTyped = key as ActivityFieldText;
                _out[keyTyped] = _activity[0][keyTyped];
            })
            return _out;
        }
    }

    let allActivityData = Array.from(activities.keys()).map( (_uuid: string) => (
        getAllData(_uuid, activities)
    ))

    const data_to_export: string = '{"activities":'+JSON.stringify(allActivityData.sort(activitySorter))+'}';

    function handleClickExportData(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        exportData(data_to_export, 'ci_ontology.json', 'application/json')
    }

    const exportData = (data: string, fileName: string, type: string) => {
        // Create a link and download the file
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };

    return (
        <div>
            <Segment padded>
                <Form id='export' size='mini'>
                    <Button onClick={handleClickExportData}>
                        Export All Data to JSON
                    </Button>
                </Form>
            </Segment>
        </div>
    )
}

export default Export;