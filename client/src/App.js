import { Route, Routes } from 'react-router-dom'
import ConditionalNav from './conditional/ConditionalNav'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserScreen from './screens/UserScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <>
      <ConditionalNav />
        <Routes>
          <Route element={<HomeScreen />} path='/' />
          <Route element={<UserScreen />} path='/:slug' />
          <Route element={<LoginScreen />} path='/login' />
          <Route element={<RegisterScreen />} path='/register' />
          <Route element={<CreatePostScreen />} path='/create' />
        </Routes>
    </>
  );
}

export default App;
