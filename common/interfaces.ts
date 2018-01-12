export interface Nameable {
    readonly Name: string;
}

export function GetElementByIndexOrName<T extends Nameable>(array: T[], indexOrName: string): T {
    if (!array) {
        throw new Error('Argument null: "array"');
    }
    if (!indexOrName) {
        throw new Error('Argument null: "indexOrName"');
    }
    let index = Number(indexOrName);
    let elem: T = null;
    if (Number.isInteger(index)) {
        if (index < array.length) {
            elem = array[index];
        }
    }
    else {
        let name = indexOrName.toLowerCase();
        elem = array.find(x => x.Name.toLowerCase() == name);
    }
    return elem;
}
