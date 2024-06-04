import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import * as T from './commonTypes';

type Store = {
  listEntities: Record<string, T.List>;
  listEntitiesAdd: (payload: T.List) => void;
  listEntitiesRemove: (payload: T.UUID) => void;
};

const createStore: StateCreator<Store> = set => ({
  listEntities: {},
  listEntitiesAdd: payload =>
    set(state => ({
      listEntities: { ...state.listEntities, [payload.uuid]: payload }
    })),
  listEntitiesRemove: payload =>
    set(state => {
      const newState = { ...state.listEntities };
      delete newState[payload];
      return { listEntities: newState };
    })
});

const useListEntities =
  import.meta.env.MODE !== 'production'
    ? create(devtools(createStore))
    : create(createStore);

export default useListEntities;
