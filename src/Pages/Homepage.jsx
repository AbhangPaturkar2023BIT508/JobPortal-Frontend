import Companies from "../Components/LandingPage/Companies";
import DreamJob from "../Components/LandingPage/DreamJob";
import JobCategory from "../Components/LandingPage/JobCategory";
import Testimonials from "../Components/LandingPage/Testimonials";
import Working from "../Components/LandingPage/Working";
import Subscribe from "../Components/LandingPage/Subscribe";

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
