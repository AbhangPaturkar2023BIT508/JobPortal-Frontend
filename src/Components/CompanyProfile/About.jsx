import React from "react";
import { companyData } from "../../Data/Company";

const About = () => {
  return (
    <div className="flex flex-col gap-5">
      {Object.keys(companyData).map(
        (key, index) =>
          key !== "Name" && (
            <div key={index}>
              <div className="text-xl mb-3 font-semibold">{key}</div>
              {key !== "Website" && (
                <div className="text-sm text-mine-shaft-300 text-justify">
                  {key !== "Specialties"
                    ? companyData[key]
                    : companyData[key].map((item, index) => (
                        <span key={index}> &bull; {item}</span>
                      ))}
                </div>
              )}
              {key === "Website" && (
                <a
                  href={companyData[key]}
                  target="_blank"
                  className="text-sm text-bright-sun-400 text-justify"
                >
                  {companyData[key]}
                </a>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default About;
