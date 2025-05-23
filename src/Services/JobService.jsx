import axiosInstance from "../Interceptor/AxiosInterceptor";

const postJob = async (job) => {
  return axiosInstance
    .post(`/jobs/post`, job)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getAllJobs = async () => {
  return axiosInstance
    .get(`/jobs/getAll`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getJob = async (id) => {
  return axiosInstance
    .get(`/jobs/get/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const applyJob = async (id, applicant) => {
  return axiosInstance
    .post(`/jobs/apply/${id}`, applicant)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getJobPostedBy = async (id) => {
  return axiosInstance
    .get(`/jobs/postedBy/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const changeApplicationStatus = async (application) => {
  return axiosInstance
    .post(`/jobs/changeApplicationStatus`, application)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

export {
  postJob,
  getAllJobs,
  getJob,
  applyJob,
  getJobPostedBy,
  changeApplicationStatus,
};
