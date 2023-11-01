import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, first } from 'rxjs';

import { CandidatesListColumns } from 'src/app/enums';
import { Candidate } from 'src/app/interfaces';
import { FormService } from 'src/app/services/form.service';
import { CandidatesService } from 'src/app/services/candidates.service';

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

  private votingStateService: CandidatesService = inject(CandidatesService);
  private formService: FormService = inject(FormService);

  public ngOnInit(): void {
    this.candidates.pipe(first()).subscribe((candidates) => {
      this.newCandidateFormControl = this.formService.buildForm(
        () => candidates
      );
    });
  }

  protected enableAddCandidateMode(): void {
    this.addCandidateMode = true;
  }

  protected addNewCandidate(): void {
    if (!this.newCandidateFormControl.valid) {
      return;
    }

    this.votingStateService.setCandidates(this.newCandidateFormControl.value);

    this.clearFormState();
  }

  protected clearFormState(): void {
    this.newCandidateFormControl.reset();
    this.addCandidateMode = false;
  }

  protected get candidates(): Observable<Candidate[]> {
    return this.votingStateService.candidates$;
  }
}
