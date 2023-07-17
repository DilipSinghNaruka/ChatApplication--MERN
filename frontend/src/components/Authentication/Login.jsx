import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      alert("Login Successful!");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="Login_section">
      <div className="box">
        <div className="form">
          <h2>LOGIN</h2>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="inputBx">
              <input
                type="email"
                name="email"
                placeholder="Username"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBx">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <label className="remember">
              <input type="checkbox" required />
              Remember Me
            </label>
            <div className="inputBx">
              <button type="submit" className="loginbutton" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          <h2>Create an Account</h2>
          <div className="inputBx">
            <Link to="/">
              <input type="button" className="signupbutton" value="SIGN UP" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

// import React, {useState } from "react";
// import "./LoginForm.css";
// import { Link } from "react-router-dom";
// import axios from "axios"

// function LoginPage() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading ,setLoading] = useState(false)

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const { email, password } = formData;
//     setLoading(true);
//     if (!email || !password) {
//       alert("please fill all fields from login");
//       setLoading(false);
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         config
//       );
//         console.log(JSON.stringify(data));
//       alert("Login Successfull");
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//     } catch (error) {
//       alert("Error Occured");
//       setLoading(false);
//     }
//   };
//   return (
//     <section className="Login_section">
//       <div className="box">
//         <div className="form">
//           <h2>LOGIN</h2>

//           <form>
//             <div className="inputBx">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Username"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             1
//             <div className="inputBx">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <label className="remeber">
//               <input type="checkbox" required />
//               Remember Me
//             </label>
//             <div className="inputBx">
//               <input
//                 type="submit"
//                 className="signupbutton"
//                 value="Login"
//                 onClick={handleSubmit}
//               />
//             </div>
//           </form>

//           <h2>Create an Account</h2>
//           <div className="inputBx">
//             <Link to="/">
//               <input type="button" className="signupbutton" value="SIGN UP" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginPage;
