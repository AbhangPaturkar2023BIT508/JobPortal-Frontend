import Header from "../Header/Header";
import Companies from "../LandingPage/Companies";
import DreamJob from "../LandingPage/DreamJob";
import JobCategory from "../LandingPage/JobCategory";
import Testimonials from "../LandingPage/Testimonials";
import Working from "../LandingPage/Working";
import Subscribe from "../LandingPage/Subscribe";
import Footer from "../Footer/Footer";
const Homepage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      <Header />
      <DreamJob />
      <Companies />
      <JobCategory />
      <Working />
      <Testimonials />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Homepage;
