export class Role {
    uuid: string;
    name: string;
    capabilities: string;
    incentives: string;

    constructor(_uuid: string){
        this.uuid = _uuid;
        this.name = '';
        this.capabilities = '';
        this.incentives = '';
    }
}
