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
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);


    const maxAmount = Math.max(...data.map(item => item.amount));

    const xScale = data.map((_, i) => i * (width / data.length) * 0.7);
    console.log(xScale);


    // data.forEach((item, i) => {
    // const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text.classList.add('project-name');
    // text.setAttribute('x', xScale[i] + start);
    // text.setAttribute('y', height - margin.bottom + 15);
    // text.setAttribute('transform', `rotate(-90, ${xScale[i] + start}, ${height - margin.bottom + 10})`);
    // text.setAttribute('text-anchor', 'end');
    // text.textContent = getName(item.object.name);
    // svg.appendChild(text);
    // });


    const widthDiff = (width / data.length)
    console.log(widthDiff);

    data.forEach((item, i) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${item.amount} PX`;
        rect.appendChild(title);

        rect.setAttribute('x', xScale[i] + margin.left);

        rect.setAttribute('y', height - margin.bottom - (item.amount / maxAmount * (height - margin.top - margin.bottom)));
        rect.setAttribute('height', (item.amount / maxAmount) * 120);

        rect.setAttribute('width', widthDiff * 0.7)
        rect.setAttribute('fill', 'white')
        svg.appendChild(rect);
    });

    const difrenceX = (margin.bottom - margin.top) / 10
    for (let i = 1; i <= 10; i++) {
        const lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${i * 10} PX`;
        lineX.appendChild(title);

        lineX.setAttribute('x1', margin.left);
        lineX.setAttribute('y1', (margin.top + difrenceX) * i);
        lineX.setAttribute('x2', width - margin.right);
        lineX.setAttribute('y2', (margin.top + difrenceX) * i);
        lineX.setAttribute('stroke', 'white')
        lineX.setAttribute('stroke-width', '1')
        svg.appendChild(lineX);
    }

    parent_div.innerHTML = `<h3>Projects</h3>`
    parent_div.appendChild(svg)
}

export { makeBarGraph }