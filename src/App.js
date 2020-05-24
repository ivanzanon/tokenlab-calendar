import React from 'react';
import './style.css';
import Header from './components/Header';
import Routes from './router.js'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
        <div className="app-content">
          <Routes />
        </div>
      <Footer />
    </div>
  );
}

export default App;
