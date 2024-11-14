import startIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  const {
    name = "Unknown Doctor", // Fallback value if name is missing
    avgRating = "N/A", // Default value if avgRating is missing
    totalRating = 0, // Default value if totalRating is missing
    photo = "default-photo-url.jpg", // Fallback image if photo is not available
    specialization = "General", // Default specialization if not provided
    experiences = [] // Default empty array if experiences are not provided
  } = doctor;

  return (
    <div className="p-3 lg:p-5">
      <div>
        <img src={photo} className="w-full" alt={`${name}'s profile`} />
      </div>
      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[18px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-textColor">
            <img src={startIcon} alt="Rating star" />
            {avgRating}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-headingColor">
            ({totalRating})
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          <p className="text-[14px] leading-6 font-[400] text-textColor">
            {/* Checking if experiences array exists and has at least one item */}
            At {experiences.length > 0 ? experiences[0]?.hospital : "Unknown Hospital"}
          </p>
        </div>
        <Link
          to={`/doctors/${doctor._id}`} // Safely navigating to the doctor's ID
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
