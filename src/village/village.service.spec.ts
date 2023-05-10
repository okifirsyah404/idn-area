import { Test, TestingModule } from '@nestjs/testing';
import { HelperModule } from '~/src/helper/helper.module';
import { PrismaService } from '~/src/prisma.service';
import { VillageController } from './village.controller';
import { VillageService } from './village.service';

describe('VillageService', () => {
  let service: VillageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HelperModule],
      controllers: [VillageController],
      providers: [PrismaService, VillageService],
    }).compile();

    service = module.get<VillageService>(VillageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
