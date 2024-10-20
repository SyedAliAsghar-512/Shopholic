import React, { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserLayout from "../layouts/UserLayout";
import MetaData from "../layouts/MetaData"

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [updatePasssword, {isLoading, error, isSuccess}] = useUpdatePasswordMutation()

    useEffect(() => {

        if(error) {
            toast.error(error?.data?.message)
        }

        if(isSuccess) {
            toast.success("Password Updated")
            navigate("/me/profile")
        }

    }, [error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        const userData = {
         oldPassword,
         password
        }

        updatePasssword(userData)

    }

    const [color, setColor] = useState("")
    const [textColor, setTextColor] = useState("")
    const savedMode = localStorage.getItem('darkMode') === 'true';
  
    useEffect(() => {
      if(savedMode) {
         setColor("#0e1011")
         setTextColor("white")
      }
        else {
           setColor("#f8f8f8")
           setTextColor("black")
        }
  
    })

    return (
      <>
            <MetaData title="Update Password -  Shopholic" />
        <UserLayout>
        <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form onSubmit={submitHandler} style={{ backgroundColor: color}}>
            <h2 className="mb-4" style={{ color: textColor}}>Update Password</h2>
            <div className="mb-3">
              <label htmlFor="old_password_field" className="form-label" style={{ color: textColor}}>
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="new_password_field" className="form-label" style={{ color: textColor}}>
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
      </UserLayout>
      </>
    )
}

export default UpdatePassword