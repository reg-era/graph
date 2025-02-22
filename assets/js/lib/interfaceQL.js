const GraphqlQuery = `
{
    infos: user {
        firstName
        lastName
        transactions_aggregate(where:{type:{_eq:"xp"}}){
            aggregate{sum{amount}}
        }
        auditRatio
        attrs(path: "city")
        createdAt
    }

    skills: transaction(
        where: {type: {_regex: "skill*"}}
        order_by: {createdAt: asc}
    ) {
        amount
        type
    }

    projects: transaction(
        order_by: {createdAt: asc}
        where: {type: {_eq: "xp"}, object: {type: {_eq: "project"}}}
    ) {
        amount
        createdAt
        object {
            name
        }
    }

    audits:user {
        fail:audits_aggregate(where: {closureType: {_eq: failed}}){
            aggregate{count}
        }
        pass:audits_aggregate(where: {closureType: {_eq: succeeded}}){
            aggregate{count}
        }
    }
}`

export { GraphqlQuery }