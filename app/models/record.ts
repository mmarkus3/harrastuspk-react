export interface Record {
  id?: string;
  athlete: string;
  type: string;
  value: string;
  date: Date;
  name?: string;
  history?: { date: Date; value: string }[];
}