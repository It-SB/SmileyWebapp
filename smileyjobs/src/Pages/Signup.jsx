import React, { useContext, useState } from "react";
import { FaGoogle, FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const { createUser, signUpWithGmail } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Check if the email is verified
      if (user.emailVerified) {
        navigate(from, { replace: true });
      } else {
        setVerificationMessage("Please verify your email address before logging in.");
        await user.sendEmailVerification();
      }
    } catch (error) {
      setErrorMessage("Error creating account. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signUpWithGmail();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage("Error signing up with Google. Please try again.");
    }
  };

  return (
    <div className="h-screen mx-auto container flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
        >
          <h3 className="text-xl font-semibold mb-4">Create an Account</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="name@email.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-xs italic">{errorMessage}</p>
            )}
            {verificationMessage && (
              <p className="text-yellow-500 text-xs italic">{verificationMessage}</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="mt-8 text-center w-full mx-auto">
            <p className="mb-4">Or sign up with:</p>
            <div className="flex items-center justify-center gap-4 w-full mx-auto">
              <button
                className="border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                type="button"
                onClick={handleGoogleSignup}
              >
                <FaGoogle />
              </button>
              {/* <button
                className="border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                type="button"
              >
                <FaFacebookF />
              </button>
              <button
                className="border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                type="button"
              >
                <FaLinkedin />
              </button>
              <button
                className="border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                type="button"
              >
                <FaInstagram />
              </button> */}
            </div>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 SmileyJobs. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
