import { CommandExecutor, Executable, SetupCommands, TextBaseChannel } from '../common/command'
import { CharacterExecutor } from './character';

@SetupCommands
export class Game extends CommandExecutor {
    private isStarted: boolean;
    private character: CharacterExecutor;

    constructor() {
        super();
        this.character = new CharacterExecutor();
    }

    @Executable('char', "Sub-command, use 'char help' to see further help.")
    public Charactor(channel: TextBaseChannel, cmd: string[]): string {
        if (!this.isStarted) {
            return "Game is not started yet, use 'new' to start."
        }
        this.character.Execute(channel, cmd);
    }

    @Executable('new', "Start a new game.")
    public NewGame(): string {
        if (this.isStarted) {
            return 'Game is already running.';
        }
        this.isStarted = true;
        return 'Game started successfully.';
    }

    @Executable('load', "Load game from file.")
    public LoadGame(): string {
        // do something to load the former savefile
        return 'Not implemented.'
    }

    @Executable('save', "Save game to file.")
    public SaveGame(): string {
        // do something to save a savefile
        return 'Not implemented.'
    }

}
