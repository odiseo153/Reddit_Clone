export const fetchRequest = async (url, method = "GET", data = null, contentType = "application/json") => {
    const token = localStorage.getItem("token") || "";

    const headers = {
        "Content-Type": contentType,
        "Authorization": `Bearer ${token}`,
    };

    const options = {
        method,
        headers
    };

    if (data) {
        options.body = contentType === "application/json" ? JSON.stringify(data) : data;
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            console.log(result)
        }


        return result;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
