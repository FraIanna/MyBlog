import { iCategory } from './i-category';
import { iComment } from './i-comment';
import { iLike } from './i-like';
import { iTag } from './i-tag';
import { iUser } from './i-user';

export interface iArticle {
  id: number;
  title: string;
  content: string;
  category: iCategory;
  date?: string;
  tags?: iTag;
  likes?: iLike[];
  comments?: iComment[];
  user: iUser;
  imagePath?: number[];
}
