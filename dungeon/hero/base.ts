import { EquipmentsBox } from '../item'
import { Unit } from '../common/base';

export abstract class Hero extends Unit {
    protected _equipments: EquipmentsBox;

    constructor() {
        super();
        this._selfState.Health.current = 100;
        this._selfState.Health.total = 100;
        this._selfState.Attack = 10;
        this._selfState.Denfence = 0;
        this._selfState.Accuracy = 100;
        this._selfState.Dodge = 5;
        this._selfState.Critical = 5;
    }

    public get Equipments(): EquipmentsBox {
        return this._equipments;
    }

    public toString(): string {
        return `Hero - ${this._name}:
-----------
${this.CurrentState.toString()}
-----------`;
    }

}
