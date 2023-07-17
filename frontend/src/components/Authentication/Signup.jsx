import React, { useState } from "react";
import "./SignupForm.css";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [pic, setPic] = useState();

  const [picLoading, setPicLoading] = useState(false);

  const postDetails = (pics) => {
    // const {name, email, password ,cpassword} = formData;
    setPicLoading(true);
    if (pics === undefined) {
      alert("Please Select an Image");
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "daqwjz0xa");
      fetch("https://api.cloudinary.com/v1_1/daqwjz0xa/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      alert("Please Select an Image");
      setPicLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    const { name, email, password, cpassword } = formData;
    event.preventDefault();
    setPicLoading(true);
    if (!name || !email || !password || !cpassword) {
      alert("fill all the fields");
      setPicLoading(false);
      return;
    }
    if (password !== cpassword) {
      alert("Password Do not match");
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      alert("register Successfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      // history.push("/chats");
    } catch (error) {
      alert("Error Occured");
      setPicLoading(false);
    }
    // // Do something with the form data
    // const { name, email, password, cpassword } = formData;
    // // console.log(formData);
    // const res = await fetch("http://localhost:5000/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     // formData,
    //     name,
    //     email,
    //     password,
    //     cpassword,
    //   }),
    // }
    // );

    // const data = await res.json();
    // console.log(data);
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={formData.cpassword}
            name="cpassword"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>
        {/* <Link to="/login"> */}
        <button type="submit" onClick={handleSubmit} isLoading={picLoading}>
          Sign Up
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default SignupForm;
