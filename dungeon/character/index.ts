import { Warrior } from './warrior'
import { Hunter } from './hunter'
import { CharacterDescriptor, Character, ShowDescription } from './base';
import { CommandExecutor, SetupCommands, Executable, TextBaseChannel } from '../../common/command';
import { GetElementByIndexOrName } from '../../common/interfaces';

export const PlayableCharacters: CharacterDescriptor[] = [Warrior, Hunter]

@SetupCommands
export class CharacterExecutor extends CommandExecutor {
    private character: Character = null;

    @Executable('ls', 'List all playable characters.')
    public List(channel: TextBaseChannel): string {
        if (this.character != null) {
            return 'You have already selected your character.'
        }
        for (let i = 0; i < PlayableCharacters.length; i++) {
            let charDes = PlayableCharacters[i];
            let response = `Index: ${i}\n`
            response += ShowDescription(charDes) + '\n\n';
            channel.send(response);
        }
        return;
    }

    @Executable('select', 'Select a character for playing.', [
        ["(index: int | name: string)", "specific index or name."]
    ])
    public Select(channel: TextBaseChannel, cmd: string[]): string {
        if (this.character != null) {
            return 'You have already selected your character.'
        }
        let [indexOrName,] = cmd;
        let charDes = GetElementByIndexOrName(PlayableCharacters, indexOrName);
        if (charDes) {
            this.character = new Character(charDes);
            return `Selected ${charDes.Name}.`
        }
        else {
            return 'Character not found.'
        }
    }
}
