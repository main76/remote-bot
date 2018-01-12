import { Card } from "../skill/card/base";
import { Nameable } from "../../common/interfaces";

export class Character {
    protected _deck: Card[];

    public get Deck(): Card[] { return this._deck;}

    public AddCard(card: Card) {
        this._deck.push(card);
        this._deck.sort();
    }

    constructor(charDes: CharacterDescriptor) {
        this._deck = charDes.OriginDeck;
    }
}

export interface CharacterDescriptor extends Nameable {
    readonly Background: string;
    readonly OriginDeck: Card[];
    readonly OriginState: { Gold: number, Health: number };
}

export function ShowDescription(charDes: CharacterDescriptor): string {
    let state = charDes.OriginState;
    let stateStr = `Gold: ${state.Gold}\nHealth: ${state.Health}`;
    return `${charDes.Name}:\n${charDes.Background}\n${stateStr}`;
}
