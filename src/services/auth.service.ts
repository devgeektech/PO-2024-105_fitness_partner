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

export const loginByToken= async (payload:any)=>{
  return http.post('/auth/member/token_login',payload);
}

export const registerUser= async (payload:any)=>{
    return http.post('/auth/member/register',payload);
 }

export const changeUserPassword= async (payload:any)=>{
   return http.post('/auth/member/changePassword',payload);
}

export function requestPassword(email: string) {
   return http.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
     email,
   })
 }
 
 export function requestVerifyAndChangePassword(email: string, otp: string, password: string) {
   return http.post<{ result: boolean }>(RESET_PASSWORD_URL, {
     email,
     otp, password
   })
 }

 export function requestVerifyAccount(token:string) {
  return http.post<{ result: any }>(ACCOUNT_VERIFICATION_URL, {
     token
  })
}

export function checkEmailExists(email:string) {
  return http.post<{ data: any }>(EMAIL_EXIST_URL, {
     email
  })
}

export async function checkMemberInDB(email:string) {
   try {
    return await http.post<{ data: any }>(CHECK_MEMBER_URL, {
      email
   })
   } catch (error) {
    if(error instanceof AxiosError){
      return {status: 400};
    }
   }
}