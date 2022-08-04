import { useRef } from "react";
import { useState } from "react";
import "./AuthForm.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoginModeActive, setIsLoginModeActive] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLoginModeActive((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLoginModeActive) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbRAP1xePx6leAV2k-N5q7yXrfpPqIkwY",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          // ...
        } else {
          res.json().then((data) => {
            // error
            alert(data);
          });
        }
      });
    }
  };

  return (
    <section className="auth">
      <h1>{isLoginModeActive ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="login-control">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className="login-control">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="login-actions">
          <button>{isLoginModeActive ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLoginModeActive
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
