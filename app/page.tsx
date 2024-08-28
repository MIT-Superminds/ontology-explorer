'use client'

import { Grid, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import { Auth } from '@/app/components/'

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
                    <Auth/>
                </Grid.Column>
            </Grid>
        </div>
    )
}
