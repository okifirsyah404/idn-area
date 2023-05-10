import { Test, TestingModule } from '@nestjs/testing';
import { HelperModule } from '~/src/helper/helper.module';
import { PrismaService } from '~/src/prisma.service';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';

describe('ProvinceController', () => {
  let controller: ProvinceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HelperModule],
      controllers: [ProvinceController],
      providers: [PrismaService, ProvinceService],
    }).compile();

    controller = module.get<ProvinceController>(ProvinceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
