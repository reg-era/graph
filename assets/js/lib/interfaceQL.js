const userInfos = `
{
    user {
        firstName
        lastName
        attrs(path: "city")
        createdAt
    }
}`

const userSkills = ``

const userProjectXP = `
{
    transaction(where: {type: {_eq: "xp"}, object: {type: {_eq: "project"}}}) {
        amount
        createdAt
        object {
            name
        }
    }
}`

const userAuditRT = ``

export { userInfos, userSkills, userProjectXP, userAuditRT }