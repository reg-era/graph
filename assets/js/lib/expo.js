import { main } from "../main.js";

const _endPoint = "http://localhost:8080"

const fetchData = async (query, field_exposed = '') => {
    try {
        if (!await checkAuthorization()) {
            main()
        }
        const res = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
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

const checkAuthorization = async () => {
    if (localStorage.getItem('jwt') === null) return false

    try {
        const res = await fetch(`${_endPoint}/check`, {
            method: 'POST',
            body: JSON.stringify({
                jwt: localStorage.getItem('jwt'),
            })
        })

        return res.status === 200
    } catch (err) {
        return false
    }
}

const askForJwt = async (username, password) => {
    try {
        const res = await fetch(`${_endPoint}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        if (!res.ok) {
            return res.status
        }
        const data = await res.json()
        localStorage.setItem("jwt", data.jwt)
        return res.status
    } catch (err) {
        console.error(err);
    }
}

export { fetchData, checkAuthorization, askForJwt }