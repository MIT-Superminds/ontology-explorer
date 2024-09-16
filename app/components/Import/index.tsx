'use client'

import React, { useState } from "react";
import { useMap } from "@y-sweet/react"
import { Button, Container, Segment } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import { Activity } from "@/app/constants/Activity";

const Import: React.FC = () => {
    const [file, setFile] = useState<File>();
    const [fileUploadStatus, setFileUploadStatus] = useState<string>('');

    const activities = useMap<Array<Activity>>('activities')

    const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        let newCount = 0;
        let unchangedCount = 0;
        let updateCount = 0;
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onload = async (e) => {
                const data_in = await file.text();
                const json_in = JSON.parse(data_in);
                if(json_in["activities"]){
                    console.log('activities');
                    json_in["activities"].forEach((act:Activity) => {
                        // TODO: check against existing DB to avoid duplication
                        const priorAct = activities.get(act.uuid)
                        if (priorAct){
                            let overwrite = confirm(priorAct[0].uuid+" already exists. Overwrite "+priorAct[0].title+ "?")
                            if (overwrite){
                                activities.set(act.uuid, [act])
                                updateCount++;
                            }else{
                                unchangedCount++;
                            }
                        }else{
                            activities.set(act.uuid, [act])
                            newCount++;
                        }
                    })
                    setFileUploadStatus("Imported "+newCount+" new activities.\nChanged "+updateCount+" activities.\nDid not change "+unchangedCount+" activities.")
                }
            };
        }
    }

    const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList) return;
        setFile(fileList[0]);
    };
    

    return (
        <div>
            <Segment padded>
                <input
                    accept="text/json"
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    multiple={false}
                    onChange={handleFileChange}
                />
                <Button
                    component="span"
                    variant="contained"
                    onClick={uploadFile}
                >
                    Import JSON
                </Button>
                <Container style={{"padding-top": "30px"}}>
                    {( fileUploadStatus &&
                        fileUploadStatus
                    )}
                </Container>
        </Segment>
    </div>
    );
}

export default Import;