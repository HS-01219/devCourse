import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ITask } from '../../types/index';

type TModalState = {
    boardId : string,
    listId : string,
    task : ITask;
}

type TSetModalDataAction = {
    boardId : string;
    listId : string;
    task : ITask;
}

const initialState : TModalState = {
    boardId : "board-0",
    listId : "list-0",
    task : {
        taskId : "task-0",
        taskName : "task 0",
        taskDescription : "task description",
        taskOwner : "John"
    }
}

const modalSlice = createSlice({
    name : 'modal',
    initialState, // initialState : initialState, 이름이 같으면 하나만 적어도 됨
    reducers : { // 액션을 생성하는 함수들
        setModalData : (state, {payload} : PayloadAction<TSetModalDataAction>) => {
            state.boardId = payload.boardId;
            state.listId = payload.listId;
            state.task = payload.task;
        }
    }
})

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;