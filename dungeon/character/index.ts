import { Warrior } from './warrior'
import { Hunter } from './hunter'
import { CharacterDescriptor, Character, ShowDescription } from './base';
import { CommandExecutor, SetupCommands, Executable, TextBaseChannel } from '../../common/command';

const PlayableCharacters: CharacterDescriptor[] = [Warrior, Hunter]

@SetupCommands
export class CharacterExecutor extends CommandExecutor {
    private character: Character = null;

    @Executable('show-all', 'Show all playable characters.')
    public ShowAll(channel: TextBaseChannel): string {
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
        ["(order: int | name: string)", "specific order number or name."]
    ])
    public Select(channel: TextBaseChannel, cmd: string[]): string {
        if (this.character != null) {
            return 'You have already selected your character.'
        }
        let [orderOrName,] = cmd;
        let order = Number(orderOrName);
        let charDes: CharacterDescriptor;
        if (Number.isInteger(order)) {
            if (order < PlayableCharacters.length) {
                charDes = PlayableCharacters[order];
            }
        }
        else {
            let name = orderOrName.toLowerCase();
            charDes = PlayableCharacters.find(x => x.Name.toLowerCase() == name);
        }
        if (charDes) {
            this.character = new Character(charDes);
            return `Selected ${charDes.Name}.`
        }
        else {
            return 'Character not found.'
        }
    }
}
