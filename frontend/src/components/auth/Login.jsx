import React, {useEffect, useState} from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setshowPassword] = useState(true);

    const {isAuthenticated} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [login, {isLoading, error, data}] = useLoginMutation()

    const [color, setColor] = useState("")
    const [textColor, setTextColor] = useState("")
    const savedMode = localStorage.getItem('darkMode') === 'true';
  
    useEffect(() => {
      if(savedMode) {
         setColor("#0e1011")
         setTextColor("white")
      }
        else {
           setColor("#f5f5f5")
           setTextColor("black")
        }
  
    })

    useEffect(() => {

      if (isAuthenticated){
        navigate(0)
        navigate("/")
        }

        if(error) {
            toast.error(error?.data?.message)
        } 
    }, [error, isAuthenticated])

    const submitHandler = (e) => {
        e.preventDefault()

        const loginData = {
            email,
            password,
        }

        login(loginData)

    }
 
    return (
        <>
        <MetaData title="Login - Shopholic" />
        <div className="container" style={{ padding: "10px"}}>
        <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          style={{ backgroundColor: color}}
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Login</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input type={
                showPassword
                    ? "text"
                    : "password"
            }
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                        onClick={() =>
              setshowPassword(
           (prevState) =>
               !prevState
                  )
                }
          />
        <p>Note: Click in the password area to reveal or hide password</p>
          </div>

          <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

          <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Login"}
          </button>

          <div className="my-3">
            <a href="/register" className="float-end">New User?</a>
          </div>
        </form>
      </div>
    </div>
    </div>
    </>
    )
}

export default Login