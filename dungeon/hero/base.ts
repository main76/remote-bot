import { EquipmentsBox } from '../item'
import { AllState, DefaultDebuffState } from '../stats/index';

export abstract class Hero {
    protected _name: string;
    protected _equipments: EquipmentsBox;
    protected _selfState: AllState;

    constructor() {
        this._selfState = new AllState();
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

    public get Name(): string {
        return this._name;
    }

    public abstract get CurrentState(): AllState;

    public toString(): string {
        return `Hero - ${this._name}:
-----------
${this.CurrentState.toString()}
-----------`
    }

}
