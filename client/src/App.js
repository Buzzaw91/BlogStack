import { Route, Routes } from 'react-router-dom'
import MobileNav from './components/MobileNav'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserScreen from './screens/UserScreen'

function App() {
  return (
    <>
      <MobileNav />
        <Routes>
          <Route element={<UserScreen />} path='/user' />
          <Route element={<LoginScreen />} path='/login' />
          <Route element={<RegisterScreen />} path='/register' />
        </Routes>
    </>
  );
}

export default App;
