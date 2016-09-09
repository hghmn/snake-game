export function slowCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
