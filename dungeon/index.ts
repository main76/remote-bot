import { CommandExecutor, Executable, SetupCommands, TextBaseChannel } from '../common/command'
import { CharacterExecutor, PlayableCharacters } from './character';
import { CharacterDescriptor } from './character/base';
import { DlcManager } from './dlc/index';
import { Context } from './context';

@SetupCommands
export class Game extends CommandExecutor {
    private isStarted: boolean;
    private character: CharacterExecutor;
    private dlcManager: DlcManager;

    public get IsStarted(): boolean {
        return this.isStarted;
    }

    constructor() {
        super();
        this.character = new CharacterExecutor();
        this.dlcManager = new DlcManager();
        Context.GameInstance = this;
    }

    @Executable('char', "Sub-command, use 'char help' to see further help.")
    public Charactor(channel: TextBaseChannel, cmd: string[]): string {
        if (!this.isStarted) {
            return "Game is not started yet, use 'new' to start."
        }
        this.character.Execute(channel, cmd);
    }

    @Executable('dlc', "Sub-command, use 'dlc help' to see further help.")
    public DLC(channel: TextBaseChannel, cmd: string[]): void {
        this.dlcManager.Execute(channel, cmd);
    }

    @Executable('new', "Start a new game.")
    public NewGame(): string {
        if (this.isStarted) {
            return 'Game is already running.';
        }
        this.isStarted = true;
        return 'Game started successfully.';
    }

    @Executable('load', "Load game from file.", [
        ['[fileName: string]', 'optional, if not given load the latest.']
    ])
    public LoadGame(channel: TextBaseChannel, cmd: string[]): string {
        let [fileName,] = cmd;
        // do something to load the former savefile
        return 'Not implemented.';
    }

    @Executable('save', "Save game to file.")
    public SaveGame(): string {
        // do something to save a savefile
        return 'Not implemented.'
    }

}
