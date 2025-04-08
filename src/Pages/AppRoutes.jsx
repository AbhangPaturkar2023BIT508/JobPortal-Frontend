import React from "react";
import Homepage from "./Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindJobs from "./FindJobs";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import FindTalents from "./FindTalents";
import TalentProfile from "../Components/FindTalent/TalentProfile";
import PostJobPage from "./PostJobPage";
import JobDescriptionPage from "./JobDescriptionPage";
import ApplyJobPage from "./ApplyJobPage";
import CompanyPage from "./CompanyPage";
import PostedJobPage from "./PostedJobPage";
import JobHistoryPage from "./JobHistoryPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalents />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/jobs/:id" element={<JobDescriptionPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route path="/talent-profile" element={<TalentProfile />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/posted-job" element={<PostedJobPage />} />
          <Route path="/job-history" element={<JobHistoryPage />} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="*" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
