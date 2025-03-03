import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InvestmentsService {
  constructor(private prisma: PrismaService) {}

  async createInvestment(
    userId: string,
    walletId: string,
    name: string,
    amount: number,
  ) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
    });
    if (!wallet) throw new NotFoundException('Carteira não encontrada');
    if (wallet.userId !== userId) throw new ForbiddenException('Acesso negado');

    return this.prisma.investment.create({
      data: { walletId, name, amount },
    });
  }

  async getInvestments(userId: string, walletId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
    });
    if (!wallet) throw new NotFoundException('Carteira não encontrada');
    if (wallet.userId !== userId) throw new ForbiddenException('Acesso negado');

    return this.prisma.investment.findMany({ where: { walletId } });
  }

  async updateInvestment(
    userId: string,
    investmentId: string,
    name: string,
    amount: number,
  ) {
    const investment = await this.prisma.investment.findUnique({
      where: { id: investmentId },
      include: { wallet: true },
    });
    if (!investment) throw new NotFoundException('Investimento não encontrado');
    if (investment.wallet.userId !== userId)
      throw new ForbiddenException('Acesso negado');

    return this.prisma.investment.update({
      where: { id: investmentId },
      data: { name, amount },
    });
  }

  async deleteInvestment(userId: string, investmentId: string) {
    const investment = await this.prisma.investment.findUnique({
      where: { id: investmentId },
      include: { wallet: true },
    });
    if (!investment) throw new NotFoundException('Investimento não encontrado');
    if (investment.wallet.userId !== userId)
      throw new ForbiddenException('Acesso negado');

    return this.prisma.investment.delete({ where: { id: investmentId } });
  }
}
