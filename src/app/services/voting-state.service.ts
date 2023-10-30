import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Voter, Candidate } from 'src/app/interfaces';
import { CustomValidators } from 'src/app/validators/validators';

@Injectable({
  providedIn: 'root',
})
export class VotingStateService {
  public voters: Voter[] = [];
  public candidates: Candidate[] = [];
  public NEW_VOTER_MIN_LENGTH: number = 2;
  public NEW_VOTER_MAX_LENGTH: number = 20;
  protected fb: FormBuilder = inject(FormBuilder);

  public buildForm(entities: any): FormControl {
    return this.fb.control('', {
      validators: [
        Validators.minLength(this.NEW_VOTER_MIN_LENGTH),
        Validators.maxLength(this.NEW_VOTER_MAX_LENGTH),
        CustomValidators.existingNameValidator(entities),
      ],
    });
  }
}
