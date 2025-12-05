export const customStorage = (() => {
    const storage = Object();

    function getItem(key: string) {
        return storage[key].value;
    }
    
    function setItem(key: string, value: JSON) {
        const expireTime = 5 * 1000 * 60;
        storage[key] = {
            value,
            expiryTime: Date.now() + expireTime,
        }
        console.log(storage)
        return storage[key];
    }
    
    function updateItem(key: string, value: JSON) {
        if(!storage[key] || (storage[key].expiryTime <= Date.now())) setItem(key, value);
        else return getItem(key);
    }
    function isExpire(key: string) {
        if(!storage[key]) return true;
        return storage[key].expiryTime <= Date.now();
    }
    return {
        getItem,
        updateItem,
        isExpire,
    }
})();
