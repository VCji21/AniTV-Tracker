import React from 'react'
import { get_backend_data, backendApi } from '../../../../../service/api';

/* --- Get current user --- */
export const getUserInfo = async () => {
    try {
        const res = await get_backend_data(`/api/users/me`);

        let img = "";
        if (res.profile_image) img = `${backendApi}/uploads/${res.profile_image}`;
        else img = `${backendApi}/uploads/defAvatar.png`;

        return({
            profile_image: img,
            username: res.username,
        })
    } catch (err) {
        console.error(err);
    }
};

/* --- Get all users except current --- */
export const getAllUserInfo = async () => {
    try {
        const res = await get_backend_data(`/api/users/all`);
        if (!res) {
            console.log("No data present")
        }
        return res;
    } catch (err) {
        console.error(err);
    }
};