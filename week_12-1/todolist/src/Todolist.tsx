import React from 'react';
import { useState } from 'react'; // useState 훅을 사용하기 위해 import
import { Button } from 'react-bootstrap';

// 타입스크립트에서 사용하는 타입 정의
type Todo = {
    id : number;
    text : string;
    isChecked : boolean;
}

// 타입스크립트 환경에서 함수형 컴포넌트 타입 명시는 React.FC
const TodoList : React.FC = () => {
    const title : string = "오늘 할일";

    // 데이터를 지켜보다가 변경되면 자동으로 화면을 업데이트 하기 위해 변수 대신 state 사용
    // useState는 배열을 반환하는데, 1 - 변수명, 2 - 변수 변경 함수
    // 같이 선언된 변경 함수로만 state 변경이 가능하다. (데이터 보호)
    // setTodos를 이용해서 state가 변경되면 화면이 자동으로 업데이트 된다.
    const [todos, setTodos] = useState<Todo[]>([
        {id : 1, text : "공부하기", isChecked : false},
        {id : 2, text : "잠자기", isChecked : false},
        {id : 3, text : "밥먹기", isChecked : false}]);

    const handleCheckedChange = (itemId: number) => {
        setTodos((prevItems) => {
            // prevItems는 이전 todos
            return prevItems.map((item) => 
                // item.id와 itemId가 같으면 isChecked를 반대로 바꿔준다.
                item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
            );
        });
    };

    const [newTodo, setNewTodo] = useState<string>("");

    const addTodo = () => {
        if (newTodo.trim() === "") {
            alert("할 일을 입력해주세요.");
            return;
        }

        setTodos([...todos, { id : Date.now(), text : newTodo, isChecked : false}]);
        setNewTodo("");
    }

    const removeTodo = (id : number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    
    const handleTodoClick = (todo : Todo) => {
        setShowDetail(true);
        setSelectedTodo(todo);
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedTodo(null);
    }

    return (
        <div>
            <h1>{title}</h1>
            <div className='container'>
                <div style={{marginBottom : '20px', display : 'flex', justifyContent : 'center'}}>
                    <input type="text" placeholder='할 일을 입력하세요' style={{
                        marginRight : '10px', writingMode : 'horizontal-tb', width : '50%'
                    }} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                    <Button variant='success' onClick={addTodo}>추가</Button>
                </div>
                <div className="board">
                    <ul>
                        {
                            // 기존 todos[0].text로 접근하던 것을 map을 사용하여 반복문으로 접근
                            // map을 사용할 때 key 속성을 꼭 넣어줘야 한다.
                            // 어떤 컴포넌트가 변경되었는지 리액트가 식별할 수 있도록 한다.
                            todos.map((todo) => (
                                <li key={todo.id} style={{ display : 'flex', alignItems : 'center', margin : '10px 0'}}>
                                    <input type="checkbox" style={{ marginRight : '10px'}} onChange={() => {
                                        handleCheckedChange(todo.id);
                                    }} />
                                    <span onClick={() => handleTodoClick(todo)}>
                                        {
                                            todo.isChecked ? <del>{todo.text}</del> : todo.text
                                        }
                                    </span>
                                    <button className='delButton' onClick={() => removeTodo(todo.id)}>삭제</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList;