import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { VotersListColumns } from 'src/app/enums';
import { Voter } from 'src/app/interfaces';
import { VotingStateService } from 'src/app/services/voting-state.service';

@Component({
  selector: 'app-voters-list',
  templateUrl: './voters-list.component.html',
  styleUrls: ['./voters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotersListComponent implements OnInit {
  protected addVoterMode: boolean = false;
  protected newVoterFormControl!: FormControl;
  protected displayedColumns: string[] = [
    VotersListColumns.NAME,
    VotersListColumns.HAS_VOTED,
  ];

  protected votingStateService: VotingStateService = inject(VotingStateService);
  protected fb: FormBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.newVoterFormControl = this.votingStateService.buildForm(
      () => this.votingStateService.voters
    );
  }

  protected enableAddVoterMode(): void {
    this.addVoterMode = true;
  }

  protected addNewVoter(): void {
    if (!this.newVoterFormControl.valid) {
      return;
    }

    const newVotersArray: Voter[] = [...this.votingStateService.voters];
    newVotersArray.push({
      id: crypto.randomUUID(),
      name: this.newVoterFormControl.value,
      hasVoted: false,
    });
    this.votingStateService.voters = newVotersArray;

    this.addVoterMode = false;
    this.newVoterFormControl.reset();
  }
}
