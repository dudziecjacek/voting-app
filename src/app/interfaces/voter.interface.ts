import { Entity } from './entity.interface';

export interface Voter extends Entity {
  hasVoted: boolean;
}
