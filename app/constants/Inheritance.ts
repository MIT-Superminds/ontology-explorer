class InheritanceField {
    ids: Array<string>;
    selected: number;

    constructor(){
        this.ids = [];
        this.selected = 0;
    }
}

export class Inheritance {
    preconditions: InheritanceField;
    goal: InheritanceField;
    otherResults: InheritanceField;
    evaluationDimensions: InheritanceField;
    roles: InheritanceField;
    equipment: InheritanceField;
    performance: InheritanceField;

    constructor(){
        this.preconditions = new InheritanceField();
        this.goal = new InheritanceField();
        this.otherResults = new InheritanceField();
        this.evaluationDimensions = new InheritanceField();
        this.roles = new InheritanceField();
        this.equipment = new InheritanceField();
        this.performance = new InheritanceField();
    }
};
