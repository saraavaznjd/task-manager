import { useSelector } from 'react-redux';
import './App.css'
import Board from './components/board/Board'
import type { RootState } from './app/store';
import { Login } from './pages/Login';

function App() {

  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return <Login />;

  return <Board />;
}

export default App
