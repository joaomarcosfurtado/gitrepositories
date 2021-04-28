import { UserInfoProvider } from "./hooks/useUserInfo";
import { ToastContainer, Slide } from 'react-toastify';
import Routes from './routes/routes'

import './styles/global.scss'

function App() {
  return (
    <div className="App">
      <UserInfoProvider>
        <Routes />
        <ToastContainer 
          transition={Slide}
          autoClose={3000}
        />
      </UserInfoProvider>
    </div>
  );
}

export default App;
