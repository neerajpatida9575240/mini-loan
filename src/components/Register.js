import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service";
import Loan_app from "../asset/Image/aaa.jpg"

const Login = () => {
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(false);
  const [Errormsg, setErrormsg] = useState("");
  const navigate = useNavigate();

  const _registerUser = async (e) => {
    e.preventDefault();
    var result = registerUser(name, email, password);
    result.then((response) => {
      if (response.status) {
        navigate("/login");
      } else {
        setError(true)
        setErrormsg(response.error);
      }
    });
  };

  const signIn = () =>{
    navigate("/login");
  }
  return (
    <div>
      <h2 className="text-center">Register</h2>
    <form onSubmit={_registerUser}>
      <div>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {Error === true && (
          <>
            <div
              className="alert alert-danger fade show"
              role="alert"
            >
              <p className=" mb-0 text-start">{Errormsg}</p>
            </div>
          </>
        )}
      <button className="mt-6" type="submit">
        Register
      </button>
      <div className="d-flex flex-column pt-2">
        <p className="text-center forget getappointedBtn m-0 ">
        Have an account? 
        </p>
        <button
          className="btn btn-lg sign-in mb-2"
          onClick={signIn}
        >
          Sign In
        </button>
      </div>
    </form>
     <div className="footer-head text-center login-footer-datawrap">
     <span className="login-dummy-text">
       {" "}
       PROTECT • STREAMLINE • GROW{" "}
     </span>
   </div>
   </div>
  );
};

export default Login;
