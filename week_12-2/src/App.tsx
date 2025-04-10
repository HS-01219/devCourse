import { appContainer, board, buttons } from './App.css'

function App() {
  return (
    <div className={appContainer}>
        <div>

        </div>
        <div>
          <button className={board}>
            이 게시판 삭제하기
          </button>
          <button className={buttons}>
            활동 목록 보이기
          </button>
        </div>
    </div>
  )
}

export default App
