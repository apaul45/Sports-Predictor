import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//IMPORT THE GLOBAL STORE TO USE AS THE STATE MANAGEMENT SYSTEM
import HomeScreen from './components/HomeScreen';
import MethodScreen from './components/MethodScreen';
import SelectScreen from './components/SelectScreen';
import AboutScreen from './components/AboutScreen';
import HomeWrapper from './components/HomeWrapper';
import PredictionScreen from './components/PredictionScreen';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
