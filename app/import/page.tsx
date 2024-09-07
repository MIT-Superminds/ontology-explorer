import { YDocProvider } from '@y-sweet/react'
import { getOrCreateDocAndToken, encodeClientToken } from '@y-sweet/sdk'

import Import from '../components/Import';

async function ImportPage() {

    let connectionString = "";
    if (process.env.CONNECTION_STRING){
        connectionString = process.env.CONNECTION_STRING;
    }

    let docString = "";
    if (process.env.DOC_STRING_UPLOAD){
        docString = process.env.DOC_STRING_UPLOAD;
    }
  
    const clientToken = await getOrCreateDocAndToken(connectionString, docString);

    if (process.env.DEV){
        // get url for debugger on page load
        const payload = encodeClientToken.call(void 0, clientToken);
        const debuggerUrl = `https://debugger.y-sweet.dev/?payload=${payload}`
        console.log(debuggerUrl);
    }

    return (
        <div>
            <YDocProvider clientToken={clientToken}>
                <Import/>
            </YDocProvider>
        </div>
    )
}

export default ImportPage;
