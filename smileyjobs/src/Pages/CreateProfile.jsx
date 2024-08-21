import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { db } from '../firebase/firebase.config'; // Adjust import path if needed
import { collection, addDoc } from "firebase/firestore";

const CreateUserProfile = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);
  const [preferredWorkModel, setPreferredWorkModel] = useState({
    fullyRemote: false,
    hybrid: true,
    officeBased: false,
    relocate: true,
  });
  const [salaryBrackets, setSalaryBrackets] = useState({
    between50kAnd100k: true,
    lessThan50k: false,
    moreThan100k: false,
  });
  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const [selectedLocation, setSelectedLocation] = useState("South Africa");
  const [selectedProvince, setSelectedProvince] = useState("Free State");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    data.skills = selectedOption.map(option => option.value);
    data.benefits = benefitsList;
    data.preferredWorkModel = preferredWorkModel;
    data.salaryBrackets = salaryBrackets;
    data.selectedCurrency = selectedCurrency;
    data.selectedLocation = selectedLocation;
    data.selectedProvince = selectedProvince;

    try {
      console.log("Data before adding:", data);
      const usersCollection = collection(db, 'Users'); // Reference to 'Users' collection
      await addDoc(usersCollection, data);
      alert("Profile Created Successfully!!");
      reset();
      setSelectedOption([]);
      setBenefitsList([]);
      setPreferredWorkModel({
        fullyRemote: false,
        hybrid: true,
        officeBased: false,
        relocate: true,
      });
      setSalaryBrackets({
        between50kAnd100k: true,
        lessThan50k: false,
        moreThan100k: false,
      });
      setSelectedCurrency("AED");
      setSelectedLocation("South Africa");
      setSelectedProvince("Free State");
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Error creating profile. Please try again.");
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

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Name</label>
              <input
                defaultValue="Go"
                {...register("name")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Email</label>
              <input
                type="email"
                defaultValue="Go"
                {...register("email")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Phone</label>
              <input
                defaultValue="666"
                {...register("phone")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Address</label>
              <input
                defaultValue="Cop"
                {...register("address")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Gender & Ethnicity */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Gender</label>
              <select
                defaultValue="Female"
                {...register("gender")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Ethnicity</label>
              <input
                defaultValue="Caucasian"
                {...register("ethnicity")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Profile Image URL</label>
            <input
              type="url"
              defaultValue="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ2s0azR0OFl1VnltcjJ6VGhBWFlwRG5OR0EifQ"
              {...register("userImage")}
              className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* User Preferred Work Model */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Preferred Work Model</label>
            <div className="flex flex-col space-y-2">
              {Object.keys(preferredWorkModel).map((key) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferredWorkModel[key]}
                    onChange={() =>
                      setPreferredWorkModel((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    className="mr-2"
                  />
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              ))}
            </div>
          </div>

          {/* User Salary Brackets */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Salary Brackets</label>
            <div className="flex flex-col space-y-2">
              {Object.keys(salaryBrackets).map((key) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={salaryBrackets[key]}
                    onChange={() =>
                      setSalaryBrackets((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    className="mr-2"
                  />
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              ))}
            </div>
          </div>

          {/* Currency & Location */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Selected Currency</label>
              <input
                defaultValue={selectedCurrency}
                {...register("selectedCurrency")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Selected Location</label>
              <input
                defaultValue={selectedLocation}
                {...register("selectedLocation")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Selected Province</label>
              <input
                defaultValue={selectedProvince}
                {...register("selectedProvince")}
                className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Description</label>
            <textarea
              defaultValue=""
              {...register("description")}
              className="block w-full border rounded-md py-2 px-3 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserProfile;
