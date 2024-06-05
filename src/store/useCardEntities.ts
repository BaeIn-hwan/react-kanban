import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import * as T from './commonTypes';

type Store = {
  cardEntities: Record<T.UUID, T.Card>;
  cardEntitiesAdd: (payload: T.Card) => void;
  cardEntitiesRemove: (payload: T.UUID) => void;
};

const createStore: StateCreator<Store> = set => ({
  cardEntities: {},
  cardEntitiesAdd: payload =>
    set(state => ({ cardEntities: { ...state.cardEntities, [payload.uuid]: payload } })),
  cardEntitiesRemove: (payload: string) =>
    set(state => {
      const newState = { ...state.cardEntities };
      delete newState[payload];
      console.log(newState);
      return { cardEntities: newState };
    })
});

const useCardEntities =
  import.meta.env.MODE !== 'production'
    ? create(devtools(createStore))
    : create(createStore);

export default useCardEntities;
