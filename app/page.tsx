'use client'

import { Button, Grid, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

export default function Home() {

    return (
        <div>
            <Grid
                textAlign='center'
                verticalAlign='middle'
                style={{height: '100vh'}}
            >
                <Grid.Column>
                    <Header as='h1'>Collective Intelligence Ontology</Header>
                    <Button href="/explorer">Go To Ontology Explorer</Button>
                </Grid.Column>
            </Grid>
        </div>
    )
}
