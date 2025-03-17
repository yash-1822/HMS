import React from "react";

const bodyParts = [
  { name: "Heart", image: "/images/heart.png" },
  { name: "Lungs", image: "/images/lungs.png" },
  { name: "Brain", image: "/images/brain.png" },
  { name: "Kidney", image: "/images/kidneys.png" },
  { name: "Liver", image: "/images/liver.png" },
  { name: "Eye", image: "/images/view.png" },
  { name: "Nose", image: "/images/nose.png" },
  { name: "Ear", image: "/images/ear.png" },
  { name: "Lab", image: "/images/microscope.png" }
];

const BodyPartsSection = () => {
  return (
    <div className="bg-green-100 p-2">
      <div className="flex justify-center gap-26 flex-wrap">
        {bodyParts.map((part) => (
          <div
            key={part.name}
            className="flex flex-col items-center transform transition duration-300 hover:scale-110"
          >
            <div className="w-13 h-13 flex items-center justify-center bg-white border-2 border-green-500 rounded-full shadow-md hover:shadow-lg transition">
              <img src={part.image} alt={part.name} className="w-8 h-8" />
            </div>
            <p className="text-green-800 mt-2 font-semibold">{part.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyPartsSection;
