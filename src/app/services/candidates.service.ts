import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Voter, Candidate } from 'src/app/interfaces';
import { CustomValidators } from 'src/app/validators/validators';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private candidatesSubject: BehaviorSubject<Candidate[]> = new BehaviorSubject<
    Candidate[]
  >([]);
  public candidates$ = this.candidatesSubject.asObservable();

  public setCandidates(newCandidate: string): void {
    const newCandidatesArray: Candidate[] = [
      ...this.candidatesSubject.getValue(),
    ];

    newCandidatesArray.push({
      id: crypto.randomUUID(),
      name: newCandidate,
      voteCount: 0,
    });

    this.candidatesSubject.next(newCandidatesArray);
  }
}