import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('WalletsService', () => {
  let service: WalletsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsService, PrismaService],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma carteira', async () => {
    const createWalletMock = jest
      .spyOn(prisma.wallet, 'create')
      .mockResolvedValue({
        id: 'wallet-test-id',
        userId: 'user-test-id',
        name: 'Minha Carteira',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    const result = await service.createWallet('user-test-id', 'Minha Carteira');

    expect(createWalletMock).toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({ id: 'wallet-test-id', name: 'Minha Carteira' }),
    );
  });
});
