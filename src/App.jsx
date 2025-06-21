import React from 'react'
import QuizPage from './component/QuizPage'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import LandingPage from './component/LandingPage'
import SignInPage from './component/SignInPage'
import Profile from './component/profile'
import Settings from './component/settings'
import HomePage from './component/HomePage'


const App = () => {
 return (  
  <Router>   
    <Routes>
      {/* Route for your QuizPage */}
     <Route path="/quiz/:subject" element={<QuizPage />} />

      {/* Route for your LandingPage */}
      <Route path="/HomePage" element={<HomePage />} />

      <Route path="/" element={<LandingPage />} />

      <Route path="/signin" element={<SignInPage />}/>

      <Route path="/profile" element={<Profile/>}/>

      <Route path="/settings" element={<Settings/>}/>
      
    </Routes>
    </Router>

    

  );
}


export default App
