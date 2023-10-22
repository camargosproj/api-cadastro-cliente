import { IsBrazilianPhone } from './is-brazilian-phone.decorator';

describe('IsBrazilianPhone', () => {
  let validator: IsBrazilianPhone;

  beforeEach(() => {
    validator = new IsBrazilianPhone();
  });

  it('should return true for a valid Brazilian phone number', () => {
    const validPhones = ['75983609518', '11999999999'];

    for (const phone of validPhones) {
      const isValid = validator.validate(phone);
      expect(isValid).toBe(true);
    }
  });

  it('should return false for an invalid Brazilian phone number', () => {
    const invalidPhones = [
      '123456',
      '+121299999999',
      '551188888',
      'abcde12345',
    ];

    for (const phone of invalidPhones) {
      const isValid = validator.validate(phone);
      expect(isValid).toBe(false);
    }
  });

  it('should return false for non-Brazilian phone numbers', () => {
    const nonBrazilianPhones = ['12065551234', '+447987654321'];

    for (const phone of nonBrazilianPhones) {
      const isValid = validator.validate(phone);
      expect(isValid).toBe(false);
    }
  });
});
