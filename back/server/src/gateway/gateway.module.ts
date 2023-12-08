import { Module } from '@nestjs/common';
import { GameServer } from './game';
import { ChatServer } from './chat';


@Module({
  providers: [GameServer, ChatServer],
})
export class GatewayModule {}
