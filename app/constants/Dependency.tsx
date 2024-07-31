export class Dependency {
    uuid: string;
    a: string;
    b: string;
    direction: string;

    constructor(_uuid: string){
        this.uuid = _uuid;
        this.a = '';
        this.b = '';
        this.direction = '-->';
    }
}
