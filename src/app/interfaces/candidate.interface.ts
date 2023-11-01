import { Entity } from './entity.interface';

export interface Candidate extends Entity {
  voteCount: number;
}
