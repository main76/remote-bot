import { CharacterDescriptor } from "./base";
import { Card } from "../skill/card/base";

export const Hunter: CharacterDescriptor = {
    Name: 'Hunter',
    Background: 'A man at wild.',
    OriginDeck: Array(10).fill(Card.Placeholder0, 0, 5).fill(Card.Placeholder1, 5, 10),
    OriginState: { Gold: 99, Health: 70 }
}
