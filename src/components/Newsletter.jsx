import React, { useState, useEffect } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "../firebase/firebase.config.js";
import { Link } from "react-router-dom";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkEmailExists = async () => {
      if (email) {
        const q = query(
          collection(db, "Subscribers"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);
        setIsSubscribed(!querySnapshot.empty);
      }
    };

    checkEmailExists();
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email && !isSubscribed) {
      try {
        await addDoc(collection(db, "Subscribers"), { email });
        alert("Subscription successful!");
        setIsSubscribed(true);
        setEmail(""); // Clear the input field
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Subscription failed. Please try again.");
      }
    }
  };

  const handleResumeUpload = () => {
    const resumeUploadUrl = "https://it-sb.github.io/SmileyUpload/";
    window.open(resumeUploadUrl, "_blank", "width=600,height=600");
  };

  return (
    <div>
      {!isSubscribed && (
        <div>
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <FaEnvelopeOpenText /> Subscribe for Job Alerts
          </h3>
          <p className="text-primary/75 text-base mb-4">
            Stay updated with the latest job opportunities by subscribing to our
            email notifications. Never miss a chance to advance your career.
          </p>
          <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full block py-2 pl-3 border focus:outline-none"
            />
            <input
              type="submit"
              value="Subscribe"
              className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
            />
          </form>
        </div>
      )}

      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket /> Boost Your Visibility
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Upload your resume to increase your chances of being noticed by top
          employers. Make sure your profile stands out!
        </p>
        <div className="w-full space-y-4">
          <input
            type="button"
            value="Upload Your Resume"
            onClick={handleResumeUpload}
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <MdAccountCircle /> Create A Profile
        </h3>
        <p className="text-primary/75 text-base mb-4">
        Create a profile to access personalized job opportunities tailored to your career aspirations.
        </p>
        <div className="w-full space-y-4">
          <Link to={`/create-profile`}><input
            type="button"
            value="Create Profile"
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          /></Link>
          
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
