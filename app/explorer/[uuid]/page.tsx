import ExplorerPage from '../page';

export default function ExplorerPageWithParams({ params }: { params: { uuid: string } }){
    return (
        <ExplorerPage
            uuid = {params.uuid}
        />
    )
}