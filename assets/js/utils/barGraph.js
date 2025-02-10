const makeBarGraph = (data) => {
    const parent_div = document.getElementById('project')
    const { width, height } = parent_div.getBoundingClientRect();

    const getName = (name) => name.split('-').map(word => word.charAt(0).toUpperCase()).join('');

    const margin = {
        top: height * 0.05,
        right: width * 0.05,
        bottom: height * 0.4,
        left: width * 0.1
    };

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    const maxAmount = Math.max(...data.map(item => item.amount));

    const xScale = data.map((_, i) => i * (width / (data.length * 2)));
    const start = xScale[xScale.length - 1] / 2

    data.forEach((item, i) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.classList.add('project-name');
        text.setAttribute('x', xScale[i] + start);
        text.setAttribute('y', height - margin.bottom + 15);
        text.setAttribute('transform', `rotate(-90, ${xScale[i] + start}, ${height - margin.bottom + 10})`);
        text.setAttribute('text-anchor', 'end');
        text.textContent = getName(item.object.name);
        svg.appendChild(text);
    });

    data.forEach((item, i) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.classList.add('project-rect')

        rect.setAttribute('x', xScale[i] + start);
        rect.setAttribute('y', height - margin.bottom - (item.amount / maxAmount * (height - margin.top - margin.bottom)));
        rect.setAttribute('height', item.amount / maxAmount * (height - margin.top - margin.bottom));
        rect.setAttribute('width', (margin.left - margin.right) * 0.2)
        svg.appendChild(rect);
    });

    parent_div.innerHTML = `<h3>Projects</h3>`
    parent_div.appendChild(svg)
}

export { makeBarGraph }