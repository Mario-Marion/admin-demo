import Axios from 'axios'
import { useBaseStore } from "@/stores/base";

let base_url;
if (import.meta.env.MODE = "development") {
  base_url = "/api"
  // base_url = ""
} else if (import.meta.env.MODE = "production") {
  base_url = "http://119.23.40.46:9000/api"
}
const axios = Axios.create({
  baseURL: base_url,
  timeout: 15000
  // headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'xxx',
  //   },
})

let loading: any;
axios.interceptors.request.use(config => {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const baseStore = useBaseStore();
  let token = baseStore.token;
  if (config && config.headers) {
    if (token) {
      config.headers['token'] = "Bearer " + token
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
})


axios.interceptors.response.use(res => {

  loading.close()
  const data = res.data;

  return data;
}, error => {
  loading.close()
  const { data } = error.response
  if (data.status >= 400) {
    ElMessage.error({
      duration: 3000,
      message: data.message
    })
  }
  return data
})


export default axios