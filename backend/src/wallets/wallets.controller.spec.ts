import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('WalletsController', () => {
  let controller: WalletsController;
  let service: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        WalletsService,
        PrismaService,
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
    service = module.get<WalletsService>(WalletsService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar uma carteira via Controller', async () => {
    jest.spyOn(service, 'createWallet').mockResolvedValue({
      id: 'wallet-test-id',
      userId: 'user-test-id',
      name: 'Nova Carteira',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await controller.createWallet(
      { name: 'Nova Carteira' },
      { user: { id: 'user-test-id' } },
    );

    expect(result).toEqual(
      expect.objectContaining({ id: 'wallet-test-id', name: 'Nova Carteira' }),
    );
  });
});
