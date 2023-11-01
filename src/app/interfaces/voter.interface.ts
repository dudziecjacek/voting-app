import { Entity } from './entry.interface';

export interface Voter extends Entity {
  hasVoted: boolean;
}
