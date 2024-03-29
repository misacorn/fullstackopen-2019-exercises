import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createComment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    {
      comment
    },
    config
  );
  return response.data;
};

const update = object => {
  const request = axios.put(`${baseUrl}/${object.id}`, object);
  return request.then(response => response.data);
};

const deletion = blog => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.delete(`${baseUrl}/${blog.id}`, config, blog);
  return request.then(response => response.data);
};

export default {
  setToken,
  getAll,
  create,
  createComment,
  update,
  deletion
};
