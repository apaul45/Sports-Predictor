import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//IMPORT THE GLOBAL STORE TO USE AS THE STATE MANAGEMENT SYSTEM
import { GlobalStoreContextProvider } from './store'
import BasketBallScreen from './components/BasketballScreen';
import MethodScreen from './components/MethodScreen';
import SelectScreen from './components/SelectScreen';
import AboutScreen from './components/AboutScreen';
import HomeWrapper from './components/HomeWrapper';
function App() {
  return (
    <BrowserRouter>
      <GlobalStoreContextProvider>
      <HomeWrapper/>
      <Routes>
        {/* Provide the global store to all components by wrapping the provider around them */}
        
          <Route exact path="/about/" element={<AboutScreen/>}></Route>
          <Route exact path="/how_done/" element={<MethodScreen/>}></Route>
          <Route exact path="/select/" element={<SelectScreen/>}></Route>
          <Route exact path="/bball/" element={<BasketBallScreen/>}></Route>
      </Routes>
      </GlobalStoreContextProvider>
    </BrowserRouter>
  );
}

export default App;
