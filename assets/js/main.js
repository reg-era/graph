const main = async () => {
    console.log(getCookie("credential"))
    // console.log(await fetchData("{user{id login}}"));
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const fetchData = async (query) => {
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

        return await res.json()
    } catch (error) {
        console.error('Error on fetching:', error);
    }
}

main()