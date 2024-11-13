import React from 'react'
import clsx from 'clsx'
import styled from 'styled-components'

const Title = ({ title, className = '' }) => {
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

    .impressive-title {
      animation: fadeIn 0.6s ease-out;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      letter-spacing: 0.5px;
    }

    .animate-fade-in {
      animation: fadeIn 0.6s ease-out;
    }
  `
  return (
    <StyledWrapper>
      <h2
        className={clsx(
          'text-2xl capitalize font-bold impressive-title',
          'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500',
          'animate-fade-in hover:scale-105 transition-transform',
          className
        )}
      >
        {title}
      </h2>
    </StyledWrapper>
  )
}

export default Title
