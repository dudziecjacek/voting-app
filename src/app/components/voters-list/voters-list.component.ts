import { VotersService } from './../../services/voters.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { VotersListColumns } from 'src/app/enums';
import { Voter } from 'src/app/interfaces';
import { FormService } from 'src/app/services/form.service';

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

  protected votersService: VotersService = inject(VotersService);
  private formService: FormService = inject(FormService);

  public ngOnInit(): void {
    this.newVoterFormControl = this.formService.buildForm(this.voters);
  }

  protected enableAddVoterMode(): void {
    this.addVoterMode = true;
  }

  protected addNewVoter(): void {
    if (!this.newVoterFormControl.valid) {
      return;
    }

    this.votersService.setVoters(this.newVoterFormControl.value);

    this.clearFormState();
  }

  protected clearFormState(): void {
    this.addVoterMode = false;
    this.newVoterFormControl.reset();
  }

  protected get voters(): Observable<Voter[]> {
    return this.votersService.voters$;
  }
}
