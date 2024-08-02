export class Activity {
    uuid: string;
    title: string;
    description: string;
    preconditions: string;
    goal: string;
    otherResults: string;
    evaluationDimensions: Array<string>;
    roles: Array<string>;
    equipment: string;
    performance: string;
    subactivities: Array<string>;
    uses: Array<string>;
    specializations: Array<string>;
    generalizations: Array<string>;
    sources: string;
    author: string;
    lastModified: string;

    constructor(_uuid: string){
        this.uuid = _uuid
        this.title = '';
        this.description = '';
        this.preconditions = '';
        this.goal = '';
        this.otherResults = '';
        this.evaluationDimensions = [];
        this.roles = []
        this.equipment = '';
        this.performance = '';
        this.subactivities = [];
        this.uses = [];
        this.specializations = [];
        this.generalizations = [];
        this.sources = '';
        this.author = '';
        this.lastModified = new Date().toJSON();
    }

};
