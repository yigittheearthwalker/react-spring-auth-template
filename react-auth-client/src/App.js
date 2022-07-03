import { Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/pages/Home';
import User from './components/pages/User'
import AuthState from './context/auth/AuthState';
import CheckAuth from './components/CheckAuth';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';

function App() {
  return (
    <AuthState>
      <CheckAuth />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='user' element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />
      </Routes>
    </AuthState>
  );
}

export default App;
