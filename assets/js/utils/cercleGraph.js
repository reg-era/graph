const makeCercleGraph = (data) => {
    const parent_div = document.getElementById('audit');
    const { width, height } = parent_div.getBoundingClientRect();

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);


    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;

    const passAngle = data.passRatio * 2 * Math.PI;
    const failAngle = data.failRatio * 2 * Math.PI;

    const passPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    passPath.classList.add('circle-pass')
    const passX = centerX + radius * Math.cos(passAngle);
    const passY = centerY + radius * Math.sin(passAngle);
    const passLargeArc = passAngle > Math.PI ? 1 : 0;

    passPath.setAttribute('d', `
        M ${centerX} ${centerY}
        L ${centerX + radius} ${centerY}
        A ${radius} ${radius} 0 ${passLargeArc} 1 ${passX} ${passY}
        Z
    `);
    svg.appendChild(passPath);

    const failPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    failPath.classList.add('circle-fail')

    const failEndX = centerX + radius * Math.cos(2 * Math.PI);
    const failEndY = centerY + radius * Math.sin(2 * Math.PI);
    const failLargeArc = failAngle > Math.PI ? 1 : 0;

    failPath.setAttribute('d', `
        M ${centerX} ${centerY}
        L ${passX} ${passY}
        A ${radius} ${radius} 0 ${failLargeArc} 1 ${failEndX} ${failEndY}
        Z
    `);
    svg.appendChild(failPath);

    parent_div.innerHTML = `<h3>Audits</h3>`
    parent_div.appendChild(svg)
}

export { makeCercleGraph }