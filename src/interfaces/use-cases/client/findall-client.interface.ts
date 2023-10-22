export interface ClientPaginated {
  count: number;
  previous: string;
  next: string;
  results: {
    id: string;
    name: string;
  }[];
}

export interface FindAllClientsUseCase {
  execute(
    name: string,
    limit: number,
    offset: number,
    basePath: string,
  ): Promise<ClientPaginated>;
}
