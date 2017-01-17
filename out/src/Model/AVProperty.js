"use strict";
function AVProperty(propertyName = '') {
    return function (target, key) {
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
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AVProperty;
;
//# sourceMappingURL=AVProperty.js.map