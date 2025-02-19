const makeBarGraph = (data) => {
    const parent_div = document.getElementById('project')
    const { width, height } = parent_div.getBoundingClientRect();

    const margin = {
        top: height * 0.05,
        right: width * 0.05,
        bottom: height * 0.4,
        left: width * 0.1
    };

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const maxAmount = Math.max(...data.map(item => item.amount));
    const xScale = data.map((_, i) => i * (width / data.length) * 0.7);
    const widthDiff = (width / data.length);

    const getName = (name) => name.split('-').map(word => word.charAt(0).toUpperCase()).join('');
    data.forEach((item, i) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.classList.add('project-name');
        text.setAttribute('x', xScale[i] + margin.left + (widthDiff * 0.19 * i));
        text.setAttribute('y', height - margin.top - 25);
        text.setAttribute('transform', `rotate(-90, ${xScale[i] + margin.left + (widthDiff * 0.19 * i)}, ${height - margin.top - 25})`);
        text.setAttribute('text-anchor', 'end');
        text.textContent = getName(item.object.name);
        svg.appendChild(text);
    });

    data.forEach((item, i) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${item.amount} PX\n${item.object.name}`;
        rect.appendChild(title);
        rect.setAttribute('cursor', 'crosshair')

        rect.setAttribute('x', xScale[i] + margin.left + (widthDiff * 0.16 * i));
        rect.setAttribute('y', height - margin.bottom - ((item.amount / maxAmount) * (height)) + 125);
        rect.setAttribute('height', ((item.amount / maxAmount) * height));
        rect.setAttribute('width', widthDiff * 0.6);
        rect.setAttribute('fill', 'white');

        svg.appendChild(rect);
    });

    parent_div.innerHTML = `<h3>Projects</h3>`
    const demo = document.createElement('div')
    demo.classList.add('demo')
    demo.innerHTML = `
    <p>XP earned by projects</p>
    `
    parent_div.append(svg, demo)
}

export { makeBarGraph }