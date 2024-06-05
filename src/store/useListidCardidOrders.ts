import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import * as T from './commonTypes';

type Store = {
  listidCardidOrders: Record<T.UUID, T.UUID[]>;
  listidCardidOrdersSet: (payload: { listid: T.UUID; cardids: T.UUID[] }) => void;
  listidCardidOrdersRemove: (payload: T.UUID) => void;
  listidCardidOrdersPrependCardid: (payload: T.ListidCardid) => void;
  listidCardidOrdersAppendCardid: (payload: T.ListidCardid) => void;
  listidCardidOrdersRemoveCardid: (payload: T.ListidCardid) => void;
};

const createStore: StateCreator<Store> = set => ({
  listidCardidOrders: {},
  listidCardidOrdersSet: payload =>
    set(state => ({
      listidCardidOrders: {
        ...state.listidCardidOrders,
        [payload.listid]: payload.cardids
      }
    })),
  listidCardidOrdersRemove: payload =>
    set(state => {
      const newState = { ...state.listidCardidOrders };
      delete newState[payload];
      return newState;
    }),
  listidCardidOrdersPrependCardid: payload =>
    set(state => {
      const cardids = state.listidCardidOrders[payload.listid];
      return {
        listidCardidOrders: {
          ...state.listidCardidOrders,
          [payload.listid]: [payload.cardid, ...cardids]
        }
      };
    }),
  listidCardidOrdersAppendCardid: payload =>
    set(state => {
      const cardids = state.listidCardidOrders[payload.listid];
      return {
        listidCardidOrders: {
          ...state.listidCardidOrders,
          [payload.listid]: [...cardids, payload.cardid]
        }
      };
    }),
  listidCardidOrdersRemoveCardid: payload =>
    set(state => {
      const cardids = state.listidCardidOrders[payload.listid];
      return {
        ...state.listidCardidOrders,
        [payload.listid]: cardids.filter(id => id !== payload.cardid)
      };
    })
});

const useListidCardidOrders =
  import.meta.env.MODE !== 'production'
    ? create(devtools(createStore))
    : create(createStore);

export default useListidCardidOrders;
