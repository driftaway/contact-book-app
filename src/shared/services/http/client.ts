import axios from 'axios'

axios.interceptors.response.use(({ data }) => data)

const get = (url: string) => axios.get(url).then((response) => response)

export default { get }
