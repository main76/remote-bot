import { CharacterDescriptor } from "../character/base";
import { Nameable } from "../../common/interfaces";

export interface DlcDescriptor extends Nameable {
    readonly Characters: CharacterDescriptor[];
    // TODO
}
