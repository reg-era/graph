import { HOME } from "./home.js"
import { LOGIN } from "./login.js"

const route = async () => {
    const routes = [
        { path: "/", view: HOME },
        { path: "/login", view: LOGIN }
    ]

    const page = routes.find((elem) => elem.path === location.pathname)

    if (!page.view) {
        error.log("page not fount");
        return
    }

    const view = new page.view
    const app = document.querySelector('.app')
    app.innerHTML = await view.getComponent()
}

export { route }