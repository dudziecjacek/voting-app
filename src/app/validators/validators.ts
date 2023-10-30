import { ValidatorFn, AbstractControl } from '@angular/forms';

import { Entity } from '../interfaces/entity.interface';

export abstract class CustomValidators {
  public static existingNameValidator(entities: () => Entity[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const existingEntity = entities().some(
        (entity: Entity) => entity.name === control.value
      );
      return existingEntity ? { existingName: { value: control.value } } : null;
    };
  }
}
