import { main } from "../main.js"

const setupStyle = () => {
    const logout = document.querySelector('.log-out')
    logout.addEventListener('click', (e) => {
        document.cookie = 'credential=; path=/'
        main()
    })

    const statCards = document.querySelectorAll('.stat-card');
    const leftButton = document.querySelector('.nav-button.left');
    const rightButton = document.querySelector('.nav-button.right');

    let currentIndex = 0;

    const updateSlide = () => {
        statCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active')
                card.classList.remove('inactive')
            } else {
                card.classList.add('inactive')
                card.classList.remove('active')
            }
        });
    };

    leftButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? statCards.length - 1 : currentIndex - 1;
        console.log(currentIndex);
        updateSlide();
    });

    rightButton.addEventListener('click', () => {
        currentIndex = (currentIndex === statCards.length - 1) ? 0 : currentIndex + 1;
        console.log(currentIndex);
        updateSlide();
    });

    updateSlide();

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