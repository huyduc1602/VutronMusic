import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { doLogout } from './auth'

const baseUrl = '/netease'

// Cấu hình instance Axios
const service: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 30000, // 30 giây timeout
})

// Cấu hình thử lại request
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 giây delay giữa các lần thử lại

// Interceptor xử lý request
service.interceptors.request.use(
  config => config,
  async (err) => {
    const config = err.config as AxiosRequestConfig & { retryCount?: number }

    // Kiểm tra điều kiện thử lại request
    if (!config || !config.retryCount || config.retryCount >= MAX_RETRIES) {
      return Promise.reject(err)
    }

    // Tăng số lần đã thử
    config.retryCount = (config.retryCount || 0) + 1

    // Chờ trước khi thử lại
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))

    // Thực hiện lại request
    return service(config)
  }
)

// Interceptor xử lý response
service.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Lỗi timeout:', error.config?.url)
      return Promise.reject(new Error('Yêu cầu quá thời gian chờ. Vui lòng thử lại.'))
    }

    const { response } = error
    const data = response?.data as any

    if (data?.code === 301 && data?.message === '未登录') {
      console.log('Phiên đăng nhập đã hết hạn')
      doLogout()
    }

    return Promise.reject(error)
  }
)

// Hàm wrapper với kiểm tra kiểu dữ liệu
const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await service.request(config)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || 'Lỗi kết nối đến máy chủ')
    }
    throw error
  }
}

export default request
