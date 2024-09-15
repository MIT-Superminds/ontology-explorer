class InheritanceField {
    ids: Array<string> | undefined;
    selected: number | undefined;

    constructor(uuid?: string){
        if(uuid){
            this.ids = [uuid];
            this.selected = 0;
        }
    }
}

export const InheritableFieldNames = [
    'subactivities',
    'preconditions',
    'goal',
    'otherResults',
    'evaluationDimensions',
    'roles',
    'equipment',
    'performance']


export class Inheritance {
    subactivities: InheritanceField
    preconditions: InheritanceField
    goal: InheritanceField
    otherResults: InheritanceField
    evaluationDimensions: InheritanceField
    roles: InheritanceField
    equipment: InheritanceField
    performance: InheritanceField

    constructor(){
        this.subactivities = new InheritanceField()
        this.preconditions = new InheritanceField()
        this.goal = new InheritanceField()
        this.otherResults = new InheritanceField()
        this.evaluationDimensions = new InheritanceField()
        this.roles = new InheritanceField()
        this.equipment = new InheritanceField()
        this.performance = new InheritanceField()
    }

};
