import axios from './index'
export const login = (p: { username: string, password: string }) => {
  return axios.post('/user/login', p)
}
interface RegisterP {
  name: string;
  role_id: number;
  username: string;
  password: string;
  status: number;
}
export const registerUser = (p: RegisterP) => {
  return axios.post('/user/register', p)
}
export const getUserList = (p: Axios.SearchParams) => {
  return axios.post('/user/users', p)
}
export const deleteUser = (p: { id: number }) => {
  return axios.post('/user/delete', p)
}
export const updateUser = (p: Partial<RegisterP>) => {
  return axios.post('/user/update', p)
}