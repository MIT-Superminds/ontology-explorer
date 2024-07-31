export class EvaluationDimension {
    uuid: string;
    type: string;
    units: string;
    direction: string;
    criteria: string;

    constructor(_uuid: string){
        this.uuid = _uuid
        this.type = '';
        this.units = '';
        this.direction = '';
        this.criteria = '';
    }
}
