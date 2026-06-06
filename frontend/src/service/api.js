/* --- Holds API for Jikan (ANIME) and Backend --- */
export const jikanApi = "https://api.jikan.moe/v4";
export const backendApi = "http://localhost:5000";

/* --- Fetch data from jikan API --- */
export const jikan_api = async function (route = '/') {
    try {
        let api = await fetch(jikanApi + route); // Fetch from particular location
        let data = await api.json(); 
        return data; 
    } catch (error) {
        throw new Error(error);
    } 
}

/* --- POST Request to backend --- */
export const get_backend = async (route = "/", data) => {
    try {
        const token = localStorage.getItem("token");
        let res = await fetch(backendApi + route, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        let result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Request failed");
        }

        return result;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

/* --- GET Request to backend --- */
export const get_backend_data = async (route = "/") => {
    try {
        const token = localStorage.getItem("token");
        
        let res = await fetch(backendApi + route, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                ...(token && {Authorization: `Bearer ${token}`}),
            },
        });

        let result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Request failed");
        }

        return result;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

/* --- UPDATE Request to backend --- */
export const update_backend = async (route, data, isMultipart = false) => {
    try {
        const token = localStorage.getItem("token");

        let res = await fetch(backendApi + route, {
            method: 'PUT',
            headers: {
                ...(isMultipart ? {} : { "Content-Type": "application/json" }),
                Authorization: `Bearer ${token}`,
            },
            body: isMultipart ? data : JSON.stringify(data), // isMultipart is for multidata form 
        });

        let result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Request failed");
        }

        return result;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

/* --- DELETE Request to backend --- */
export const delete_from_backend = async (route) => {
    try {
        const token = localStorage.getItem("token");

        let res = await fetch(backendApi + route, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        let result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Request failed");
        }

        return result;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}