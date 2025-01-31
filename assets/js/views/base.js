class BASE {
    setStyle(styleLink) {
        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', styleLink)
        document.head.appendChild(link)
    }

    setTitle(title) {
        document.title = title
    }
}

export { BASE }