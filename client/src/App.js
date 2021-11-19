import { Route, Routes } from 'react-router-dom'
import ConditionalNav from './conditional/ConditionalNav'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserScreen from './screens/UserScreen'

function App() {
  return (
    <>
      <ConditionalNav />
        <Routes>
          <Route element={<UserScreen />} path='/user' />
          <Route element={<LoginScreen />} path='/login' />
          <Route element={<RegisterScreen />} path='/register' />
        </Routes>
    </>
  );
}

export default App;
