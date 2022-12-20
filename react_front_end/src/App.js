import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListEmployeeComp from './components/ListEmployeeComp';
import HeaderComp from './components/HeaderComp';
import FooterComp from './components/FooterComp';
import CreateEmployeeComp from './components/CreateEmployeeComp';
import ViewEmployeeComp from './components/ViewEmployeeComp';
// import UpdateEmployeeComp from './components/UpdateEmployeeComp';

function App() 
{
  return (
    <div>
        <Router>
            <HeaderComp />
                <div className="container">
                    <Routes>
                      <Route path="/" exact element={<ListEmployeeComp />} />
                      <Route path="/employees" element={<ListEmployeeComp />} />
                      <Route path="/add-employee/:id" element={<CreateEmployeeComp />} />
                      <Route path="/view-employee/:id" element={<ViewEmployeeComp />} />
                      {/* <Route path="/update-employee/:id" element={<UpdateEmployeeComp />} /> */}
                    </Routes>
                </div>
            <FooterComp />
        </Router>
    </div>
  );
}

export default App;
