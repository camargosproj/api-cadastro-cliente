export abstract class CacheService {
  abstract get<T>(key: string): Promise<T>;
  abstract set<T>(key: string, value: T): Promise<void>;
}
