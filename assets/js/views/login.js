import { askForJwt } from "../lib/expo.js";

class LOGIN {
    init() { }

    AfterRendring() {
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

    Rendring() {
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