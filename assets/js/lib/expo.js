import { main } from "../main.js";

const _endPoint = "https://server-graph.onrender.com"

const fetchData = async (query) => {
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

        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data.data
    } catch (error) {
        localStorage.removeItem('jwt')
        main()
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