import { checkAuthorization } from "./lib/expo.js"
import { HOME } from "./views/home.js"
import { LOGIN } from "./views/login.js"

export const main = async () => {
    const routes = [LOGIN, HOME]

    const author = await checkAuthorization()
    const page = author ? routes[1] : routes[0];

    const app = document.querySelector('.app')
    const view = new page

    const err = await view.init()
    if (!err) {
        app.innerHTML = '<h1>something bad happen try later</h1>'
        return
    }
    app.innerHTML = await view.Rendring()
    view.AfterRendring()
}