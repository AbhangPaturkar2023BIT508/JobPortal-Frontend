import { Button, Divider } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import ApplyJob from "../Components/ApplyJob/ApplyJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id)
      .then((res) => {
        setJob(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" mb="xs" />
      {/* <Link className="my-5 inline-block " to="/jobs"> */}
      <Button
        mb="xs"
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
      >
        Back
      </Button>
      {/* </Link> */}
      <ApplyJob {...job} />
    </div>
  );
};

export default ApplyJobPage;
