import {Message} from '@tt/interfaces/chats';

export interface GroupsMessages {
  [key: string]: Message[];
}
export interface FilterMessages {
  dateMessages: string;
  groupMessages: Message[];
}
