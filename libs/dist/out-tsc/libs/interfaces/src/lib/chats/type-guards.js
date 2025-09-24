export function isErrorMessage(message) {
    return 'status' in message && message.status === 'error';
}
export function isUnreadMessage(message) {
    return 'action' in message && message.action === 'unread';
}
export function isNewMessage(message) {
    return 'action' in message && message.action === 'message';
}
//# sourceMappingURL=type-guards.js.map