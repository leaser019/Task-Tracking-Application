import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { scrollToSection } from '../../../utils'

const StyledWrapper = styled.div`
  .button-icon {
    display: flex;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
  }

  .cube {
    transition: all 0.4s;
    transform-style: preserve-3d;
    width: 200px;
    height: 20px;
  }

  .button-icon:hover {
    border-color: #ff98a2;
  }

  .button-icon:hover .cube {
    transform: rotateX(90deg);
  }

  .side {
    position: absolute;
    height: 47px;
    width: 200px;
    display: flex;
    font-size: 0.8em;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: bold;
  }

  .top {
    background: #1d4ed8;
    color: #fff;
    transform: rotateX(-90deg) translate3d(0, 13.5px, 2em);
  }

  .front {
    background: rgba(191 219 254 / 0.3);
    color: #000;
    transform: translate3d(0, 0, 1em);
  }
`

function Header() {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full transition duration-300 ease-in-out z-50 ${
        isScrolled ? 'backdrop-blur-md bg-opacity-70' : 'bg-opacity-100'
      } p-4 bg-blue-200/30 hidden md:block`}
    >
      <div className="flex items-center justify-between px-4 md:px-10">
        {/* Logo */}
        <div
          className="flex items-center space-x-4 group cursor-pointer"
          onClick={(e) => handleNavClick(e, 'login')}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img
              src="./assets/logo/logoApp.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[#2563ED] font-bold text-2xl md:text-4xl transition-all duration-300 group-hover:text-blue-700">
            Kepler.
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link
            to="#getting-started"
            onClick={(e) => handleNavClick(e, 'getting-started')}
            className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          >
            Getting started
          </Link>
          <Link
            to="#mission"
            onClick={(e) => handleNavClick(e, 'mission')}
            className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          >
            Missions
          </Link>
          <Link
            to="#features"
            onClick={(e) => handleNavClick(e, 'features')}
            className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          >
            Features
          </Link>
          <Link
            to="#about-us"
            onClick={(e) => handleNavClick(e, 'about-us')}
            className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          >
            About Us
          </Link>
        </nav>

        {/* Get Started Button */}
        <StyledWrapper>
          <div
            className="button-icon mb-8"
            onClick={(e) => handleNavClick(e, 'contact-section')}
          >
            <div className="cube">
              <span className="side front">
                Getting Started <FaLongArrowAltRight className="ml-2" />
              </span>
              <span className="side top">Start Your Journey</span>
            </div>
          </div>
        </StyledWrapper>
      </div>
    </header>
  )
}

export default Header
