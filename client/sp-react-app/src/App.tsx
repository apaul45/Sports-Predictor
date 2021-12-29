import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//IMPORT THE GLOBAL STORE TO USE AS THE STATE MANAGEMENT SYSTEM

import {HomeScreen, 
       MethodScreen, 
       SelectScreen, 
       ViewPredictions, 
       PredictionScreen, 
       AboutScreen, 
       HomeWrapper,
       ErrorModal} 
from './components/Moduler';

function App() {
  return (
    <BrowserRouter>
      <HomeWrapper/>
      <Routes>
        {/* Provide the global store to all components 
        by wrapping the provider around them */}
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
