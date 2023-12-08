import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

let room = 0;


@WebSocketGateway({
  cors: {
    origin: ['http://localhost:any'],
  },
})
export class GameServer implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private waitingList: Map <string, Socket> = new Map();

  constructor() {
    this.makeLobby = this.makeLobby.bind(this);
  }
  
  makeLobby(client: Socket, otherClient: Socket) {
    room++;
    client.join(room.toString());
    otherClient.join(room.toString());
    this.server.to(room.toString()).emit("Match starts soon", room);
    console.log("Clients connected to Lobby Number: ", room);
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.on('gameMode', (info) => {
      console.log("GameMode: ", info);
      if (this.waitingList.has(info))
      {
        this.makeLobby(client, this.waitingList.get(info));
        this.waitingList.delete(info);
      }
      else
        this.waitingList.set(info, client);
    })
    console.log("Client joined: ", client.id);
  }

  handleDisconnect(client: Socket) {
    for (const [gameMode, clientId] of this.waitingList.entries()) {
      if (clientId === client) {
        this.waitingList.delete(gameMode);
        break;
      }}
    console.log('Client disconnected:', client.id);
  }
}
