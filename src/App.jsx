import React from 'react'
import Landingpage from './component/Landingpage'
import QuizPage from './component/QuizPage'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import SignInPage from './component/SignInPage'
import Profile from './component/profile'
import Settings from './component/settings'


const App = () => {
 return (  
  <Router>   
    <Routes>
      {/* Route for your QuizPage */}
      <Route path="/quiz" element={<QuizPage/>} />

      {/* Route for your LandingPage */}
      <Route path="/Landingpage" element={<Landingpage />} />

      <Route path="/" element={<Landingpage />} />

      <Route path="/signin" element={<SignInPage />}/>

      <Route path="/profile" element={<Profile/>}/>

      <Route path="/settings" element={<Settings/>}/>
      
    </Routes>
    </Router>

    

  );
}


export default App
