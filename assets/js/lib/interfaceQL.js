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
    transaction(
        order_by: {createdAt: asc}
        where: {type: {_eq: "xp"}, object: {type: {_eq: "project"}}}
    ) {
        amount
        createdAt
        object {
            name
        }
    }
}`

const userProjectAuditRT = `
{
    user {
        audits(where: {closureType: {_in: [failed, succeeded]}}) {
            closureType
        }
    }
}
`

export { userInfos, userSkills, userProjectXP, userProjectAuditRT }