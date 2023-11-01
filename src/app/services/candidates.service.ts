import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Candidate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private candidatesSubject: BehaviorSubject<Candidate[]> = new BehaviorSubject<Candidate[]>([]);
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

  public updateCandidateVotes(candidateId: string): void {
    const newCandidatesArray: Candidate[] = this.candidatesSubject
      .getValue()
      .map((candidate) => ({
        ...candidate,
        voteCount:
          candidate.id === candidateId
            ? candidate.voteCount + 1
            : candidate.voteCount,
      }));

    this.candidatesSubject.next(newCandidatesArray);
  }
}
