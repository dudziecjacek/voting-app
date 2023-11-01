import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

import { CandidatesListColumns } from 'src/app/enums';
import { Candidate } from 'src/app/interfaces';
import { VotingStateService } from 'src/app/services/voting-state.service';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesListComponent {
  protected addCandidateMode: boolean = false;
  protected newCandidateFormControl!: FormControl;
  protected displayedColumns: string[] = [
    CandidatesListColumns.NAME,
    CandidatesListColumns.VOTE_COUNT,
  ];

  protected votingStateService: VotingStateService = inject(VotingStateService);
  protected fb: FormBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.newCandidateFormControl = this.votingStateService.buildForm(
      () => this.votingStateService.candidates
    );
  }

  protected enableAddCandidateMode(): void {
    this.addCandidateMode = true;
  }

  protected addNewCandidate(): void {
    if (!this.newCandidateFormControl.valid) {
      return;
    }

    const newCandidatesArray: Candidate[] = [
      ...this.votingStateService.candidates,
    ];
    newCandidatesArray.push({
      id: crypto.randomUUID(),
      name: this.newCandidateFormControl.value,
      voteCount: 0,
    });
    this.votingStateService.candidates = newCandidatesArray;

    this.addCandidateMode = false;
    this.newCandidateFormControl.reset();
  }
}
