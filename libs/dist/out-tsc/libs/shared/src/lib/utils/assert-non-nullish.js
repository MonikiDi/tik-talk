export function assertNonNullish(value, message) {
    if (value === null || value === undefined) {
        throw Error(message);
    }
}
//# sourceMappingURL=assert-non-nullish.js.map