import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import RecommendedTalent from "../Components/TalentProfile/RecommendedTalent";
import Profile from "../Components/TalentProfile/Profile";
import { useNavigate } from "react-router-dom";

const TalentProfilePage = () => {
  const navigate = useNavigate();
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
        <RecommendedTalent />
      </div>
    </div>
  );
};

export default TalentProfilePage;
