import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WalletsModule } from './wallets/wallets.module';
import { InvestmentsModule } from './investments/investments.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [AuthModule, WalletsModule, InvestmentsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
