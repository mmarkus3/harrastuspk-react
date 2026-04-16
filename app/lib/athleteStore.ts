import { create } from 'zustand'
import { Athlete } from '../models/athlete';
import { setCookie } from 'cookies-next';

export interface AthleteStore {
  athlete: Athlete | null;
  changeAthlete: (item: Athlete) => void;
}

export const useAthleteStore = create<AthleteStore>((set) => ({
  athlete: null,
  changeAthlete: (item: Athlete) => set(() => {
    setCookie('__athlete', item.id);
    return ({ athlete: { ...item } });
  })
}))