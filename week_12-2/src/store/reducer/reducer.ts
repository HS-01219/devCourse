import { boardsReducer } from "../slices/boardSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";

const reducer = {
    logger : loggerReducer,
    boards : boardsReducer,
    modal : modalReducer
}

export default reducer; // combineReducers로 합쳐서 export 해줘야 함