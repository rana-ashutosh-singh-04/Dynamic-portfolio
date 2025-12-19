import React from "react"
import Navbar from "./components/Navbar"
import About from "./Sections/About"
import Contact from "./Sections/Contact"
import Experience from "./Sections/Experience"
import Footer from "./Sections/Footer"
import Home from "./Sections/Home"
import Projects from "./Sections/Projects"
import Skills from "./Sections/Skills"
import Testimonials from "./Sections/Testimonials"
import CustomCursor from "./components/CustomCursor"
import IntroAnimation from "./components/IntroAnimation"
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  const [introDone, setIntroDone] = React.useState(false);
  return (
    <>
    {!introDone && <IntroAnimation onFinish={()=> setIntroDone(true)}/>}
      
      {introDone && (

      <div className="relative gradient text-white">
        <CustomCursor/> 
        {/* <ParticlesBackground></ParticlesBackground> */}
        <Navbar/>
        <Home/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Testimonials/>
        <Contact/>
        <Footer/>
       </div>
        )}
    </>
  )
}

export default App
