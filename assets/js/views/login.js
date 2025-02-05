import { BASE } from "./base.js";

class LOGIN extends BASE {
    constructor() {
        super()
        super.setTitle('login')
        super.setStyle('assets/style/login.css')
    }

    handleEvents() {
        const submit = document.querySelector('input[type="submit"]')
        submit.addEventListener('click', (e) => {
            submit.disabled = true
            const username = document.querySelector('input[name="username"]')
            const password = document.querySelector('input[name="password"]')

            if (username.value.length > 0 && password.value.length > 0) {
                if (username.value === 'regera' && password.value === '123') {
                    console.log('valid');
                    
                    let date = new Date();
                    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + date.toUTCString();
                
                    document.cookie = "auth=test;" + expires + ";path=/";

                    // location.pushstat
                }
            }
            submit.disabled = false
        })
    }

    getComponent() {
        setTimeout(this.handleEvents, 0)
        return `
        <h1>Login page</h1>
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