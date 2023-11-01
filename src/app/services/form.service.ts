import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/validators';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public NEW_VOTER_MIN_LENGTH: number = 2;
  public NEW_VOTER_MAX_LENGTH: number = 20;

  private fb: FormBuilder = inject(FormBuilder);

  public buildForm(entities: any): FormControl {
    return this.fb.control('', {
      validators: [
        Validators.minLength(this.NEW_VOTER_MIN_LENGTH),
        Validators.maxLength(this.NEW_VOTER_MAX_LENGTH),
      ],
      asyncValidators: [CustomValidators.existingNameValidator(entities)],
    });
  }
}
