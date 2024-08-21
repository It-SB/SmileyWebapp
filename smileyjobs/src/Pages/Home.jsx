import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Sidebar from "../sidebar/Sidebar";
import Jobs from "./Jobs";
import app from "../firebase/firebase.config";
import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const [state, setState] = useState({
    selectedCategory: null,
    jobs: [],
    currentPage: 1,
    queryText: "",
    location: "",
    isLoading: true,
  });

  const itemsPerPage = 6;
  const db = getFirestore(app);

  useEffect(() => {
    getLatestJobList();
  },[]);

  const getLatestJobList = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const q = query(collection(db, "Otherjobs"), orderBy("createdAt", "desc"));
    const querySnapShot = await getDocs(q);
    const jobsData = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setState((prevState) => ({
      ...prevState,
      jobs: jobsData,
      isLoading: false,
    }));
  };

  const handleInputChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      queryText: event.target.value,
    }));
  };

  const handleLocationChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      location: event.target.value,
    }));
  };

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: event.target.value,
    }));
  };

  const handleClick = (event) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: event.target.value,
    }));
  };

  const calculatePageRange = () => {
    const startIndex = (state.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (state.currentPage < Math.ceil(filteredItems().length / itemsPerPage)) {
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const prevPage = () => {
    if (state.currentPage > 1) {
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const filteredItems = () => {
    let filteredJobs = state.jobs;
  
    // Filter by queryText
    if (state.queryText) {
      filteredJobs = filteredJobs.filter(job =>
        job.jobTitle && job.jobTitle.toLowerCase().includes(state.queryText.toLowerCase())
      );
    }
  
    // Filter by location
    if (state.location) {
      filteredJobs = filteredJobs.filter(job =>
        job.jobLocation && job.jobLocation.toLowerCase().includes(state.location.toLowerCase())
      );
    }
  
    // Filter by selectedCategory
    if (state.selectedCategory) {
      const category = state.selectedCategory.toLowerCase();
      filteredJobs = filteredJobs.filter(job => {
        return (
          (job.jobLocation && job.jobLocation.toLowerCase() === category) ||
          (job.postingDate && job.postingDate.toLowerCase() === category) ||
          (job.maxPrice && parseInt(job.maxPrice, 10) <= parseInt(state.selectedCategory, 10)) ||
          (job.salaryType && job.salaryType.toLowerCase() === category) ||
          (job.experienceLevel && job.experienceLevel.toLowerCase() === category) ||
          (job.employmentType && job.employmentType.toLowerCase() === category)
        );
      });
    }
  
    return filteredJobs;
  };

  const result = filteredItems().slice(
    calculatePageRange().startIndex,
    calculatePageRange().endIndex
  );

  return (
    <div>
      <Banner
        handleInputChange={handleInputChange}
        handleLocationChange={handleLocationChange}
        query={state.queryText}
        location={state.location}
      />

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className="col-span-2 bg-white p-4 rounded">
          {state.isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}

          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={state.currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {state.currentPage} of{" "}
                {Math.ceil(filteredItems().length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  state.currentPage ===
                  Math.ceil(filteredItems().length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
