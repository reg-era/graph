import { setupStyle } from "./lib/style.js"
import { checkCookie } from "./lib/expo.js"
import { HOME } from "./views/home.js"
import { LOGIN } from "./views/login.js"

export const main = async () => {
    const routes = [LOGIN, HOME]

    const author = await checkCookie()
    const page = author ? routes[1] : routes[0];
    console.log(author,page.name);

    const app = document.querySelector('.app')
    const view = new page
    app.innerHTML = await view.getComponent()

    setupStyle()
}