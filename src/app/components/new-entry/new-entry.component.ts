import { ChangeDetectionStrategy } from '@angular/core';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEntryComponent {
  @Input({ required: true }) entryFormControl!: FormControl;
  @Output() addNewCandidate: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleAddMode: EventEmitter<void> = new EventEmitter<void>();

  protected formService: FormService = inject(FormService);
}
