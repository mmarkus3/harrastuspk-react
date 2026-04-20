export interface Training {
  id: string;
  type: string;
  duration?: number;
  desc?: string;
  athlete: string;
  date: Date;
  done?: boolean;
  deleted?: boolean;
  // Helper property
  name?: string;
}