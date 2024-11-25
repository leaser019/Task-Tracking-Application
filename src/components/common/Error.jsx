import React from 'react'

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold font-mono uppercase">404 Not Found</h1>
      <div className="flex flex-col items-center">
        <div className="w-60 h-auto">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/application/Scarecrow.png`}
            alt="404-Scarecrow"
          />
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-6xl font-bold">I have bad news for you</h2>
          <p className="mt-4 text-2xl font-mono">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
        </div>
      </div>
    </div>
  )
}

export default Error
