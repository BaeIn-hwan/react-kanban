import { useCallback } from 'react';
import { UUID } from '@/store/commonTypes';
import useCardEntities from '@/store/useCardEntities';
import useListidCardidOrders from '@/store/useListidCardidOrders';
import * as D from '@/data';

export const useCards = (listid: UUID) => {
  const C = useCardEntities();
  const LC = useListidCardidOrders();

  const cards = LC.listidCardidOrders[listid]
    .map(uuid => C.cardEntities[uuid])
    .filter(item => item);

  const onPrependCard = useCallback(() => {
    const card = D.makeRandomCard();

    C.cardEntitiesAdd(card);
    LC.listidCardidOrdersPrependCardid({ listid, cardid: card.uuid });
  }, [C, LC, listid]);

  const onAppendCard = useCallback(() => {
    const card = D.makeRandomCard();

    C.cardEntitiesAdd(card);
    LC.listidCardidOrdersAppendCardid({ listid, cardid: card.uuid });
  }, [C, LC, listid]);

  const onRemoveCard = useCallback(
    (uuid: UUID) => () => {
      C.cardEntitiesRemove(uuid);
      LC.listidCardidOrdersRemoveCardid({ listid: listid, cardid: uuid });
    },
    [C, LC, listid]
  );

  return { cards, onPrependCard, onAppendCard, onRemoveCard };
};
