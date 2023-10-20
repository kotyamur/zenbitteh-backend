import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DealsModule } from './deals/deals.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, DealsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
