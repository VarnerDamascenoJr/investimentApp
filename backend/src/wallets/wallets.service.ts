import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  async createWallet(userId: string, name: string) {
    return this.prisma.wallet.create({ data: { userId, name } });
  }

  async getWallets(userId: string) {
    return this.prisma.wallet.findMany({ where: { userId } });
  }

  async updateWallet(id: string, name: string, userId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { id } });

    if (!wallet) {
      throw new NotFoundException('Carteira não encontrada.');
    }

    if (wallet.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para editar esta carteira.',
      );
    }

    return this.prisma.wallet.update({
      where: { id },
      data: { name },
    });
  }

  async deleteWallet(id: string, userId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { id } });

    if (!wallet) {
      throw new NotFoundException('Carteira não encontrada.');
    }

    if (wallet.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para excluir esta carteira.',
      );
    }

    return this.prisma.wallet.delete({ where: { id } });
  }
}
