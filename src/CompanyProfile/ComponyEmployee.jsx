import React from "react";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const ComponyEmployee = () => {
  return (
    <div className="flex mt-10 flex-wrap gap-5 justify-around">
      {talents.map(
        (talent, index) => index < 6 && <TalentCard key={index} {...talent} />
      )}
    </div>
  );
};

export default ComponyEmployee;
