/** @format */

import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function App() {
  // Enable smooth scrolling globally
  useSmoothScroll();

  return (
    <div className="w-full min-h-screen m-0 p-0">
      <Navbar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
