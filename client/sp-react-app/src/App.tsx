import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//IMPORT THE GLOBAL STORE TO USE AS THE STATE MANAGEMENT SYSTEM
import { useAppDispatch } from './reduxHookTypes';
import {setPredictions} from './slices/prediction';
import {fetchPredictions} from './slices/prediction'
import {GET_ALL_PREDICTIONS} from "./GraphQL/Queries";
import {HomeScreen, 
       MethodScreen, 
       SelectScreen, 
       ViewPredictions, 
       PredictionScreen, 
       AboutScreen, 
       HomeWrapper,
       ErrorModal} 
from './components/Moduler';
import { useEffect } from 'react';
import {fetchUsers} from './slices/auth';
import {login} from './slices/auth';
import { 
  LOGIN_USER,
} from "./GraphQL/Mutations";
//The async thunk (fetchPredictions) is a function that takes in the dispatch
//along with the action and info to execute a graphql request. It then executes a 
//request, and calls dispatch with the action and data to perform this action
function App() {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    let user = {
      username: "apaul421",
      password: "password123",
  }
  
  dispatch(fetchUsers(login, LOGIN_USER, user));
  dispatch(fetchPredictions(setPredictions, GET_ALL_PREDICTIONS, {}));
  }, []);
  return (
    <BrowserRouter>
      <HomeWrapper/>
      <Routes>
          <Route path="/about/" element={<AboutScreen/>}></Route>
          <Route path="/how_done/" element={<MethodScreen/>}></Route>
          <Route path="/make-prediction/select/" element={<SelectScreen/>}></Route>
          <Route path="/home/" element={<HomeScreen/>}></Route>
          <Route path="/make-prediction" element={<PredictionScreen/>}></Route>
          <Route path="/home/view-predictions" element={<ViewPredictions/>}></Route>
      </Routes>
      <ErrorModal/>
    </BrowserRouter>
  );
}

export default App;
