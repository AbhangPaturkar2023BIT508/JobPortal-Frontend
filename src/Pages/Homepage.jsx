import Companies from "../LandingPage/Companies";
import DreamJob from "../LandingPage/DreamJob";
import JobCategory from "../LandingPage/JobCategory";
import Testimonials from "../LandingPage/Testimonials";
import Working from "../LandingPage/Working";
import Subscribe from "../LandingPage/Subscribe";

const Homepage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      <DreamJob />
      <Companies />
      <JobCategory />
      <Working />
      <Testimonials />
      <Subscribe />
    </div>
  );
};

export default Homepage;
