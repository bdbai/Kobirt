export default function AVProperty(propertyName = '') {
return function(target: any, key: string) {
    propertyName = propertyName || key;
    const getter = function () {
        return this.get(propertyName);
    };

    const setter = function (newVal) {
        this.set(propertyName, newVal);
    };

    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
}
};