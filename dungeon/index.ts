import { Hero } from './hero/base'
import { TestHero, HeroCollection } from './hero'
import { CommandExecutor } from '../common/command'

export class Game extends CommandExecutor{
    private isStarted: boolean;
    private heroes: HeroCollection;

    constructor() {
        super();
        this.heroes = new HeroCollection();
        this.heroes.AddHero(new TestHero('a'))
        this.heroes.AddHero(new TestHero('b'))
        this.heroes.AddHero(new TestHero('c'))
        this._commands.set('new', this.NewGame.bind(this));
        this._commands.set('load', this.LoadGame.bind(this));
        this._commands.set('heroes', this.Heroes.bind(this))
    }

    public NewGame(): string {
        if (this.isStarted) {
            return 'Game is already running.';
        }
        this.isStarted = true;
        return 'Game started successfully.';
    }

    public LoadGame(): string {
        if (this.isStarted) {
            return 'Game is already running.';
        }
        // this.isStarted = true;
        // do something to load the former savefile
        return 'Not implemented.'
    }

    public Heroes(cmd: string[]): string {
        if (!this.isStarted) {
            return 'Game is not started yet, use \"!new\" to start.'
        }
        return this.heroes.ExecCommand(cmd);
    }
}
