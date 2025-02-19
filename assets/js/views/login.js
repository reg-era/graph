import { askForJwt } from "../lib/expo.js";
import { main } from "../main.js";

class LOGIN {
    init() { }

    AfterRendring() {
        const submitionEvent = async (e) => {
            e.preventDefault()
            submit.disabled = true
            const username = document.querySelector('input[name="username"]')
            const password = document.querySelector('input[name="password"]')

            if (username.value.length > 0 && password.value.length > 0) {
                const res = await askForJwt(username.value, password.value)
                const error = document.querySelector('.error-msj')

                if (res == 200) {
                    console.log('moomomommomo');
                    main()
                } else if (res == 404) {
                    error.innerHTML = `Oops! We couldn't find the talent.`
                } else {
                    error.innerHTML = `Oops! Something went wrong. Please try again later.`
                }
            }
            submit.disabled = false
        }

        const submit = document.querySelector('input[type="submit"]')
        submit.addEventListener('click', submitionEvent)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                submitionEvent(e)
            }
        });

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
                <p class="error-msj"></p>
            </div>
        </div>`
    }
}

export { LOGIN }