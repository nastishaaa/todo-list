import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { selectIsRefreshing } from './redux/auth/selectors'
import { useEffect } from 'react'
import { refresh } from './redux/auth/operations'

import { Header } from './components/Header/Header'
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const TodoPage = lazy(() => import('./pages/TodoPage/TodoPage'));

function App() {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  
  return (
    <>
      {isRefreshing && <Suspense fallback={ <h2>Refreshing...</h2>} />}
      <Toaster
        position="top-center"
        reverseOrder={false}/>
      <Header />
      <Suspense fallback={null}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/dashboard' element={<TodoPage/>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>

      </Suspense>
      
    </>
  )
}

export default App
