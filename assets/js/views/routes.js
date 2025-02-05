import { getCookie } from "../lib/expo.js"
import { HOME } from "./home.js"
import { LOGIN } from "./login.js"

const route = async () => {
    const routes = [
        { path: "/login", view: LOGIN },
        { path: "/", view: HOME }
    ]

    const author = getCookie('auth')

    let page;
    if (author === null) {
        page = routes[0]
    } else {
        page = routes.find((elem) => elem.path === location.pathname)
    }

    if (!page.view) {
        error.log("page not fount");
        return
    }

    const view = new page.view
    const app = document.querySelector('.app')
    app.innerHTML = await view.getComponent()
}

export { route }