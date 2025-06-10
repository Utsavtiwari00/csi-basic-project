import React from 'react'
import Landingpage from './component/Landingpage'
import QuizPage from './component/QuizPage'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import SignInPage from './component/SignInPage'

const App = () => {
 return (  
  <Router>   
    <Routes>
      {/* Route for your QuizPage */}
      <Route path="/quiz" element={<QuizPage/>} />

      {/* Route for your LandingPage */}
      <Route path="/Landingpage" element={<Landingpage />} />

      {/* Optionally, define a root route, e.g., for initial load */}
      <Route path="/" element={<Landingpage />} />
    <Route path="/signin" element={<SignInPage />}/>
      {/* Add other routes as needed */}
    </Routes>
    </Router>
  );
}


export default App
