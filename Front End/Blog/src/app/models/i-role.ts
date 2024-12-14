import { iUser } from './i-user';

export interface iRole {
  id: number;
  name: string;
  users: iUser[];
}
