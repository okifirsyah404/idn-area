import { Injectable } from '@nestjs/common';
import { Province, Regency } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { getDBProviderFeatures } from '@/common/utils/db';
import { SortOptions, Sorter } from '~/utils/helpers/sorter';

type ProvinceSortKeys = keyof Province;

@Injectable()
export class ProvinceService {
  private readonly sortHelper: Sorter<ProvinceSortKeys>;

  constructor(private readonly prisma: PrismaService) {
    this.sortHelper = new Sorter<ProvinceSortKeys>({
      sortBy: 'code',
      sortOrder: 'asc',
    });
  }

  /**
   * If the name is empty, all provinces will be returned.
   * Otherwise, it will only return the provinces with the matching name.
   * @param name Filter by province name (optional).
   * @param sort The sort query (optional).
   * @returns The array of provinces.
   */
  async find(
    name = '',
    sort?: SortOptions<ProvinceSortKeys>,
  ): Promise<Province[]> {
    return this.prisma.province.findMany({
      where: {
        name: {
          contains: name,
          ...(getDBProviderFeatures()?.filtering?.insensitive && {
            mode: 'insensitive',
          }),
        },
      },
      orderBy: this.sortHelper.object(sort),
    });
  }

  /**
   * Find a province by its code.
   * @param code The province code.
   * @returns An province, or `null` if there are no match province.
   */
  async findByCode(code: string): Promise<Province> {
    return this.prisma.province.findUnique({
      where: {
        code: code,
      },
    });
  }

  /**
   * Find all regencies in a province.
   * @param provinceCode The province code.
   * @returns Array of regency in the match province, or `false` if there are no province found.
   */
  async findRegencies(
    provinceCode: string,
    sort?: SortOptions<ProvinceSortKeys>,
  ): Promise<false | Regency[]> {
    const regencies = await this.prisma.province
      .findUnique({
        where: {
          code: provinceCode,
        },
      })
      .regencies({
        orderBy: this.sortHelper.object(sort),
      });

    return regencies ?? false;
  }
}
