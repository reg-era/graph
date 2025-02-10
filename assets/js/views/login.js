import { askForJwt } from "../lib/expo.js";

class LOGIN {
    constructor() {
        this.style = 'assets/style/login.css'
    }

    setStyle() {
        document.title = 'login'

        document.head.querySelectorAll('link').forEach((link) => {
            if (link.getAttribute('rel') === 'stylesheet' && link.getAttribute('href') !== this.style) {
                link.remove()
            }
        })

        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', this.style)
        document.head.appendChild(link)
    }

    handleEvents() {
        const submit = document.querySelector('input[type="submit"]')
        submit.addEventListener('click', async (e) => {
            e.preventDefault()
            submit.disabled = true
            const username = document.querySelector('input[name="username"]')
            const password = document.querySelector('input[name="password"]')

            if (username.value.length > 0 && password.value.length > 0) {
                await askForJwt(username.value, password.value)
            }
            submit.disabled = false
        })
    }

    getComponent() {
        setTimeout(this.handleEvents, 0)
        return `
        <div class="login-container">
            <div class="login-box">
                <div class="textbox">
                    <input type="text" placeholder="Username" name="username" required>
                </div>
                <div class="textbox">
                    <input type="password" placeholder="Password" name="password" required>
                </div>
                <input type="submit" value="Login">
            </div>
        </div>
        `
    }
}

export { LOGIN }