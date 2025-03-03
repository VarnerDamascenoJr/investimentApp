import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('investments')
@UseGuards(JwtAuthGuard)
export class InvestmentsController {
  constructor(private investmentsService: InvestmentsService) {}

  @Post()
  createInvestment(
    @Body() data: { walletId: string; name: string; amount: number },
    @Req() req,
  ) {
    return this.investmentsService.createInvestment(
      req.user.id,
      data.walletId,
      data.name,
      data.amount,
    );
  }

  @Get(':walletId')
  getInvestments(@Param('walletId') walletId: string, @Req() req) {
    return this.investmentsService.getInvestments(req.user.id, walletId);
  }

  @Patch(':id')
  updateInvestment(
    @Param('id') investmentId: string,
    @Body() data: { name: string; amount: number },
    @Req() req,
  ) {
    return this.investmentsService.updateInvestment(
      req.user.id,
      investmentId,
      data.name,
      data.amount,
    );
  }

  @Delete(':id')
  deleteInvestment(@Param('id') investmentId: string, @Req() req) {
    return this.investmentsService.deleteInvestment(req.user.id, investmentId);
  }
}
