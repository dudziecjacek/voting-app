import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { Candidate, Voter } from 'src/app/interfaces';
import { CandidatesService } from '../../services/candidates.service';
import { MakeVoteComponent } from './make-vote.component';
import { of } from 'rxjs';
import { VotersService } from 'src/app/services/voters.service';

describe('MakeVoteComponent', () => {
  let component: MakeVoteComponent;
  let fixture: ComponentFixture<MakeVoteComponent>;
  let votingStateService: CandidatesService;
  let snackBar: MatSnackBar;

  const mockCandidatesService: jasmine.SpyObj<CandidatesService> =
    jasmine.createSpyObj('CandidatesService', ['updateCandidateVotes'], {
      candidates$: of(prepareCandidates()),
    });

  const mockVotersService: jasmine.SpyObj<VotersService> = jasmine.createSpyObj(
    'VotersService',
    ['updateHasVoted'],
    {
      voters$: of(prepareCandidates()),
    }
  );
  const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      declarations: [MakeVoteComponent],
      providers: [
        { provide: CandidatesService, useValue: mockCandidatesService },
        { provide: VotersService, useValue: mockVotersService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MakeVoteComponent);
    component = fixture.componentInstance;
    votingStateService = TestBed.inject(CandidatesService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable vote button when no voter or candidate is selected', () => {
    component['selectedVoter'] = undefined;
    component['selectedCandidate'] = undefined;
    fixture.detectChanges();

    const voteButtonEl = fixture.debugElement.query(
      By.css('[testId="send-vote"]')
    ).nativeElement;
    expect(voteButtonEl.disabled).toBeTrue();
  });

  it('should call snackBar.open when vote is cast', () => {
    component['selectedVoter'] = prepareVoters()[0];
    component['selectedCandidate'] = prepareCandidates()[0];
    fixture.detectChanges();

    component['sendVote']();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });
});

function prepareCandidates(): Candidate[] {
  return [
    { id: '1', name: 'Candidate One', voteCount: 0 },
    { id: '2', name: 'Candidate Two', voteCount: 0 },
  ];
}

function prepareVoters(): Voter[] {
  return [
    { id: '1', name: 'Voter One', hasVoted: false },
    { id: '2', name: 'Voter Two', hasVoted: true },
  ];
}
