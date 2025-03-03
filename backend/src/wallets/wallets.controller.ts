import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Post()
  createWallet(@Body() data: { name: string }, @Req() req) {
    return this.walletsService.createWallet(req.user.id, data.name);
  }

  @Get()
  getWallets(@Req() req) {
    return this.walletsService.getWallets(req.user.id);
  }

  @Patch(':id')
  updateWallet(
    @Param('id') id: string,
    @Body() data: { name: string },
    @Req() req,
  ) {
    return this.walletsService.updateWallet(id, data.name, req.user.id);
  }

  @Delete(':id')
  deleteWallet(@Param('id') id: string, @Req() req) {
    return this.walletsService.deleteWallet(id, req.user.id);
  }
}
