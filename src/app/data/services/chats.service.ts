import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chat, LastMessageRes, Message} from '../interfaces/chats.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private http = inject(HttpClient);
  private readonly baseApiUrl = 'https://icherniakov.ru/yt-course/';
  private readonly chatsUrl = `${this.baseApiUrl}chat/`;
  private readonly messagesUrl = `${this.baseApiUrl}messages/`;

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChat() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`);
  }

  sendMessage(chatId: number, message:string) {
    return this.http.post<Message>(`${this.messagesUrl}send/${chatId}`,{}, {
      params:
        {
          message: message
        }
    });
  }
}
