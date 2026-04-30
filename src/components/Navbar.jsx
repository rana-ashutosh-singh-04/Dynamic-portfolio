import { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.png";
import { FiMenu } from "react-icons/fi";
import OverlayMenu from "./OverlayMenu";


export default function Navbar(){
  const [menuOpen, setMenuOpen] = useState(false);
  const [ visible, setvisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

   const lastScrolly = useRef(0);
   const timerId = useRef(null);

   useEffect(()=>{
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry])=>{
        if(entry.isIntersecting){
          setForceVisible(true);
          setvisible(true);
        }else{
          setForceVisible(false);
        }
      },{threshold:0.1}
    )
    if(homeSection) observer.observe(homeSection);
    return()=>{
      if(homeSection) observer.unobserve(homeSection);
    }
   },[])
   
   useEffect(()=>{
    const handleScroll =()=>{
      if(forceVisible){
        setvisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if(currentScrollY>lastScrolly.current){
        setvisible(false)
      }else{
        setvisible(true);

        if(timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(()=>{
          setvisible(false);
        },3000)
      }
      lastScrolly.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll,{passive:true})

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if(timerId.current) clearTimeout(timerId.current);
    }
   },[forceVisible])
  return(
    <>
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`} >
    <div className="flex items-center space-x-2">
      <img src={Logo} alt="logo" className="w-8 h-8" />
      <div className="text-2xl font-bold text-white hidden md:block">
        ranaashutosh_singhrajput
      </div>
    </div>
    
    {/* Center Navigation - Static Pill for LG screens only */}
    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg transition-all duration-300 ease-in-out">
            <ul className="flex items-center space-x-8">
            {[
                "Home",
                "About",
                "Skills",
                "Project",
                "Experience",
                "Testimonials",
                "Contact",
            ].map((item) => (
                <li key={item} className="shrink-0">
                <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white text-base font-medium hover:text-pink-400 transition-colors duration-300"
                >
                    {item}
                </a>
                </li>
            ))}
            </ul>
        </div>
    </div>

    {/* Hamburger for Small and Medium screens */}
    <div className="block lg:hidden absolute left-1/2 transform -translate-x-1/2">
        <button onClick={()=> setMenuOpen(true)}
          className="text-white text-3xl focus:outline-none bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-all" aria-label="open Menu">
          <FiMenu />
        </button>
    </div>
      
    <div className="hidden lg:block">
        <a href="#contact"
        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:bg-white/20 hover:text-pink-400 transition-all duration-300"
        >
          Reach Out
        </a>
    </div>
    </nav>

    {/* Overlay Menu for Mobile */}
    <OverlayMenu isOpen={menuOpen} onClose={()=> setMenuOpen(false)} />
    </>
  )
}