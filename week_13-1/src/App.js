import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import './App.css';

const finalSpaceCharacters = [
  {
    id : 'gary',
    name : 'Gary Goodspeed'
  },
  {
    id : 'cato',
    name : 'Little Cato'
  },
  {
    id : 'kvn',
    name : 'KVN'
  }
]

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);
  
  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트 정보 포함
    
    // 영역 밖으로 넘어가면 (목적지가 없으면) null
    if(!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 Data 생성
    const items = Array.from(characters);

    // splice : 배열의 내용을 변경
    // 첫번째 매개는 기존 배열에서의 인덱스
    // 두번째 매개는 0일 경우 인덱스에 세번째 매개를 추가
    // 1일 경우 세번째 매개로 대체 -> 세번째 매개가 없다면 지워준다.
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId='characters'>
            {(provided) => (
              <ul className='characters' {...provided.droppableProps} ref={provided.innerRef}>
                {
                  characters.map(({id, name}, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    )
                  })
                }
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
