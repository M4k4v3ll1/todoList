import { AxiosResponse } from "axios"
import { instance } from "common/instance"
import { BaseResponseType } from "common/types"
import { LoginType } from "features/auth/api/authApi.types"

export const authAPI = {
  me() {
    return instance.get<
      BaseResponseType<{ id: number; email: string; login: string }>,
      AxiosResponse<BaseResponseType>
    >("/auth/me")
  },
  login(data: LoginType) {
    return instance.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<BaseResponseType<{ userId: number }>>,
      LoginType
    >("/auth/login", data)
  },
  logout() {
    return instance.delete<BaseResponseType, AxiosResponse<BaseResponseType>>("/auth/login")
  },
}
