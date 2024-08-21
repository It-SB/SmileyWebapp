import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// Helper function to truncate text to a specific number of words
const truncateDescription = (description, wordLimit) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return description;
};

const Card = ({ data }) => {
  const {
    id,
    description,
    postedBy,
    jobTitle,
    minPrice,
    maxPrice,
    category,
    userImage,
    userName,
    jobLocation,
    createdAt,
    companyLogo,
  } = data;

  return (
    <div>
      <section className="card">
        <Link
          to={`/jobs/${id}`}
          className="flex gap-4 flex-col sm:flex-row items-start"
        >
          <img
            src={
              companyLogo || "https://smileyjobs.co/assets/img/logo/Smiley%20Jobs%20Logo.png"
            }
            alt={jobTitle}
            className="w-16 h-16 mb-4"
          />
          <div className="card-details">
            <h4 className="text-primary mb-1">{category}</h4>
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2">
                <FiMapPin /> {jobLocation}{" "}
              </span>
              {/* <span className="flex items-center gap-2"><FiClock/> {category}</span> */}
              <span className="flex items-center gap-2">
                {" "}
                {minPrice} - {maxPrice}
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar /> {createdAt}
              </span>
            </div>

            <p className="text-base text-primary/70">
              {truncateDescription(description, 20)}
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Card;
