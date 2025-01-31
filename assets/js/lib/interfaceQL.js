import { fetchData } from "./expo.js"

const getUserXP = async () => {
    const query = `{
        user {
            firstName
            lastName
            id
            auditRatio
        }
        transaction{
            amount
        }
    }`

    const data = await fetchData(query)
    const res = data.data["transaction"]
    console.log(res[0].amount);
    let acc = 0
    for (let i=0 ;i<res.length;i++){
        acc+=res[i].amount
    }
    console.log(acc);
    


}

export { getUserXP }