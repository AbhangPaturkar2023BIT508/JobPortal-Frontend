import axios from "axios";

const base_url = "http://localhost:8080/notifications/";

const getNotifications = async (id) => {
  return axios
    .get(`${base_url}get/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const readNotification = async (id) => {
  return axios
    .put(`${base_url}read/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { getNotifications, readNotification };
