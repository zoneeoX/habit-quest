import React from "react";
import Icon from "../../assets/icon.png"

const Register = () => {
  return (
    <div className="w-screen min-h-screen max-h-full bg-zinc-800 px-24 py-8 overflow-hidden relative flex justify-center items-center">
      <div className="flex flex-col p-4 relative w-96 h-fit bg-white">
        <div className="flex flex-col justify-center items-center mb-5">
          <img src={Icon} className="w-20" alt="" />
          <h1>Welcome</h1>
          <p>Please enter your details to sign in!</p>
        </div>

        <div className="flex flex-row gap-4 justify-center items-center">
          <div>Discord</div>
          <div>Google</div>
          <div>Twitter</div>
        </div>

        <div>
          <input type="text" className="" />
          <input type="text" className="" />
        </div>
        <div className="w-screen flex justify-between items-cennter">
          <input type="checkbox" />
          <p className="underline">Forgot password?</p>
        </div>
        <div>
          <button>Sign in</button>
          <p>
            Don't have an account yet? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
