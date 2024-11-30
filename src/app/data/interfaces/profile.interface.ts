export interface Profile {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}
export interface QueryParamsProfile {
  stack: string;
  firstName: string;
  lastName: string;
  city: string;
  orderBy: 'desc' | 'asc'
}
