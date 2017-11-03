import { StateValue } from '../common'

export class AllState {
    Health: StateValue;
    Pressure: StateValue;
    Attack: number;
    Denfence: number;
    Accuracy: number;
    Dodge: number;
    Critical: number;
    Posion: DebuffState;
    Bleeding: DebuffState;
    Stunned: DebuffState;
    ForceMove: DebuffState;

    constructor() {
        this.Health = { current: 0, total: 0 };
        this.Pressure = { current: 0, total: 200 };
        this.Attack = 0;
        this.Denfence = 0;
        this.Accuracy = 0;
        this.Dodge = 0;
        this.Critical = 0;
        this.Posion = DefaultDebuffState();
        this.Bleeding = DefaultDebuffState();
        this.Stunned = DefaultDebuffState();
        this.ForceMove = DefaultDebuffState();
    }

    public toString(): string {
        return `* Health:   ${this.Health.current}/${this.Health.total}
* Pressure: ${this.Pressure.current}/${this.Pressure.total}
* Attack:   ${this.Attack}
* Denfence: ${this.Denfence}
* Accuracy: ${this.Accuracy}
* Dodge:    ${this.Dodge}
* Critical: ${this.Critical}`
    }
}

export type OverTime = {
    Value: number,
    Time: number
}

export type DebuffState = {
    Apply: number,
    Resist: number,
    Effect: OverTime
}

export function DefaultDebuffState(): DebuffState {
    return {
        Apply: 0,
        Resist: 40,
        Effect: {
            Value: 0,
            Time: 0
        }
    }
}
