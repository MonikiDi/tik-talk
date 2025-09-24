import { ChatsPageComponent } from './chats-page/chats-page.component';
import { ChatWorkspaceComponent } from './chat-workspace/chat-workspace.component';
export const chatsRoutes = [
    {
        path: '',
        component: ChatsPageComponent,
        children: [{ path: ':id', component: ChatWorkspaceComponent }],
    },
];
//# sourceMappingURL=chats-routes.js.map