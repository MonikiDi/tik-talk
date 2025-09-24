export function Debounce(timeout) {
    return (target, key, descriptor) => {
        const method = descriptor.value;
        let timer;
        descriptor.value = function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                method.apply(this, args);
            }, timeout);
        };
    };
}
//# sourceMappingURL=debounce.decorator.js.map