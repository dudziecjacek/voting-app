import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewEntryComponent } from './new-entry.component';
import { CandidatesService } from 'src/app/services/candidates.service';
import { TrimDirective } from 'src/app/directives/trim.directive';
import { FormService } from 'src/app/services/form.service';

describe('NewEntryComponent', () => {
  let component: NewEntryComponent;
  let fixture: ComponentFixture<NewEntryComponent>;

  const mockFormService: jasmine.SpyObj<FormService> = jasmine.createSpyObj(
    'FormService',
    ['buildForm'],
    {
      NEW_VOTER_MIN_LENGTH: 2,
      NEW_VOTER_MAX_LENGTH: 20,
    }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [NewEntryComponent, TrimDirective],
      providers: [{ provide: CandidatesService, useValue: mockFormService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEntryComponent);
    component = fixture.componentInstance;
    component.entryFormControl = new FormControl('', {
      validators: [Validators.minLength(4)],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addNewCandidate event when check button is clicked', () => {
    spyOn(component.addNewCandidate, 'emit');

    component.entryFormControl.setValue('New Candidate');
    fixture.detectChanges(); // Update the view to show the button

    const button = fixture.nativeElement.querySelector(
      'button[aria-label="Check"]'
    );
    button.click();

    expect(component.addNewCandidate.emit).toHaveBeenCalled();
  });

  it('should emit toggleAddMode event when cancel button is clicked', () => {
    spyOn(component.toggleAddMode, 'emit');

    const button = fixture.nativeElement.querySelector(
      '[testId="cancel-button"]'
    );
    button.click();

    expect(component.toggleAddMode.emit).toHaveBeenCalled();
  });

  it('should display minlength error when value is too short', () => {
    component.entryFormControl.setValue('A');
    component.entryFormControl.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector(
      '[testId="length-error"]'
    );
    expect(errorElement).toBeTruthy();
  });
});
