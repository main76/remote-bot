import { AllState } from '../stats'
import { Hero } from '../hero/base'

export abstract class Equipment {
    protected _owner: Hero;
    protected _baseEffect: AllState;
    public abstract get CurrentEffect();
}

export abstract class Weapon extends Equipment {

}

export abstract class Armour extends Equipment {

}

export abstract class Rings extends Equipment {

}
