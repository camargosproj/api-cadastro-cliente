export class CustomHttpException extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.name = 'HttpException';
    this.code = code;
  }
}

export class AddressNotFoundError extends CustomHttpException {
  constructor() {
    super('Address not found', 404);
  }
}

export class CepNotFoundError extends CustomHttpException {
  constructor() {
    super('Cep not found', 404);
  }
}
