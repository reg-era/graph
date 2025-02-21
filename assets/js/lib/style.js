import { main } from "../main.js"

const setupStyle = () => {
    const logout = document.querySelector('.log-out')
    logout.addEventListener('click', (e) => {
        localStorage.removeItem('jwt')
        main()
    })

    const cloudLeft = document.querySelector('.cloud-left');
    const cloudRight = document.querySelector('.cloud-right');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        cloudLeft.style.transform = `translateX(${scrolled * 0.8}px)`;
        cloudRight.style.transform = `translateX(${-scrolled * 0.8}px)`;

        const opacity = Math.max(0, 1 - (scrolled * 0.003));
        cloudLeft.style.opacity = opacity;
        cloudRight.style.opacity = opacity;
    });
}

export { setupStyle }