import { useCallback } from 'react';
import useListidOrders from '../store/useListidOrders';
import useListEntities from '../store/useListEntities';
import useCardEntities from '../store/useCardEntities';
import useListidCardidOrders from '../store/useListidCardidOrders';

export const useLists = () => {
  const LO = useListidOrders();
  const L = useListEntities();
  const C = useCardEntities();
  const LC = useListidCardidOrders();

  const lists = LO.listidOrders.map(uuid => L.listEntities[uuid]);

  const onCreateList = useCallback(
    (uuid: string, title: string) => {
      const list = { uuid, title };

      LO.listidOrderAdd(uuid);
      L.listEntitiesAdd(list);
      LC.listidCardidOrdersSet({ listid: list.uuid, cardids: [] });
    },
    [L, LC, LO]
  );

  const onRemoveList = useCallback(
    (listid: string) => () => {
      LC.listidCardidOrders[listid].forEach(cardid => {
        C.cardEntitiesRemove(cardid);
      });

      LC.listidCardidOrdersRemove(listid);
      L.listEntitiesRemove(listid);
      LO.listidOrderRemove(listid);
    },
    [C, L, LC, LO]
  );

  const onMoveList = useCallback((dragIndex: number, hoverIndex: number) => {
    const newOrders = LO.listidOrders.map((item, index) =>
      index === dragIndex
        ? LO.listidOrders[hoverIndex]
        : index === hoverIndex
        ? LO.listidOrders[dragIndex]
        : item
    );

    LO.listidOrderSet(newOrders);
  }, []);

  return { lists, onCreateList, onRemoveList, onMoveList };
};
