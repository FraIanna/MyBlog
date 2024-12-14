import { iLike } from './i-like';
import { iUser } from './i-user';

export interface iComment {
  id: number;
  author: iUser;
  content: string;
  date?: string;
  likes?: iLike[];
}
