import React from 'react';
import './styles/styles.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lab from './components/Lab'
import Add from './components/Add'
import Home from './components/Home'
import Content from './components/Content'
import Lib from './components/Lib'
import NoSleep from 'nosleep.js'

function App() {
  let iphone = null

  if (navigator.userAgent.match(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i))) {
    iphone = true
  } else { iphone = false }

  var noSleep = new NoSleep();
  if (iphone == false) {
    document.addEventListener('click', function enableNoSleep() {
      document.removeEventListener('click', enableNoSleep, false);
      noSleep.enable();
    }, false);
  }

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/content" element={<Content />} />
          <Route path="/lib" element={<Lib />} />

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
