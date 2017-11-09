import { Hero } from './hero/base'
import { TestHero, HeroCollection } from './hero'
import { CommandExecutor, Command, TextBaseChannel, Executable, SetupCommands } from '../common/command'

@SetupCommands
export class Game extends CommandExecutor {
    private isStarted: boolean;
    private heroes: HeroCollection;

    constructor() {
        super();
        this.heroes = new HeroCollection();
    }

    @Executable('new', "Start a new game.")
    public NewGame(): string {
        if (this.isStarted) {
            return 'Game is already running.';
        }
        this.isStarted = true;
        this.heroes.AddHero(new TestHero('a'));
        this.heroes.AddHero(new TestHero('b'));
        this.heroes.AddHero(new TestHero('c'));
        return 'Game started successfully.';
    }

    @Executable('load', "Load game from file.")
    public LoadGame(): string {
        if (this.isStarted) {
            return 'Game is already running.';
        }
        // this.isStarted = true;
        // do something to load the former savefile
        return 'Not implemented.'
    }

    @Executable('heroes', "Sub-command, use 'heroes help' to see further help.")
    public Heroes(channel: TextBaseChannel, cmd: string[]): string {
        if (!this.isStarted) {
            return "Game is not started yet, use '!new' to start."
        }
        this.heroes.Execute(channel, cmd);
    }
}
