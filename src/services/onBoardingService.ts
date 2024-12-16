import { AxiosError } from "axios";
import http from "./http.service"
export const REQUEST_PASSWORD_URL = `/auth/admin/forgot_password`;
export const RESET_PASSWORD_URL = `/auth/admin/reset_password`;
export const ACCOUNT_VERIFICATION_URL = `/auth/member/verifyAccount`;
export const EMAIL_EXIST_URL = `/auth/member/exists`;
export const CHECK_MEMBER_URL = `/auth/member/checkMember`;


export const loginUser= async (payload:any)=>{
   return http.post('/auth/partner/login',payload);
}
