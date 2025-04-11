import React, { FC, useRef, useState } from 'react'
import { useTypedSelector } from '../../hooks/redux';
import { IBoard } from '../../types';
import { FiPlusCircle } from 'react-icons/fi';
import SideForm from './SideForm/SideForm';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';

type TBoardListProps = {
  activeBoardId : string;
  setActiveBoardId : React.Dispatch<React.SetStateAction<string>>;
}

const BoardList : FC<TBoardListProps> = ({activeBoardId, setActiveBoardId}) => {
  const { boardArray } = useTypedSelector(state => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    // input 객체가 렌더링된 후에 focus를 주기 위해서 setTimeout을 사용
    // ref 학습용, 실제로는 autoFocus를 input에 지정하면 됨
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }
  
  return (
    <div className={container}>
      <div className={title}>
        게시판:
      </div>
      {
        boardArray.map((board : IBoard, index : number) => (
          <div key={board.boardId}
            onClick={() => setActiveBoardId(board.boardId)}
            className={
              clsx(
                {
                  [boardItemActive] : boardArray.findIndex(b => b.boardId === activeBoardId) === index,
                  [boardItem] : boardArray.findIndex(b => b.boardId === activeBoardId) !== index
                }
              )
            }>
            <div>
              {board.boardName}
            </div>
          </div>
        ))
      }
      <div className={addSection}>
        {
          isFormOpen ? 
            <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen} />
          :
            <FiPlusCircle className={addButton} onClick={handleClick} /> // React Icons
        }
      </div>
    </div>
  )
}

export default BoardList
