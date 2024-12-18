import http from "./http.service";
import { getStorageItem } from "./storage.service";

export const getLocationById = async () => {
    const id = getStorageItem("locationId");
    return http.get(`/partner/location/${id}`);
}

export const getAllLocations = async () => {
    const id = getStorageItem("id");
    return http.get(`/partner/all/locations/${id}`)
}