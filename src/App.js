import { CssBaseline } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInSuccess } from 'redux/authSlice';
import './App.css'; 
import MainRouter from './routes';

function App() {

  const state = useSelector(state => state)
  console.log(state)
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if(token){
      console.log('token already')
    } else {
      console.log('no token')
      dispatch(logInSuccess('alo mot hai ba'))
    }
  }, [])

  return (
    <div className='App'>
      <CssBaseline/>
      <MainRouter/>
    </div>
  );
}

export default App;
