import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profiles from './Component/Profiles/Profiles';


function App() {
  return (
    <div className="App">
     
     <Routes>
        <Route path="/profiles" element={<Profiles />} />
     </Routes>
    </div>
  );
}

export default App;
