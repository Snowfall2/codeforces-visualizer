'use client'
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <header className="mx-auto py-4 px-8 mb-10 flex justify-between items-center flex-wrap bg-gray-900">
            <div className="logo">
                <a href="https://codeforces.com/">
                    <img className="h-8" src="cf-icon.png" />
                </a>
            </div>
            <button 
                className="md:hidden p-2 rounded-md focus:outline-none hover:ring-2 focus:ring-2 hover:ring-gray-200 focus:ring-gray-300"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
            >
                <img className="h-8 invert" src="hamburger.svg"></img>
            </button>

            <div 
                id="mobile-menu"
                className={`
                    w-full md:w-auto md:flex md:flex-row md:items-center 
                    mt-2 md:mt-0
                    overflow-hidden
                    ${isOpen ? 'flex flex-col' : 'hidden md:flex'}
                `}>
                <Link href="/" className="header mx-2 p-2 rounded-md transition duration-300 text-white hover:text-yellow-200 cursor-pointer">Tag distribution</Link>
                <Link href="/problem" className="header mx-2 p-2 rounded-md transition duration-300 text-white hover:text-yellow-200 cursor-pointer">Problem overview</Link>
                <Link href="/" className="header mx-2 p-2 rounded-md transition duration-300 text-white hover:text-yellow-200 cursor-pointer">Summary</Link>
            </div>
        </header>
    )
}   