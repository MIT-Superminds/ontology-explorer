import { YDocProvider } from '@y-sweet/react'
import { getOrCreateDocAndToken } from '@y-sweet/sdk'

import Export from '../components/Export';

async function ExportPage() {

    let connectionString = "";
    if (process.env.CONNECTION_STRING){
        connectionString = process.env.CONNECTION_STRING;
    }

    let docString = "";
    if (process.env.DOC_STRING){
        docString = process.env.DOC_STRING;
    }
  
    const clientToken = await getOrCreateDocAndToken(connectionString, docString);

    return (
        <div>
            <YDocProvider clientToken={clientToken}>
                <Export/>
            </YDocProvider>
        </div>
    )
}

export default ExportPage;
