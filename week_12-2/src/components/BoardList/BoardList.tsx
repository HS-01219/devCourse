import React, { FC, useRef, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { IBoard } from '../../types';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import SideForm from './SideForm/SideForm';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import { app } from '../../firebase';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';

type TBoardListProps = {
  activeBoardId : string;
  setActiveBoardId : React.Dispatch<React.SetStateAction<string>>;
}

const BoardList : FC<TBoardListProps> = ({activeBoardId, setActiveBoardId}) => {
  const { boardArray } = useTypedSelector(state => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useTypedDispatch();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const {isAuth} = useAuth();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then(userCredential => {
      console.log(userCredential);
      dispatch(setUser({
        email : userCredential.user.email,
        id : userCredential.user.uid
      }));
    }).catch(error => {
      console.error(error);
    });
  }

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    // input 객체가 렌더링된 후에 focus를 주기 위해서 setTimeout을 사용
    // ref 학습용, 실제로는 autoFocus를 input에 지정하면 됨
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      dispatch(removeUser());
    }).catch((error) => {
      console.error(error);
    })
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

        {
          isAuth ? 
          <GoSignOut className={addButton} onClick={handleSignOut} />
          :
          <FiLogIn className={addButton} onClick={handleLogin} />
        }
      </div>
    </div>
  )
}

export default BoardList;
