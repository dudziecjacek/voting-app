import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { CandidatesListComponent } from './candidates-list.component';
import { CandidatesService } from 'src/app/services/candidates.service';
import { Candidate } from 'src/app/interfaces';
import { of } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

describe('CandidatesListComponent', () => {
  let component: CandidatesListComponent;
  let fixture: ComponentFixture<CandidatesListComponent>;

  const mockCandidatesService: jasmine.SpyObj<CandidatesService> =
    jasmine.createSpyObj('CandidatesService', ['setCandidates'], {
      candidates$: of(prepareCandidates()),
    });
  const mockFormService: jasmine.SpyObj<FormService> = jasmine.createSpyObj(
    'FormService',
    ['buildForm']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatesListComponent],
      imports: [MatTableModule, MatInputModule, MatIconModule],
      providers: [
        { provide: CandidatesService, useValue: mockCandidatesService },
        { provide: FormService, useValue: mockFormService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockFormService.buildForm.and.returnValue(new FormControl(''));

    fixture = TestBed.createComponent(CandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable add voter mode when enableAddCandidateMode is called', () => {
    component['enableAddCandidateMode']();
    expect(component['addCandidateMode']).toBeTrue();
  });

  it('should reset the form control after adding a new voter', () => {
    component['newCandidateFormControl'].setValue('New Candidate');
    component['addNewCandidate']();
    fixture.detectChanges();

    expect(component['newCandidateFormControl'].value).toBeFalsy();
  });

  it('should not display empty message when there are candidates', () => {
    const noDataRow = fixture.nativeElement.querySelector(
      '[testId="empty-cell-message"]'
    );
    expect(noDataRow).toBeFalsy();
  });
});

function prepareCandidates(): Candidate[] {
  return [
    { id: '1', name: 'Candidate One', voteCount: 0 },
    { id: '2', name: 'Candidate Two', voteCount: 0 },
  ];
}
