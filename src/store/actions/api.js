import axios from 'axios';
import { toast } from 'react-toastify';

const fetchStatistic = async () => {
  try {
    const res = await axios.get('/admin/statistic');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchAnalytic = async () => {
  try {
    const res = await axios.get('/admin/analytic');
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchWorkspaces = async (page, sortField, ascendingOrder) => {
  try {
    const res = await axios.get(
      `/admin/board?page=${page}&sort=${sortField}&ascendingOrder=${ascendingOrder}`,
    );
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const fetchUsers = async (page, sortField, ascendingOrder) => {
  try {
    const res = await axios.get(
      `/admin/user?page=${page}&sort=${sortField}&ascendingOrder=${ascendingOrder}`,
    );
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const updateBoard = async (boardId, payload) => {
  try {
    const res = await axios.put(`/admin/board/${boardId}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const deleteBoard = async (boardId) => {
  try {
    const res = await axios.delete(`/admin/board/${boardId}`);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const updateUser = async (userId, payload) => {
  try {
    const res = await axios.put(`/admin/user/${userId}`, payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const searchBoard = async (payload) => {
  try {
    const res = await axios.post('admin/board/search', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const searchUser = async (payload) => {
  try {
    const res = await axios.post('admin/user/search', payload);
    const { data } = res;
    return data;
  } catch (error) {
    toast.error(error.response.data.message, { theme: 'colored' });
  }
};

const api = {
  fetchStatistic,
  fetchAnalytic,
  fetchWorkspaces,
  fetchUsers,
  updateBoard,
  deleteBoard,
  updateUser,
  searchBoard,
  searchUser,
};

export default api;
