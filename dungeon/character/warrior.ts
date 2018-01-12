import { CharacterDescriptor } from "./base";
import { Card } from "../skill/card/base";

export const Warrior: CharacterDescriptor = {
    Name: 'Warrior',
    Background: 'A man after war.',
    OriginDeck: Array(10).fill(Card.Placeholder0, 0, 5).fill(Card.Placeholder1, 5, 10),
    OriginState: { Gold: 99, Health: 80 }
}
