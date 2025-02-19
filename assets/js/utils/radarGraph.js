const makeRadarGraph = (data) => {
    const parent_div = document.getElementById('skills');
    const { width, height } = parent_div.getBoundingClientRect();

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const center = { x: width / 2, y: height / 2 };
    const maxRadius = Math.min(width, height) * 0.4;
    const angleStep = (2 * Math.PI) / data.length;

    [20, 40, 60, 80, 100].forEach(percentage => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', center.x);
        circle.setAttribute('cy', center.y);
        circle.setAttribute('r', (maxRadius * percentage) / 100);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', 'var(--color-text-primary)');
        circle.setAttribute('stroke-width', '1');
        svg.appendChild(circle);
    });

    data.forEach((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        console.log(angle);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', center.x);
        line.setAttribute('y1', center.y);
        line.setAttribute('x2', center.x + Math.cos(angle) * maxRadius);
        line.setAttribute('y2', center.y + Math.sin(angle) * maxRadius);
        line.setAttribute('stroke', 'var(--color-text-primary)');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    });

    const skillPoints = data.map((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const radius = (maxRadius * skill.value) / 100;
        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + Math.sin(angle) * radius;
        return { x, y, ...skill };
    });

    const skillPath = skillPoints.reduce((path, point, i) => {
        return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
    }, "") + " Z";

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', skillPath);
    path.setAttribute('fill', 'var(--color-text-secondary)');
    path.setAttribute('stroke', 'var(--color-text-primary)');
    path.setAttribute('stroke-width', '2');
    svg.appendChild(path);

    skillPoints.forEach((point, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${point.name}\n${point.value}%`;
        circle.appendChild(title);

        circle.setAttribute('cursor', 'crosshair')
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', 'var(--color-text-primary)');
        svg.appendChild(circle);
    });

    skillPoints.forEach((point, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = maxRadius + 25;
        const x = center.x + Math.cos(angle) * labelRadius;
        const y = center.y + Math.sin(angle) * labelRadius;
        const textAnchor =
            (angle > Math.PI / 2) ? "end" :
                Math.abs(angle) === Math.PI / 2 ? "middle" : "start";

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', textAnchor);
        text.setAttribute('fill', 'currentColor');
        text.textContent = point.name.replace('skill_', '');
        svg.appendChild(text);
    });

    parent_div.innerHTML = `<h3>Skills</h3>`;
    const demo = document.createElement('div')
    demo.classList.add('demo')
    demo.innerHTML = `
    <p>Skills gained</p>
    `
    parent_div.append(svg, demo)
}

export { makeRadarGraph }