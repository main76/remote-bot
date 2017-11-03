export namespace Arrays {
    export function RemoveElement<T>(sourceArray:T[], element:T) {
        let index = sourceArray.indexOf(element);
        RemoveIndex(sourceArray, index);
    }
    export function RemoveIndex<T>(sourceArray:T[], index:number): T {
        if (index > 0 && index < sourceArray.length) {
            return sourceArray.splice(index, 1)[0];
        }
    }
}
