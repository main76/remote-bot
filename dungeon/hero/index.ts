import { Hero } from './base'
import { AllState } from '../stats/index';
import { CommandExecutor, TextBaseChannel, Executable, Command } from '../../common/command';
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
    protected static commands: Map<string, Command>;

    constructor() {
        super();
        this.heroes = [];
        this.team = new Array(4);
        // this._commands.set('show', this.Show.bind(this));
    }

    public AddHero(hero: Hero) {
        this.heroes.push(hero);
    }

    @Executable('swap', "Swap two heroes' display order.", [
        ["(pos1:int) (pos2:int) [sil='y']", "if sil is not 'y' run 'show' after the swap."]
    ])
    public SwapOrder(channel: TextBaseChannel, cmd: string[]): string {
        let [pos1, pos2, sil = 'y'] = cmd;
        let [p1, p2] = [Number(pos1), Number(pos2)];

        [this.heroes[p1], this.heroes[p2]] = [this.heroes[p2], this.heroes[p1]]

        channel.send(`Swap heroes' display order between ${this.heroes[p1].Name} and ${this.heroes[p2].Name}`);
        if (sil.toLowerCase() == 'y') {
            return;
        }
        return this.Show(channel);
    }

    @Executable('show', "Show heroes' information.", [
        ["parameterless", "show all heroes' index and name."],
        ["...(id|name)", "show hero's detail with specific id or name."]
    ])
    public Show(channel: TextBaseChannel, cmd: string[] = null): string {
        // show order
        if (cmd == null || cmd.length == 0) {
            let info = '';
            for (var i = 0; i < this.heroes.length; i++) {
                info += `${i} - ${this.heroes[i].Name}\n`;
            }
            channel.send(info);
        }
        // show specific hero
        else {
            channel.send('Start showing details:');
            let notfound: string[] = [];
            for (let input of cmd) {
                let hero = this.GetHero(this.heroes, input);
                if (hero) {
                    channel.send(`${input} - ${hero.toString()}`);
                }
                else {
                    notfound.push(input);
                }
            }
            if (notfound.length > 0) {
                return `Following identifiers are not found: ${notfound.join(', ')}.`;
            }
        }
    }

    public DismissHero(index: number) {
        let dismissed = Arrays.RemoveIndex(this.heroes, index);
        let i = this.team.indexOf(dismissed);
        if (i != -1) {
            delete this.team[i];
        }
    }

    private GetHero(heroes: Hero[], input: string): Hero {
        let i = Number(input);
        let hero: Hero = null;
        if (Number.isInteger(i) && i >= 0 && i < this.heroes.length) {
            hero = this.heroes[i]
        }
        else {
            let name = input.toLowerCase();
            hero = this.heroes.find(v => v.Name.toLowerCase().includes(name));
        }
        return hero;
    }
}
