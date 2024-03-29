import { useState } from 'react'
import './Login.scss'
import SemicolonLogo from '../../../common/assets/Landing_black.png'
import BarLoader from 'react-spinners/BarLoader'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Failed.module.css'
import useInput from '../../../common/hooks/use-input'
import { useAppDispatch } from '../../../app/typings'
import { activatePreviewMode, loginUser } from '../authSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const [clicked, setClicked] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const navigate = useNavigate()

  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    returnWrong: phoneReturned,
  } = useInput((value) => value.trim().length === 11)

  const {
    value: enteredPass,
    isValid: passIsValid,
    hasError: passHasError,
    valueChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    returnWrong: passReturned,
  } = useInput((value) => value.trim().length > 0)

  const handleLoginRequest = async () => {
    const body = {
      phone: enteredPhone.trim(),
      password: enteredPass.trim(),
    }

    try {
      await dispatch(loginUser(body))
      navigate('/stats')
    } catch (err: any) {
      const res = err.response.data.data
      setClicked(false)
      setTimeout(() => setShowLoader(false), 200)
      setTimeout(() => {
        if (res === 'Incorrect password') {
          passReturned()
        }

        if (res === 'Incorrect phone number') {
          phoneReturned()
        }
      }, 100)
    }
  }

  const formIsValid = phoneIsValid && passIsValid

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!formIsValid) {
      return
    }

    setClicked(true)
    setTimeout(() => {
      setShowLoader(true)
    }, 700)
    setTimeout(() => {
      handleLoginRequest()
    }, 100)
  }

  const handlePreviewClick = async () => {
    setClicked(true)
    setShowLoader(true)
    dispatch(activatePreviewMode())
    setTimeout(() => {
      navigate('/stats')
    }, 4000)
  }

  return (
    <div className="login" style={{ overflow: 'hidden' }}>
      <div className={`login-left ${clicked && 'disappear formClosure'}`}>
        <h2 className={`header ${clicked && 'headerAction'}`}>
          Hi, welcome back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-group`}>
            <label htmlFor="phone">Phone Number</label>
            <div
              className={`phone-input ${
                phoneHasError && classes['failed-input']
              }`}
            >
              <select name="country-code">
                <option value="+1">+20 (EG)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={enteredPhone}
                onChange={phoneChangeHandler}
                onBlur={phoneBlurHandler}
              />
            </div>
          </div>
          {phoneHasError && <p>Phone is incorrect</p>}
          <div
            className={`form-group ${passHasError && classes['failed-input']}`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={enteredPass}
              onChange={passChangeHandler}
              onBlur={passBlurHandler}
            />
          </div>
          {passHasError && <p>Password is incorrect</p>}
          <div style={{ justifyContent: 'space-between' }}>
            <div className={`form-group`}>
              <div className="remember-me">
                <input type="checkbox" id="remember-me" name="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
                <div className="forgot-password">
                  <a href="/">Forgot Your Password?</a>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`btn btn-primary`}
            style={{
              marginTop: '10px',
            }}
          >
            Sign In
          </button>
          <div className={`form-group`}>
            <div className="or-divider">
              <div className="or-divider-line"></div>
              <div className="or-divider-text">Debug your soul</div>
              <div className="or-divider-line"></div>
            </div>
          </div>
          <button
            className="btn btn-info"
            type="button"
            onClick={handlePreviewClick}
          >
            Demo Mode
          </button>
        </form>
      </div>
      <div
        className={`login-right ${clicked && 'zoomIn'}`}
        style={
          clicked
            ? {
                minWidth: '60%',
                animation: 'centerImg 1s ease-in-out forwards',
              }
            : {}
        }
      >
        <div className="test-shine">
          <img src={SemicolonLogo} alt="Login" />
          {showLoader && (
            <div className="showLoader">
              <BarLoader color="#e4a539" height={3} width={300} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
