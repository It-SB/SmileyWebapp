import { Input } from "postcss";
import React from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <InputField
          handleChange={handleChange}
          value="Johannesburg"
          title="Johannesburg"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Cape Town"
          title="Cape Town"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Pretoria"
          title="Pretoria"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Port Elizabeth"
          title="Port Elizabeth"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
