import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBService } from './db/db.service';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { DestinationController } from './destination/destination.controller';
import { DestinationService } from './destination/destination.service';
@Module({
  imports: [],
  controllers: [AppController, AccountController, DestinationController],
  providers: [DBService, AppService, AccountService, DestinationService],
})
export class AppModule {}
