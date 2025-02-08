const fetchData = async (query, field_exposed = '') => {
    try {
        const jwt = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MDI0IiwiaWF0IjoxNzM4Nzg4ODE2LCJpcCI6IjE5Ny4xNDQuMTQzLjE5NCwgMTcyLjE4LjAuMiIsImV4cCI6MTczODg3NTIxNiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtY2FtcHVzZXMiOiJ7fSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiNDAyNCIsIngtaGFzdXJhLXRva2VuLWlkIjoiMmRkZmZhYTctODEyNS00MjQzLWJhYTktM2IwNjAxMDE4ZDU5In19.PXhQDtBTQvwjTsUzC_0RqoyYKQuYNY-8eW0e5tN_VfY`// getCookie("credential")
        if (!jwt) throw new Error("credential not found");

        const res = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query
            }),
        });

        let data = await res.json()
        const nested = field_exposed.split('.')

        if (nested.length > 1) {
            data = data.data
            for (let i = 0; i < nested.length; i++) {
                if (Array.isArray(data)) {
                    if (data.length === 1 && typeof data[0][nested[i]] !== undefined) {
                        data = data[0][nested[i]]
                        if (i === nested.length - 1) return data
                        continue
                    }
                }

                if (typeof data[nested[i]] !== undefined) {
                    data = data[nested[i]]
                } else {
                    return undefined
                }
            }
        } else {
            return (field_exposed !== '') ? data.data[field_exposed] : data.data
        }
    } catch (error) {
        console.error('Error on fetching:', error);
    }
}

const getCookie = (name) => {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export { fetchData, getCookie }