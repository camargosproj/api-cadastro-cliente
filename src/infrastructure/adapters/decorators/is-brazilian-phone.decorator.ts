import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isMobilePhone,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBrazilianPhone', async: false })
export class IsBrazilianPhone implements ValidatorConstraintInterface {
  validate(phone: string) {
    if (phone.startsWith('+55') || phone.startsWith('55')) {
      return false;
    }

    if (isMobilePhone(phone, 'pt-BR')) {
      return true;
    }

    return false;
  }

  defaultMessage() {
    return 'Phone must be a valid Brazilian phone number';
  }
}
