import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

import { Observable, first, map } from 'rxjs';
import { Candidate, Voter } from '../interfaces';

export abstract class CustomValidators {
  public static existingNameValidator(
    entities: Observable<Voter[] | Candidate[]>
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return entities.pipe(
        first(),
        map((entryArray) => {
          const isNameExisting = entryArray.some(
            (entry) => entry.name === control.value
          );
          return isNameExisting
            ? { existingName: { value: control.value } }
            : null;
        })
      );
    };
  }
}

/*
export abstract class CustomValidators {
  public static existingNameValidator(
    entities: () => Observable<Voter[] | Candidate[]>
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isExisting: boolean = false;
      entities()
        .pipe(first())
        .subscribe((entry) => {
          isExisting = entry.some(
            (entry: Entity) => entry.name === control.value
          );
        });
      return isExisting ? { existingName: { value: control.value } } : null;
    };
  }
}*/
