import { iUser } from './i-user';

export interface iSocial {
  id: number;
  platform: string;
  url: string;
  user: iUser;
}
