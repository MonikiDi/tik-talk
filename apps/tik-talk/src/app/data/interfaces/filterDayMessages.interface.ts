import { Message } from './chats.interface';

export interface GroupsMessages {
  [key: string]: Message[];
}
export interface FilterMessages {
  dateMessages: string;
  groupMessages: Message[];
}
