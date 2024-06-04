import { useMemo, useRef } from 'react';
import { Title } from '@/components';
import CreateListForm from './CreateListForm';
import BoardList from '../BoardList';
import { useDrop } from 'react-dnd';
import { useLists } from '@/hooks/useLists';

function Board() {
  const divRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'list'
  });
  drop(divRef);
  const { lists, onCreateList, onRemoveList, onMoveList } = useLists();

  const children = useMemo(
    () =>
      lists.map((list, index) => (
        <BoardList
          key={list.uuid}
          list={list}
          onRemoveList={onRemoveList(list.uuid)}
          index={index}
          onMoveList={onMoveList}
        />
      )),
    [lists, onRemoveList, onMoveList]
  );

  return (
    <section className="mt-4">
      <Title>Board</Title>
      <div className="flex flex-wrap p-2 mt-4">
        {children}
        <CreateListForm onCreateList={onCreateList} />
      </div>
    </section>
  );
}

export default Board;
