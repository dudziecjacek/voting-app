import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Voter } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class VotersService {
  private votersSubject: BehaviorSubject<Voter[]> = new BehaviorSubject<Voter[]>([]);
  public voters$ = this.votersSubject.asObservable();

  public setVoters(newVoterName: string): void {
    const newVotersArray: Voter[] = [...this.votersSubject.getValue()];

    newVotersArray.push({
      id: crypto.randomUUID(),
      name: newVoterName,
      hasVoted: false,
    });

    this.votersSubject.next(newVotersArray);
  }

  public updateHasVoted(voterId: string): void {
    const newVotersArray: Voter[] = this.votersSubject
      .getValue()
      .map((voter) => {
        if (voter.id === voterId) {
          return { ...voter, hasVoted: !voter.hasVoted };
        }
        return voter;
      });

    this.votersSubject.next(newVotersArray);
  }
}
