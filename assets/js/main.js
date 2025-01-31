import { route } from "./views/routes.js"
import { setupStyle } from "./lib/style.js"
import { getUserXP } from "./lib/interfaceQL.js"

const main = async () => {
    route()
    setupStyle()
    const res = await getUserXP()
    console.log(res);
    
}

main()