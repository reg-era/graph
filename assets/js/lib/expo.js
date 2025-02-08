import {main} from "../main.js"

const fetchData = async (query, field_exposed = '') => {
    try {
        const jwt = getCookie("credential")
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

const checkCookie = async () => {
    try {
        let value = getCookie('credential')
        if (!value) throw new Error("credential not found");
        const res = await fetch("http://localhost:8080/check", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jwt: value,
            })
        })
        console.log(res.status);
        
        return res.status === 200
    } catch (err) {
        console.error('Error on getting jwt:', err);
        return false
    }
}

const askForJwt = async (username, password) => {
    try {
        const res = await fetch("http://localhost:8080/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })

        const data = await res.json()
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)

        document.cookie = `credential=${data.jwt}; expires=${expiryDate.toUTCString()}; path=/;`;
        main()
    } catch (err) {
        console.error('Error on getting jwt:', err);
    }
}

export { fetchData, checkCookie, askForJwt }