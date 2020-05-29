import React from 'react';
import './style.css';
import Header from './components/Header';
import Routes from './router.js'
// import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header descricao='Calendário bonitão!'/>
      <Routes />
        {/* <Footer /> */}
    </div>
  );
}

export default App;
