import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheService } from '../../../../interfaces/services/cache-service.interface';

@Injectable()
export class CacheServiceImpl implements CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string) {
    return await this.cacheManager.get<T>(key);
  }
  async set<T>(key: string, value: T) {
    return this.cacheManager.set(key, value);
  }
}
