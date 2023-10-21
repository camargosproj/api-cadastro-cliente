import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string) {
    return await this.cacheManager.get<T>(key);
  }
  async set<T>(key: string, value: T) {
    return this.cacheManager.set(key, value);
  }
}
