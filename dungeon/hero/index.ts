import { Hero } from './base'
import { AllState } from '../stats/index';
import { CommandExecutor } from '../../common/command';
import { Arrays } from '../../common/array';

export class TestHero extends Hero {
    constructor(name: string) {
        super();
        this._name = 'Test' + name;
    }
    
    public get CurrentState(): AllState {
        return this._selfState;
    }
}

export class HeroCollection extends CommandExecutor {
    private heroes: Hero[];
    private team: Hero[];

    constructor() {
        super();
        this.heroes = [];
        this.team = new Array(4);
        this._commands.set('swap', this.SwapOrder.bind(this));
        this._commands.set('show', this.Show.bind(this));
    }

    public AddHero(hero: Hero) {
        this.heroes.push(hero);
    }

    public SwapOrder(cmd: string[]): string {
        let [pos1, pos2, sil='y'] = cmd;
        let [p1, p2] = [Number(pos1), Number(pos2)];

        [this.heroes[p1], this.heroes[p2]] = [this.heroes[p2], this.heroes[p1]]

        let response = `Swap heroes' display order between ${this.heroes[p1].Name} and ${this.heroes[p2].Name}`;
        if (sil == 'y') {
            return response;
        }
        return response += '\n' + this.Show();
    }

    public Show(cmd: string[] = null): string {
        let response;
        // show order
        if (cmd == null || cmd.length == 0) {
            response = '---------\n';
            for (var i = 0; i < this.heroes.length; i++) {
                response += `${i} - ${this.heroes[i].Name}\n`;
            }
            response += '---------';
        }
        // show specific hero
        else {
            response = 'Start showing details:\n';
            cmd.forEach(indexString => {                
                let i = Number(indexString);
                response += `${i} - ${this.heroes[i].toString()}\n`;
            });
            response += 'End.'
        }
        return response;
    }

    public DismissHero(index: number) {
        let dismissed = Arrays.RemoveIndex(this.heroes, index);
        let i = this.team.indexOf(dismissed);
        if (i != -1) {
            delete this.team[i];
        }
    }
}
