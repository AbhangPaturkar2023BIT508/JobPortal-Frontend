import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import RecommendedTalent from "../Components/TalentProfile/RecommendedTalent";
import Profile from "../Components/TalentProfile/Profile";
import { Link, useNavigate } from "react-router-dom";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState([]);
  useEffect(() => {
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['Poppins'] p-4">
      <Divider size="xs" mx="md" />
      <Link className="my-5 inline-block" to="/find-talent">
        <Button
          onClick={() => navigate(-1)}
          my="sm"
          color="brightSun-4"
          leftSection={<IconArrowLeft size={20} />}
          variant="light"
        >
          {" "}
          Back
        </Button>
      </Link>
      <div className="flex gap-5">
        <Profile />
        <RecommendedTalent talents={talents} />
      </div>
    </div>
  );
};

export default TalentProfilePage;
