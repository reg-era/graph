const fetchData = async (query, field_exposed = '') => {
    try {
        const jwt = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MDI0IiwiaWF0IjoxNzM4Njc4NjA5LCJpcCI6IjQxLjE0MC4xMjQuMTA3LCAxNzIuMTguMC4yIiwiZXhwIjoxNzM4NzY1MDA5LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1jYW1wdXNlcyI6Int9IiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI0MDI0IiwieC1oYXN1cmEtdG9rZW4taWQiOiJlZGY1NGM1OS1iMzNkLTRkNmEtYWY2MC00Mzc0NTU4NDgxYWQifX0.LsNtGBVdtc2RhqJyXEkHiTAIzOco9UcTcQ41JFLdg50`// getCookie("credential")
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