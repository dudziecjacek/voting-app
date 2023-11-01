import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Candidate, Voter } from 'src/app/interfaces';
import { VotersService } from 'src/app/services/voters.service';
import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-make-vote',
  templateUrl: './make-vote.component.html',
  styleUrls: ['./make-vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeVoteComponent {
  protected selectedVoter?: Voter;
  protected selectedCandidate?: Candidate;

  protected candidatesService: CandidatesService = inject(CandidatesService);
  protected votersService: VotersService = inject(VotersService);
  protected snackBar: MatSnackBar = inject(MatSnackBar);

  protected sendVote(): void {
    if (this.selectedVoter?.hasVoted) {
      this.snackBar.open(
        'This Voter has already casted their vote',
        undefined,
        {
          duration: 2000,
        }
      );
      return;
    }

    this.updateCandidateVoteCount();
    this.updateHasVotedValue();

    this.snackBar.open('Vote has been casted successfully!', undefined, {
      duration: 2000,
    });

    this.selectedVoter = undefined;
    this.selectedCandidate = undefined;
  }

  private updateCandidateVoteCount(): void {
    this.candidatesService.updateCandidateVotes(this.selectedCandidate!.id);
  }

  private updateHasVotedValue(): void {
    this.votersService.updateHasVoted(this.selectedVoter!.id);
  }

  protected get candidates$(): Observable<Candidate[]> {
    return this.candidatesService.candidates$;
  }

  protected get voters$(): Observable<Voter[]> {
    return this.votersService.voters$;
  }
}
