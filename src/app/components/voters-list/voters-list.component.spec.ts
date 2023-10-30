import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl } from '@angular/forms';

import { VotingStateService } from 'src/app/services/voting-state.service';
import { Voter } from 'src/app/interfaces';
import { VotersListComponent } from './voters-list.component';

describe('VotersListComponent', () => {
  let component: VotersListComponent;
  let fixture: ComponentFixture<VotersListComponent>;

  const mockVotingStateService: jasmine.SpyObj<VotingStateService> =
    jasmine.createSpyObj('VotingStateService', ['buildForm'], {
      voters: prepareVoters(),
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotersListComponent],
      imports: [MatTableModule, MatInputModule, MatIconModule],
      providers: [
        { provide: VotingStateService, useValue: mockVotingStateService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockVotingStateService.buildForm.and.returnValue(new FormControl(''));

    fixture = TestBed.createComponent(VotersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable add voter mode when enableAddVoterMode is called', () => {
    component['enableAddVoterMode']();
    expect(component['addVoterMode']).toBeTrue();
  });

  it('should reset the form control after adding a new voter', () => {
    component['newVoterFormControl'].setValue('New Voter');
    component['addNewVoter']();
    fixture.detectChanges();

    expect(component['newVoterFormControl'].value).toBeFalsy();
  });

  it('should not display empty message when there are voters', () => {
    component['votingStateService'].voters = [];
    fixture.detectChanges();

    const noDataRow = fixture.nativeElement.querySelector(
      '[testId="empty-cell-message"]'
    );
    expect(noDataRow).toBeFalsy();
  });
});

function prepareVoters(): Voter[] {
  return [
    { id: '1', name: 'Voter One', hasVoted: false },
    { id: '2', name: 'Voter Two', hasVoted: true },
  ];
}
