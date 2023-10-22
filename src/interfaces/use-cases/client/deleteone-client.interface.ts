export interface DeleteOneClientsUseCase {
  execute(id: string): Promise<void>;
}
