import React, { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const [filteredTalents, setFilteredTalents] = useState([]);
  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (sort == "Experience (Low to High)") {
      setTalents([...talents].sort((a, b) => a.totalExp - b.totalExp));
    } else if (sort == "Experience (High to Low)") {
      setTalents([...talents].sort((a, b) => b.totalExp - a.totalExp));
    }
  }, [sort]);

  useEffect(() => {
    let filterTalents = talents;
    if (filter.name)
      filterTalents = filterTalents.filter((talent) =>
        talent.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterTalents = filterTalents.filter((talent) =>
        filter["Job Title"]?.some((title) =>
          talent.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location && filter.Location.length > 0) {
      filterTalents = filterTalents.filter((talent) =>
        filter.Location?.some((location) =>
          talent.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Skills && filter.Skills.length > 0) {
      filterTalents = filterTalents.filter((talent) =>
        filter.Skills?.some((skill) =>
          talent.skills?.some((talentSkill) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    if (filter.exp && filter.exp.length > 0) {
      filterTalents = filterTalents.filter(
        (talent) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
      );
    }
    setFilteredTalents(filterTalents);
  }, [filter, talents]);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <Sort />
      </div>
      <div className="flex flex-wrap gap-5 mt-10 justify-around">
        {filteredTalents.length ? (
          filteredTalents.map((talent, index) => (
            <TalentCard key={index} {...talent} />
          ))
        ) : (
          <div className="text-2xl font-semibold">No Talents Found</div>
        )}
      </div>
      <div className="flex flex-wrap gap-5"></div>
    </div>
  );
};

export default Talents;
