const getProjectXP = `
{
    transaction(where: {type: {_eq: "xp"}, object: {type: {_eq: "project"}}}) {
        amount
        createdAt
        object {
            name
        }
    }
}`


export { getProjectXP }