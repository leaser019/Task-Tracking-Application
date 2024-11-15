import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextFieldElement from '../components/common/TextFieldElement'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/apps/login/Header'
import Content from '../components/apps/login/Content'
import Footer from '../components/apps/login/Footer'
import styled from 'styled-components'
import { useLoginMutation } from '../redux/slices/api/authApiSlice'
import { toast } from 'sonner'
import { setCredentials } from '../redux/slices/authenticationSlice'

const BackToTop = React.memo(() => {
  const StyledWrapper = styled.div`
    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.8);
      }
      50% {
        opacity: 0.5;
        transform: translateY(-10px) scale(1.1);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    .container {
      position: relative;
    }
    .toggle {
      display: inline-block;
      position: fixed;
      bottom: 20px; // Changed from 40px
      right: 20px; // Changed from 40px
      z-index: 99999; // Increased z-index
      height: 50px;
      width: 50px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease-in-out;
      animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

      @media (max-width: 768px) {
        bottom: 15px;
        right: 15px;
        height: 45px;
        width: 45px;
      }
    }
    .toggle.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .toggle .button {
      position: absolute;
      transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5),
        inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2),
        0 -10px 15px -1px rgba(255, 255, 255, 0.6),
        inset 0 3px 4px -1px rgba(255, 255, 255, 0.2),
        inset 0 0 5px 1px rgba(255, 255, 255, 0.8),
        inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      background: #f8f9fa;
      margin-left: -25px;
      margin-top: -25px;
      display: block;
      height: 50px;
      width: 50px;
      left: 50%;
      top: 50%;
      cursor: pointer;
    }

    .toggle .label {
      transition: color 300ms ease-out;
      line-height: 50px;
      text-align: center;
      position: absolute;
      font-weight: 700;
      font-size: 24px;
      display: block;
      opacity: 0.9;
      height: 100%;
      width: 100%;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }

    .toggle input {
      opacity: 0;
      position: absolute;
      cursor: pointer;
      z-index: 1;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }

    .toggle input:active ~ .button {
      filter: blur(0.5px);
      box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4),
        inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
        0 -10px 15px -1px rgba(255, 255, 255, 0.6),
        inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
        inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
    }

    .toggle input:active ~ .label {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.45);
    }

    @media (hover: hover) {
      .toggle:hover .button {
        transform: scale(1.05);
      }

      .toggle:hover .label {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  `

  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <StyledWrapper>
      <div className="container" onClick={scrollToTop}>
        <div className={`toggle ${isVisible ? 'visible' : ''}`}>
          <input type="checkbox" />
          <span className="button" />
          <span className="label">↑</span>
        </div>
      </div>
    </StyledWrapper>
  )
})

const Login = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authentication)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const StyledWrapper = styled.div`
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      position: relative;
      padding: 0 20px;
      font-size: 18px;
      text-transform: uppercase;
      border: 0;
      box-shadow: hsl(210deg 87% 36%) 0px 7px 0px 0px;
      background-color: hsl(210deg 100% 44%);
      border-radius: 12px;
      overflow: hidden;
      transition: 31ms cubic-bezier(0.5, 0.7, 0.4, 1);
    }

    button:before {
      content: attr(alt);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      inset: 0;
      font-size: 15px;
      font-weight: bold;
      color: white;
      letter-spacing: 4px;
      opacity: 1;
    }

    button:active {
      box-shadow: none;
      transform: translateY(7px);
      transition: 35ms cubic-bezier(0.5, 0.7, 0.4, 1);
    }

    button:hover:before {
      transition: all 0s;
      transform: translateY(100%);
      opacity: 0;
    }

    button i {
      color: white;
      font-size: 15px;
      font-weight: bold;
      letter-spacing: 4px;
      font-style: normal;
      transition: all 2s ease;
      transform: translateY(-20px);
      opacity: 0;
    }

    button:hover i {
      transition: all 0.2s ease;
      transform: translateY(0px);
      opacity: 1;
    }

    button:hover i:nth-child(1) {
      transition-delay: 0.045s;
    }

    button:hover i:nth-child(2) {
      transition-delay: calc(0.045s * 3);
    }

    button:hover i:nth-child(3) {
      transition-delay: calc(0.045s * 4);
    }

    button:hover i:nth-child(4) {
      transition-delay: calc(0.045s * 5);
    }

    button:hover i:nth-child(6) {
      transition-delay: calc(0.045s * 6);
    }

    button:hover i:nth-child(7) {
      transition-delay: calc(0.045s * 7);
    }

    button:hover i:nth-child(8) {
      transition-delay: calc(0.045s * 8);
    }

    button:hover i:nth-child(9) {
      transition-delay: calc(0.045s * 9);
    }

    button:hover i:nth-child(10) {
      transition-delay: calc(0.045s * 10);
    }
  `
  const HeaderContent = React.useCallback(() => <Header />, [])
  const LeftSideComponent = React.useCallback(() => {
    return (
      <>
        <div className="h-full w-full lg:w-3/4  flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg flex flex-col items-center justify-center gap-5 md:gap-y-10">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Application Tracking
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-5xl md:text-7xl 2xl:text-7xl font-black text-center text-blue-700 pl-14 ml-4">
              <span className="flex">
                <img
                  src="./assets/logo/logoApp.png"
                  alt="Logo"
                  className="w-[15%] h-[50%] flex mr-4"
                />
                Kepler.
              </span>
            </p>
            <span className="text-base md:text-lg text-gray-600">
              "The best way to predict the future is to create it."
            </span>

            <div className="cell">
              <img
                src="./assets/images/loginPage/LoginMainAsset.png"
                alt="LoginMainAsset"
                className="w-full h-auto"
              />
              <div className="rotate-in-up-left">
                <img
                  src="./assets/images/loginPage/LoginSubAsset1.png"
                  alt="LoginSubAsset"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }, [])
  const RightSideComponent = React.useCallback(() => {
    const submitHandler = async (payload) => {
      try {
        const res = await login(payload).unwrap()
        toast.success('Login successful! Have a great day ahead!')
        dispatch(setCredentials(res))
        navigate('/')
      } catch (error) {
        toast.error(
          error?.message ||
            error?.data?.message ||
            error?.data?.detail ||
            error?.data?.errors ||
            'An error occurred: unknown error'
        )
      }
    }
    return (
      <>
        <div className="w-full md:w-1/4 p-4 md:p-1 flex flex-col justify-center items-center">
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
              <StyledWrapper>
                <button type="submit" alt="Login" className="w-full">
                  <i>s</i>
                  <i>t</i>
                  <i>a</i>
                  <i>r</i>
                  <i>t</i>
                  <i>&nbsp;</i>
                  <i>y</i>
                  <i>o</i>
                  <i>u</i>
                  <i>r</i>
                  <i>&nbsp;</i>
                  <i>j</i>
                  <i>o</i>
                  <i>u</i>
                  <i>r</i>
                  <i>n</i>
                  <i>e</i>
                  <i>y</i>
                </button>
              </StyledWrapper>
              <span className="text-md text-black-700 text-center">
                Don’t have an account ?
                <span className="hover:text-blue-600"> Register</span>
              </span>
            </div>
          </form>
        </div>
      </>
    )
  }, [handleSubmit, register])
  const LoginContent = React.useCallback(
    () => (
      <div>
        <Content />
        <Footer />
        <BackToTop />
      </div>
    ),
    []
  )
  useEffect(() => {
    user && navigate('/dashboard')
  }, [user])

  return (
    <>
      <section id="login">
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] ">
          <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
            <HeaderContent />
            {/* Left side */}
            <LeftSideComponent />
            {/* Right side */}
            <RightSideComponent />
          </div>
        </div>
      </section>
      <LoginContent />
    </>
  )
}

export default Login
