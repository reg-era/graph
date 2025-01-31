import { BASE } from "./base.js";

class LOGIN extends BASE {
    constructor() {
        super()
        super.setTitle('login')
        super.setStyle('assets/style/login.css')
    }

    getComponent() {
        return `<h1>Login page</h1>`
    }
}

export { LOGIN }