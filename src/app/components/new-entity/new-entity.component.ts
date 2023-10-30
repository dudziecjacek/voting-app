import { ChangeDetectionStrategy } from '@angular/core';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VotingStateService } from 'src/app/services/voting-state.service';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrls: ['./new-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEntityComponent {
  @Input({ required: true }) entityFormControl!: FormControl;
  @Output() addNewCandidate: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleAddMode: EventEmitter<void> = new EventEmitter<void>();

  protected votingStateService: VotingStateService = inject(VotingStateService);
}
