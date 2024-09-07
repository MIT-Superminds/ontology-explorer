import { Inheritance } from './Inheritance';
import { EvaluationDimension } from './EvaluationDimension';

export class Activity {
    uuid: string;
    locked: boolean;
    title: string;
    description: string;
    preconditions: string;
    goal: string;
    otherResults: string;
    evaluationDimensions: Array<EvaluationDimension>;
    roles: Array<string>;
    equipment: string;
    performance: string;
    generalizations: Array<string>;
    specializations: Array<string>;
    uses: Array<string>;
    subactivities: Array<string>;
    sources: string;
    createdAuthor: string;
    modifiedAuthors: Array<string>;
    createdTime: string;
    modifiedTime: string;
    inheritance: Inheritance;

    constructor(_uuid: string){
        this.uuid = _uuid
        this.locked = false;
        this.title = '';
        this.description = '';
        this.preconditions = '';
        this.goal = '';
        this.otherResults = '';
        this.evaluationDimensions = [];
        this.roles = []
        this.equipment = '';
        this.performance = '';
        this.generalizations = [];
        this.specializations = [];
        this.uses = [];
        this.subactivities = [];
        this.sources = '';
        this.createdAuthor = '';
        this.createdAuthor = '';
        this.modifiedAuthors = [];
        this.createdTime = new Date().toJSON();
        this.modifiedTime = new Date().toJSON();
        this.inheritance = new Inheritance();
    }

};
