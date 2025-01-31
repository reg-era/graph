const fetchData = async (query) => {
    try {
        const jwt = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MDI0IiwiaWF0IjoxNzM4MzU3NDY3LCJpcCI6IjE2MC4xNzcuMjA2Ljg4LCAxNzIuMTguMC4yIiwiZXhwIjoxNzM4NDQzODY3LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1jYW1wdXNlcyI6Int9IiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI0MDI0IiwieC1oYXN1cmEtdG9rZW4taWQiOiI2ODU3YWE3MC0xMmIwLTQ1ZmEtYjZlYy0xMDllNzcyZjczOTMifX0.pzUsatO8j20dZd-e7J54RscICzBAH5OtIlbuk_B-etU`// getCookie("credential")
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

        return await res.json()
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