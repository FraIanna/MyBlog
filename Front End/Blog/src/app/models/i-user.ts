import { iComment } from './i-comment';
import { iLike } from './i-like';
import { iRole } from './i-role';
import { iSocial } from './i-social';

export interface iUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  biography: string;
  roles?: iRole[];
  likes?: iLike[];
  comments?: iComment[];
  image?: number[];
  socials?: iSocial[];
}
