import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from "sweetalert2";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../firebase/firebase.config"; // Adjust the import based on your file structure

const JobDetails = () => {
  const { id } = useParams();
  // const {desc} = useParams();
  const [job, setJob] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchJob = async () => {
      const docRef = doc(db, "Otherjobs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setJob(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchJob();
  }, [id, db]);

  const handleJobApply = async () => {
    // const { value: url } = await Swal.fire({
    //   input: "url",
    //   inputLabel: "CV or Resume URL address",
    //   inputPlaceholder: "Enter the URL",
    // });

    // if (url) {
    //   Swal.fire(`Entered URL: ${url}`).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire("Application Submitted Successfully!", "", "success");
    //     } else if (result.isDenied) {
    //       Swal.fire("Changes are not saved", "", "info");
    //     }
    //   });
    // }
    const confirmApply = window.confirm("Are you sure you want to apply for this job?");

  if (confirmApply) {
    const subject = "Regarding " + (job.jobTitle || "Job Application") + "Job Post";
    const body =
      "Hi " +
      (job?.userName || "Employer") +
      ",\n\n" +
      "I am interested in applying for this job.";

    // Open the default email client
    window.location.href = `mailto:${job?.postedBy || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />
      <div className="mt-10">
        {/* <h3 className="font-semibold mb-2">Job ID: {id}</h3> */}

        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">Position</h2>
          <p className="bg-blue px-6 py-1 text-white rounded-sm">{job.jobTitle}</p>
        </div>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Job type</p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.jobType || "Employment Type"}
          </button>
          <button
            className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2"
            onClick={handleJobApply}
          >
            Apply Now
          </button>
        </div>

        {/* job details */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Benefits</h4>
            <p className="text-sm text-primary/70 mb-2">
              Pulled from the full job description
            </p>
            <ul className="list-disc list-outside text-primary/90 space-y-2 text-base">
              <li>
                Salary:
                {job.minPrice && job.maxPrice
                  ? ` ${job.minPrice} - ${job.maxPrice} ${job.salaryType}`
                  : job.range
                  ? job.range
                  : "Not available"}
              </li>
              {job.benefits && job.benefits.length > 0 ? (
                job.benefits.map((benefit) => (
                  <li key={benefit}>
                    {benefit.id}. {benefit.text}
                  </li>
                ))
              ) : (
                <li>No benefits listed</li>
              )}
            </ul>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">OutLine</h4>
            <p className="text-primary/90">{job.desc || job.description}</p>
          </div>
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Future Growth</h4>
            {job.growthPotential || "Not yet provided"}
          </div>
        </div>

        <div className="text-primary/75 my-5 space-y-6">
          {job.additionalComments}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
