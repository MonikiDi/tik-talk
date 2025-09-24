import { dateUtc } from './date-utc';
export function chatByDay(messages) {
    const groupsMessages = {};
    let filterMessages;
    messages.forEach((message) => {
        const date = dateUtc(message.createdAt).toDateString();
        if (!groupsMessages[date]) {
            groupsMessages[date] = [];
        }
        groupsMessages[date].push(message);
    });
    filterMessages = Object.keys(groupsMessages).map((date) => {
        return { dateMessages: date, groupMessages: groupsMessages[date] };
    });
    return filterMessages;
}
//# sourceMappingURL=chat-by-day.js.map