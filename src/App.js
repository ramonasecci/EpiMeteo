import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Home from './components/Home';
import DettaglioMeteo from './components/DettaglioMeteo';



function App() {

  return (

    <div className='my-bg-home '>
      <div className='h-100'>
        <BrowserRouter>
          <div className='d-flex flex-column justify-content-between h-100'>
            <div>
              <header>
                <MyNavbar />
              </header>
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/DettaglioMeteo/:city" element={<DettaglioMeteo />} />
                </Routes>
              </main>
            </div>
            <footer className='footer'>
              <MyFooter />
            </footer>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;