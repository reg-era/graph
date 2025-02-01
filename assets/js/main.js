import { route } from "./views/routes.js"
import { setupStyle } from "./lib/style.js"

const main = async () => {
    await route()
    setupStyle()
}

main()