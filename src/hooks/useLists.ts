import { useCallback } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import * as U from '@/utils';
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

  const onMoveList = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrders = LO.listidOrders.map((item, index) =>
        index === dragIndex
          ? LO.listidOrders[hoverIndex]
          : index === hoverIndex
          ? LO.listidOrders[dragIndex]
          : item
      );

      LO.listidOrderSet(newOrders);
    },
    [LO]
  );

  const onDragEnd = useCallback((result: DropResult) => {
    const destinationListid = result.destination?.droppableId;
    const destinationCardIndex = result.destination?.index;
    if (destinationListid === undefined || destinationCardIndex === undefined) return;

    const sourceListid = result.source.droppableId;
    const sourceCardIndex = result.source.index;

    if (destinationListid === sourceListid) {
      const cardidOrders = LC.listidCardidOrders[destinationListid];

      LC.listidCardidOrdersSet({
        listid: destinationListid,
        cardids: U.swapItemsInArray(cardidOrders, sourceCardIndex, destinationCardIndex)
      });
    } else {
      const sourceCardidOrders = LC.listidCardidOrders[sourceListid];

      LC.listidCardidOrdersSet({
        listid: sourceListid,
        cardids: U.removeItemAtIndexInArray(sourceCardidOrders, sourceCardIndex)
      });

      const destinationCardidOrders = LC.listidCardidOrders[destinationListid];

      LC.listidCardidOrdersSet({
        listid: destinationListid,
        cardids: U.insertItemAtIndexInArray(
          destinationCardidOrders,
          destinationCardIndex,
          result.draggableId
        )
      });
    }
  }, []);

  return { lists, onCreateList, onRemoveList, onMoveList, onDragEnd };
};
