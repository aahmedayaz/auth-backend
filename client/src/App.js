import React from 'react'
import { BrowserRouter , Routes , Route  } from "react-router-dom";
import LoginSignUpWrapper from './components/LoginSignUpWrapper'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignUpWrapper type={"Login"}/>} />
          <Route path="/login" element={<LoginSignUpWrapper type={"Login"}/>} />
          <Route path="/signup" element={<LoginSignUpWrapper type={"Signup"}/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App