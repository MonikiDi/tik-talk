import {
  FilterMessages,
  GroupsMessages,
} from '../data/interfaces/filterDayMessages.interface';
import { dateUtc } from './date-utc';
import {Message} from '@tt/interfaces/chats';

export function chatByDay(messages: Message[]) {
  const groupsMessages: GroupsMessages = {};
  let filterMessages: FilterMessages[];

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
