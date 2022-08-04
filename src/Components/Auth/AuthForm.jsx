import { useRef } from "react";
import { useState } from "react";
import "./AuthForm.css";

const AuthForm = () => {
  const emailInputRef = useRef();
    const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

const submitHandler = (e) => {
  e.preventDefault();
  const enteredEmail = emailInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;

  if (isLogin) {

  } else {
    
  }
}


  return (
    <section className="auth">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
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
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
