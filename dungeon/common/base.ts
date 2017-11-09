import { AllState } from "../stats/index";

export abstract class Unit {
    protected _name: string;
    protected _selfState: AllState;

    constructor() {
        this._selfState = new AllState();
    }

    public get Name(): string {
        return this._name;
    }

    public abstract get CurrentState(): AllState;
}
