export default function keysToUpperCase(obj) {
    let oldObj = obj;
    let newObj = {};
    for (let key of Object.keys(oldObj)) {
        newObj[key.toUpperCase()] = oldObj[key];
    }
    return newObj;

}
