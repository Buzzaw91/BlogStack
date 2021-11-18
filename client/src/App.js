import { Route, Routes } from 'react-router-dom'
import MobileNav from './components/MobileNav'
import LoginScreen from './screens/LoginScreen'
import UserScreen from './screens/UserScreen';

function App() {
  return (
    <>
      <MobileNav />
        <Routes>
          <Route element={<UserScreen />} path='/user' />
          <Route element={<LoginScreen />} path='/login' />
        </Routes>
    </>
  );
}

export default App;
