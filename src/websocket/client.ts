import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UserService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
    text: string;
    email: string;
}

io.on('connect', (socket) => {
    const connectionService = new ConnectionsService();
    const userService = new UsersService();
    const messagesService = new MessagesService();
    
    socket.on('client_firts_access', async (params) => {
        const { text, email } = params as IParams;
        const socket_id = socket.id;
        let user_id = null;

        const userExists = await userService.findByEmail(email);

        if (!userExists) {
            const user = await userService.create(email);
            await connectionService.create({
                socket_id,
                user_id: user.id,
            });
            user_id = user.id;
        } else {
            user_id = userExists.id;

            const connection = await connectionService.findByUserId(userExists.id);

            if (!connection) {
                await connectionService.create({
                    socket_id,
                    user_id: userExists.id,
                });
            } else {
                // sobrescreve a conexão
                connection.socket_id = socket_id;
                await connectionService.create(connection);
            }
        }
        await messagesService.create({
            text,
            user_id,
        });

        const allMessages = await messagesService.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages)
    });
});