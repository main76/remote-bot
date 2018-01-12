import { CharacterDescriptor } from "../character/base";
import { PlayableCharacters } from "../character/index";
import { DlcDescriptor } from "./base";
import { Test0, Test1 } from "./test";
import { CommandExecutor, SetupCommands, Executable, TextBaseChannel } from "../../common/command";
import { GetElementByIndexOrName } from "../../common/interfaces";
import { Context } from "../context";

export const AvailiableDLCs = [Test0, Test1];

@SetupCommands
export class DlcManager extends CommandExecutor {
    @Executable('ls', 'List all availiable DLCs.')
    public List(): string {
        let respond = '';
        for (let i = 0; i < AvailiableDLCs.length; i++) {
            let dlc = AvailiableDLCs[i];
            respond += `${i}: ${dlc.Name}\n`;
        }
        return respond;
    }
    @Executable('load', 'load DLC content.', [
        ["(index: int | name: string)", "specific index or name."]
    ])
    public Load(channel: TextBaseChannel, cmd: string[]): string {
        if (Context.GameInstance.IsStarted) {
            return 'Cannot load DLC when game has already started.';
        }
        let [indexOrName,] = cmd;
        let dlc = GetElementByIndexOrName(AvailiableDLCs, indexOrName);
        if (dlc) {
            InitDlcContent(dlc);
            return `DLC: ${dlc.Name} loaded successfully.`
        }
        else {
            return 'DLC not found.'
        }
    }
}

export function InitDlcContent(dlcDes: DlcDescriptor): void {
    PlayableCharacters.push(...dlcDes.Characters);
}
