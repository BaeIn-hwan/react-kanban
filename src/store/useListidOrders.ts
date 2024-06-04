import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import * as T from './commonTypes';

type Store = {
  listidOrders: T.UUID[];
  listidOrderSet: (payload: T.UUID[]) => void;
  listidOrderAdd: (payload: T.UUID) => void;
  listidOrderRemove: (payload: T.UUID) => void;
};

const createStore: StateCreator<Store> = set => ({
  listidOrders: [],
  listidOrderSet: payload => set({ listidOrders: payload }),
  listidOrderAdd: payload =>
    set(state => ({ listidOrders: [...state.listidOrders, payload] })),
  listidOrderRemove: payload =>
    set(state => ({
      listidOrders: state.listidOrders.filter(uuid => uuid !== payload)
    }))
});

const useListidOrders =
  import.meta.env.MODE !== 'production'
    ? create(devtools(createStore))
    : create(createStore);

export default useListidOrders;
