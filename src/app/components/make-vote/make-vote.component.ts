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

  protected votingStateService: CandidatesService = inject(CandidatesService);
  protected votersService: VotersService = inject(VotersService);
  protected snackBar: MatSnackBar = inject(MatSnackBar);

  protected sendVote(): void {
    if (this.selectedVoter?.hasVoted) {
      this.snackBar.open('This Voter has already casted their vote');
      return;
    }

    this.updateCandidateVoteCount();
    this.updateHasVotedValue();

    this.snackBar.open('Vote has been casted successfully!');

    this.selectedVoter = undefined;
    this.selectedCandidate = undefined;
  }

  private updateCandidateVoteCount(): void {
    // this.findEntityById(
    //   this.candidates,
    //   this.selectedCandidate!
    // )!.voteCount += 1;
  }

  private updateHasVotedValue(): void {
    // this.findEntityById(this.voters, this.selectedVoter!)!.hasVoted = true;
  }

  private findEntityById<T extends { id: string }>(
    entityArray: T[],
    selectedEntity: T
  ): T | undefined {
    return entityArray.find((voter: T) => voter.id === selectedEntity?.id);
  }

  protected get candidates$(): Observable<Candidate[]> {
    return this.votingStateService.candidates$;
  }

  protected get voters$(): Observable<Voter[]> {
    return this.votersService.voters$;
  }
}
