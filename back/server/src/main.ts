import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const appGame = await NestFactory.create(AppModule);
  await appGame.listen(9001, () => console.log('Game server running on Port 9001'));

  const appChat = await NestFactory.create(AppModule);
  await appChat.listen(9002, () => console.log('Chat server running on Port 9002'));
}
bootstrap();
