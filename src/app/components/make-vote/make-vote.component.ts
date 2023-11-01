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

  private static readonly SNACK_BAR_DURATION_IN_MS: number = 2_000;

  protected sendVote(): void {
    if (this.selectedVoter?.hasVoted) {
      this.showSnackBar('❌', 'This Voter has already casted their vote');
      return;
    }

    this.updateCandidateVoteCount();
    this.updateWhoVoted();
    this.resetSelection();

    this.showSnackBar('✅', 'Vote has been casted successfully!');
  }

  private updateCandidateVoteCount(): void {
    this.candidatesService.updateCandidateVotes(this.selectedCandidate!.id);
  }

  private updateWhoVoted(): void {
    this.votersService.updateHasVoted(this.selectedVoter!.id);
  }

  private showSnackBar(action: string, message: string): void {
    this.snackBar.open(message, action, {
      duration: MakeVoteComponent.SNACK_BAR_DURATION_IN_MS,
    });
  }

  private resetSelection(): void {
    this.selectedVoter = undefined;
    this.selectedCandidate = undefined;
  }

  protected get candidates$(): Observable<Candidate[]> {
    return this.candidatesService.candidates$;
  }

  protected get voters$(): Observable<Voter[]> {
    return this.votersService.voters$;
  }
}
