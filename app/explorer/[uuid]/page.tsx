import Explorer from '../page';

export default function ExplorerWithParams({ params }: { params: { uuid: string } }){
    return (
        <Explorer
            uuid = {params.uuid}
        />
    )
}