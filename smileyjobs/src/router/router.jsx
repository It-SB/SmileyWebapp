import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import CreateJob from "../Pages/CreateJob";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import Login from "../Pages/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import SignupPage from "../Pages/Signup";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config"; // Adjust import path if needed
import CreateUserProfile from "../Pages/CreateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, // Public route
      },
      {
        path: "/about",
        element: <About />, // Public route
      },
      {
        path: "/contact",
        element: <Contact />, // Public route
      },
      {
        path: "/my-job",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ), // Protected route
      },
      {
        path: "/salary",
        element: <SalaryPage />, // Public route
      },
      {
        path: "/create-profile",
        element: <CreateUserProfile />, // Public route
      },
      {
        path: "/post-job",
        element: (
          <PrivateRoute>
            <CreateJob />
          </PrivateRoute>
        ), // Protected route
      },
      {
        path: "/edit-job/:id",
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const jobRef = doc(db, "Otherjobs", params.id); // Adjust 'Otherjobs' to your Firestore collection name
            const jobSnap = await getDoc(jobRef);

            if (jobSnap.exists()) {
              return jobSnap.data(); // Returns the job data if it exists
            } else {
              throw new Error("Job not found");
            }
          } catch (error) {
            console.error("Error fetching job:", error);
            throw new Response("Job not found", { status: 404 }); // Handles error with a 404 response
          }
        },
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />, // Public route
      },
    ],
  },
  {
    path: "/login",
    element: <Login />, // Public route
  },
  {
    path: "/signup",
    element: <SignupPage />, // Public route
  },
  {
    path: "/logins",
    element: <SignIn />, // Public route
  },
  {
    path: "/signups",
    element: <SignUp />, // Public route
  },
]);

export default router;
