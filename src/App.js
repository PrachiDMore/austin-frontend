import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import AdmissionPage from './pages/AdmissionPage';
import ViewAdmissions from './pages/ViewAdmissions';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/admin/admissions" element={<ViewAdmissions />} />
          <Route path="/admin/admissions/:_id" element={<AdmissionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
