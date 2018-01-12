import { Game } from "./index";

export const Context: ContextContent = {
    GameInstance: null
}

export interface ContextContent {
    [key: string]: any;
    GameInstance: Game;
}
