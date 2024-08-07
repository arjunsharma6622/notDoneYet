import React from "react";
import About from "./(components)/About";
import Contact from "./(components)/Contact";
import Hero from "./(components)/Hero";
import InteractiveSection from "./(components)/Interactive";
import Projects from "./(components)/Projects";

const StaticHome: React.FC = () => {
  return (
    <div className="bg-white w-full min-h-screen overflow-x-hidden">
      <main>
        <Hero />
        <About />
        <InteractiveSection />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default StaticHome;