import React from "react";
import { useNavigate } from "react-router-dom";

const bodyParts = [
  { name: "All", image: "/images/all.jpg" },
  { name: "Heart", image: "/images/heart.png" },
  { name: "Lungs", image: "/images/lungs.png" },
  { name: "Brain", image: "/images/brain.png" },
  { name: "Kidney", image: "/images/kidneys.png" },
  { name: "Liver", image: "/images/liver.png" },
  { name: "Eye", image: "/images/view.png" },
  { name: "Nose", image: "/images/nose.png" },
  { name: "Ear", image: "/images/ear.png" },
  { name: "Lab", image: "/images/microscope.png" },
];

const BodyPartsSection = ({ onBodyPartSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-100 px-1 py-1 pt-2">
      <div
        className="
          flex gap-4 
          overflow-x-auto 
          sm:flex-wrap sm:justify-evenly 
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent
        "
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        onScroll={(e) => {
          e.currentTarget.style.scrollbarWidth = "none";
        }}
      >
        {bodyParts.map((part) => (
          <div
            key={part.name}
            className="flex flex-col items-center min-w-[60px] sm:min-w-[90px] transform transition-transform duration-300 hover:scale-80 cursor-pointer"
            onClick={() => onBodyPartSelect(part.name.toLowerCase())}
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white border-2 border-green-500 rounded-full shadow-md hover:shadow-lg">
              <img src={part.image} alt={part.name} className="w-8 h-8" />
            </div>
            <p className="text-green-800 mt-1 font-semibold text-sm whitespace-nowrap">
              {part.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyPartsSection;
