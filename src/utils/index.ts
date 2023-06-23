export const arrayFill = (start: number, end: number) => {
    const arr: number[] = [];
    for (let index = start; index < end; index+=1) {
        arr.push(index)
    }
    return arr;
}