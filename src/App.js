import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useContext} from 'react';
import { jsPDF } from 'jspdf';

import AppContext from './components/AppContext';
import charClassData from './data';

// Component using charSheet from AppContext
const InfoCard = () => {
  const charSheetContext = useContext(AppContext);

  return (
    <h1>Test: {charSheetContext.test}</h1>
  );
};

export const App = () => {
  // Character sheet global variables
  const [test, setTest] = useState(0);

  // Character sheet object
  const charSheet = {
    test: 1,
    setTest,
  };

  return(
    <AppContext.Provider value = {charSheet}>
      <InfoCard />
    </AppContext.Provider>
  );
};

export default App;
