import React from 'react'
import clsx from 'clsx'
import styled from 'styled-components'

const SubTitle = ({ subtitle, className = '' }) => {
  const StyledWrapper = styled.div`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .impressive-subtitle {
      animation: fadeIn 0.6s ease-out;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      letter-spacing: 0.3px;
    }

    .animate-fade-in {
      animation: fadeIn 0.6s ease-out;
    }
  `
  return (
    <StyledWrapper>
      <h3
        className={clsx(
          'text-xl capitalize font-medium impressive-subtitle',
          'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600',
          'animate-fade-in hover:scale-105 transition-transform',
          className
        )}
      >
        {subtitle}
      </h3>
    </StyledWrapper>
  )
}

export default SubTitle
