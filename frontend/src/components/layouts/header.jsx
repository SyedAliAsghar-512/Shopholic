import React, {useEffect, useState} from "react";
import Search from "./Search";
import "../../App.css"
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import DarkModeToggle from "../layouts/DarkModeToggle"
import Loader from "../layouts/loader"

const Header = () => {

  const [color, setColor] = useState("")
  const {isLoading } = useGetMeQuery()
  const [textColor, setTextColor] = useState("")
  const [itemColor, setItemColor] = useState("")
  const savedMode = localStorage.getItem('darkMode') === 'true';
  const navigate = useNavigate()

  useEffect(() => {
    if(savedMode) {
       setColor("#0e1011")
       setTextColor("white")
       setItemColor("black")
    }
      else {
         setColor("#0d2448")
         setTextColor("black")
         setItemColor("white")
      }
  })

  const handleClick = () => {
    setTimeout(() => {
        navigate(0)
    }, 1000); 
};

    const [logout] = useLazyLogoutQuery()

    const {user} = useSelector((state) => state.auth)
    const {cartItems} = useSelector((state) => state.cart)

    const LogoutHandler =() => {
      logout();
      handleClick()
      }

      const refresh = () => {
        navigate("")
      }

    return (
      <>
    <nav className="navbar row" style={{ backgroundColor: color}}>
      <div className="col-12 col-md-3 ps-5 text-center">
        <div className="navbar-brand">
          <a href="/">
            <img src="/images/logo4.png" width="200" height="150" alt="Shopholic" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none"}}>
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">{cartItems?.length}</span>
        </a>
        
         {user ? (

         
        <div className="ms-4 dropdown" >
          <button
            className="btn dropdown-toggle text-white "
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src={ user?.avatar ? user?.avatar?.url : "https://github.com/ghulamabbas2/shopitv2-html/blob/master/images/default_avatar.jpg?raw=true"}
                className="rounded-circle"
              />
            </figure>
            <span>{user?.name}</span>
          </button>
          
          <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton" style={{ backgroundColor: color}}>
            {user?.role === "admin" && (
              <Link className="dropdown-item" to="/admin/dashboard" style={{backgroundColor: itemColor, color: textColor}}>{" "} Dashboard{" "} </Link>
              
            )}

            <Link className="dropdown-item" to="/me/orders" style={{backgroundColor: itemColor, color: textColor}}> {" "}Orders{" "} </Link>

            <Link className="dropdown-item" to="/me/profile" style={{ backgroundColor: itemColor,color: textColor}}>{" "} Profile{" "} </Link>

            <Link className="dropdown-item text-danger" to="" onClick={LogoutHandler} style={{ backgroundColor: itemColor}}> Logout</Link>
          </div>
        </div>
): (
  !isLoading && (
    <Link to="/login" className="btn ms-4" id="login_btn"> Login </Link>
  )
)}

      </div>
      <a href="" className="btn" id="homepage" onClick={refresh}>Home Page</a>
     <DarkModeToggle />
    </nav>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://kit.fontawesome.com/9edb65c86a.js"></script>

</>
    )
}

export default Header