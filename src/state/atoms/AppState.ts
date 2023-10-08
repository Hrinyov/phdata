import { atom } from 'recoil';
import { Data } from '../../types';

export const tokenState = atom<string | null>({
key: 'tokenState',
default: null,
});

export const photoDataState = atom<Data | null>({
    key:'photoDataState',
    default: null
});
