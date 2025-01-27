export class Join {
    tableName: string;
    valueName: string;

    constructor(tableName: string, valueName: string) {
        this.tableName = tableName;
        this.valueName = valueName;
    }
};


export class Where {
    key: string;
    value: string | number;

    constructor(IDName: string, IDvalue: string | number) {
        this.key = IDName;
        this.value = IDvalue;
    }
};