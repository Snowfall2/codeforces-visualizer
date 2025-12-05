'use client'
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <header className="mx-auto py-4 px-8 flex justify-between items-center flex-wrap">
            <div className="logo">
                <img className="h-8" src="cf-icon.png" ></img>
            </div>
            <button 
                className="md:hidden p-2 rounded-md focus:outline-none hover:ring-2 focus:ring-2 hover:ring-gray-200 focus:ring-gray-300"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
            >
                <img className="h-8" src="hamburger.svg"></img>
            </button>

            <div 
                id="mobile-menu"
                className={`
                    w-full md:w-auto md:flex md:flex-row md:items-center 
                    mt-2 md:mt-0 
                    overflow-hidden
                    ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                    ${isOpen ? 'flex flex-col' : 'hidden md:flex'}
                `}>
                <div className="mx-0 md:mx-4 py-2 md:py-0 rounded-md">Tag distribution</div>
                <div className="mx-0 md:mx-4 py-2 md:py-0">Rating distribution</div>
                <div className="mx-0 md:mx-4 py-2 md:py-0">About me</div>
            </div>
        </header>
    )
}   