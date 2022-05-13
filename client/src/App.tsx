import './scss/style.scss'
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

const App = () => (
    <div className="frame">
      <div className="frame__scroller">
        <NavBar />
        <div className="frame__content">
        <Outlet />
        </div>
      </div>
    </div>
  )

export default App
