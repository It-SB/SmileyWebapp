 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { db } from '../firebase/firebase.config'; // Adjust import path if needed
import { collection, addDoc } from "firebase/firestore";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);
  const [jobType, setJobType] = useState(""); // New state for job type
  const [category, setCategory] = useState(""); // New state for category

  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit = async (data) => {
    data.skills = selectedOption.map(option => option.value); // Convert skills to an array of strings
    data.benefits = benefitsList;
    data.jobType = jobType; // Add jobType to the data
    data.category = category; // Add category to the data

    try {
      console.log("Data before adding:", data);
      const jobsCollection = collection(db, 'Otherjobs'); // Reference to 'Otherjobs' collection
      await addDoc(jobsCollection, data);
      alert("Job Posted Successfully!!");
      reset(); // Reset the form
      setSelectedOption([]); // Clear selected skills
      setBenefitsList([]); // Clear benefits list
      setJobType(""); // Clear job type selection
      setCategory(""); // Clear category selection
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job. Please try again.");
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  const handleBenefitsChange = (e) => {
    const value = e.target.value;
    const lines = value.split('\n').filter(line => line.trim() !== '');
    setBenefitsList(lines);
  };

  const jobTypeOptions = [
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const categoryOptions = [
    { value: "Health", label: "Health" },
    { value: "Finance", label: "Finance" },
    { value: "HR", label: "HR" },
    { value: "IT Consulting", label: "IT Consulting" },
    { value: "Education", label: "Education" },
    { value: "Legal", label: "Legal" },
    { value: "Marketing", label: "Marketing" },


    // Add more categories as needed
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                defaultValue="Web Developer"
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                placeholder="$100k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                className="create-job-input"
                {...register("createdAt")}
                placeholder="Ex: 2023-11-03"
                type="date"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="">Select Your Experience Level</option>
                <option value="0 - 2 years">0 - 2 years</option>
                <option value="2 - 4 years">2 - 4 years</option>
                <option value="4 - 6 years">4 - 6 years</option>
                <option value="6 - 10 years">6 - 10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              className="create-job-input py-4"
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your image url: https://weshare.com/img1.jpg"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 7th row: Job Type */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="create-job-input"
              >
                <option value="">Select Job Type</option>
                {jobTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="create-job-input"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 8th row: Job Description */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              {...register("description")}
              placeholder="job description"
              defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}
            />
          </div>

          {/* 9th row: Job Benefits */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Benefits (one per line)</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={3}
              onChange={handleBenefitsChange}
              placeholder="Enter each benefit on a new line"
            />
            <div className="mt-4">
              <label className="block mb-2 text-lg">Benefits List</label>
              <div className="pl-3">
                {benefitsList.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 10th row: Growth Potential */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Growth Potential</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={3}
              {...register("growthPotential")}
              placeholder="Describe the growth potential of the position"
            />
          </div>

          {/* 11th row: Additional Comments */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Additional Comments</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={3}
              {...register("additionalComments")}
              placeholder="Any additional comments about the job"
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted by</label>
            <input
              type="email"
              // value={user?.email}
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("postedBy")}
              placeholder="your email"
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
