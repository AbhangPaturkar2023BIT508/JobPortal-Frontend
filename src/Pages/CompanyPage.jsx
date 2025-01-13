import React from "react";
import { Button, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Company from "../Components/CompanyProfile/Company";
import SimilarCompanies from "../Components/CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" />
      <Button
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
        my="md"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <div className="flex gap-5 justify-between">
        <Company />
        <SimilarCompanies />
      </div>
    </div>
  );
};

export default CompanyPage;
