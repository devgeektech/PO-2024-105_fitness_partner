import http from "./http.service";


export const getClasslist = async (payload:any) => {
    return http.get(`/partner/allClass`,{params:payload});
}

export const addClass = async (payload: any) => {
    return http.post(`/partner/addClass`, payload);
}


export const getClassDetails = async (id:any) => {
    return http.get(`/partner/class/${id}`);
}
