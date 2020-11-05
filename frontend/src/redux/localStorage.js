export function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    } catch (err) {
        return undefined;
    }
}

export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
