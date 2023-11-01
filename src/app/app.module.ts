import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VotersListComponent } from './components/voters-list/voters-list.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { MakeVoteComponent } from './components/make-vote/make-vote.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { VotingStateService } from './services/voting-state.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TrimDirective } from './directives/trim.directive';
import { NewEntityComponent } from './components/new-entity/new-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    VotersListComponent,
    CandidatesListComponent,
    MakeVoteComponent,
    NewEntityComponent,
    TrimDirective,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [VotingStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
