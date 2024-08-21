import React from "react";
import Card from "../components/Card";

const Jobs = ({ result }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
      </div>
      <section className="card-container">
        {result.map((job, index) => (
          <Card key={index} data={job} />
        ))}
      </section>
    </>
  );
};

export default Jobs;
