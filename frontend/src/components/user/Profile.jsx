import React from "react";
import UserLayout from "../layouts/UserLayout";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData"

const Profile = () => {

    const {user} = useSelector((state) => state.auth)

    return (
      <>
            <MetaData title="Profile -  Shopholic" />
        <UserLayout>
            <div className="row justify-content-around mt-5 user-info">
      <div className="col-12 col-md-3">
        <figure className="avatar avatar-profile">
          <img
            className="rounded-circle img-fluid"
            src={user?.avatar ? user?.avatar?.url : "https://github.com/ghulamabbas2/shopitv2-html/blob/master/images/default_avatar.jpg?raw=true"}
            alt={user?.name}
          />
        </figure>
      </div>

      <div className="col-12 col-md-5">
        <h4>Username</h4>
        <p>{user?.name}</p>

        <h4>Email Address</h4>
        <p>{user?.email}</p>

        <h4>Joined On</h4>
        <p>{user?.createdAt}</p>
      </div>
    </div>
        </UserLayout>

        </>
    )

}

export default Profile