import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../layouts/UserLayout";
import MetaData from "../layouts/MetaData"


const UpdateProfile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const [ updateProfile, {isLoading, error, isSuccess} ] = useUpdateProfileMutation()

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setName(user?.name)
            setEmail(user?.email)
        }

        if(error) {
            toast.error(error?.data?.message)
        }

        if(isSuccess) {
            toast.success("User Updated")
            navigate("/me/profile")
        }

    }, [user, error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()

        const userData = {
            name,
            email,
        }

        updateProfile(userData)

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
         <MetaData title="Update Profile -  Shopholic" />
        <UserLayout>
        <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            style={{ backgroundColor: color}}
            onSubmit={submitHandler}
          >
            <h2 className="mb-4" style={{ color: textColor}}>Update Profile</h2>
  
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label"> Name </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label"> Email </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <button type="submit" className="btn update-btn w-100" disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</button>
          </form>
        </div>
      </div>
      </UserLayout>
      </>
    )
}

export default UpdateProfile