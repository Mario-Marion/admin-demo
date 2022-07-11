import axios from './index'

export const getMenuList = () => {
  return axios.get('/role/menu')
}

export const getRoleList = (p: Axios.SearchParams) => {
  return axios.post('/role/roles', p)
}
