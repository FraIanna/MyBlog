import { iArticle } from './i-article';
import { iComment } from './i-comment';
import { iUser } from './i-user';

export interface iLike {
  id: number;
  user: iUser;
  article: iArticle;
  comment: iComment;
  date: string;
}
