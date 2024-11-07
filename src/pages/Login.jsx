import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextFieldElement from '../components/common/TextFieldElement'
import ButtonElement from '../components/common/ButtonElement'
import { useSelector } from 'react-redux'

const Login = () => {
  const { user } = useSelector((state) => state.authentication)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const submitHandler = async (data) => {
    console.log(user)
  }

  useEffect(() => {
    user && navigate('/dashboard')
  }, [user])

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Welcome Back!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Kepler.</span>
            </p>
            <span className="text-sm md:text-base  text-gray-600">
              "The best way to predict the future is to create it."
            </span>

            <div className="cell">
              <img
                src="./assets/images/loginPage/LoginMainAsset.png"
                alt="LoginMainAsset"
              />
              <div className="rotate-in-up-left">
                <img
                  src="./assets/images/loginPage/LoginSubAsset1.png"
                  alt="LoginSubAsset"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Login
              </p>
              <p className="text-center text-base text-gray-700 ">
                Fill all your information
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <TextFieldElement
                placeholder="Enter your email"
                type="email"
                name="email"
                label="Email"
                className="w-full rounded-full"
                register={register('email', {
                  required: 'Email is required!',
                })}
                error={errors.email ? errors.email.message : ''}
              />
              <TextFieldElement
                placeholder="Enter your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register('password', {
                  required: 'Password is required!',
                })}
                error={errors.password ? errors.password.message : ''}
              />

              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline ">
                Forget Password?
              </span>

              <ButtonElement
                type="submit"
                label="Login"
                className="w-full h-10 bg-blue-700 text-white rounded-full"
              />
              <span className="text-md text-black-700 text-center">
                Don’t have an account ?{' '}
                <span className="hover:text-blue-600">Register</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
