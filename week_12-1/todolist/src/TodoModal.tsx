import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type Todo = {
    id : number;
    text : string;
    isChecked : boolean;
}

type TodoModalProps = {
    show : boolean;
    todo : Todo | null;
    handleClose : () => void;
}

const TodoModal : React.FC<TodoModalProps> = ({show, todo, handleClose}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Todo Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{todo?.text ?? "선택 Todo 없음"}</h5>
                    <p>{todo?.isChecked ? "완료" : "미완료"}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TodoModal;