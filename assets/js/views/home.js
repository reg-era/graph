import { BASE } from "./base.js"
import { fetchData } from "../lib/expo.js"
import { userInfos, userSkills, userProjectXP, userProjectAuditRT } from "../lib/interfaceQL.js"

class HOME extends BASE {
    constructor() {
        super();
        super.setTitle('home');
        super.setStyle('assets/style/home.css');

        this.statistics = new Map();

        this.statistics.set("Infos", () => this.getUserInformations(userInfos));
        this.statistics.set("Skills", () => this.getUserSkills(userSkills));
        this.statistics.set("ProjectXP", () => this.getUserProjectXP(userProjectXP));
        this.statistics.set("ProjectAuditRT", () => this.getUserProjectAuditRT(userProjectAuditRT));
    }

    async getUserInformations(query) {
        const res = await fetchData(query, "user");
        const parent_div = document.querySelector('.hero-content');
        parent_div.innerHTML = `
        <h1 class="hero-title">${res[0].firstName} ${res[0].lastName}</h1>
        <p>
            Hello, I am a talent from ${res[0].attrs}.
            I joined Zone01 on ${new Date(res[0].createdAt).toLocaleDateString()}, 
            and have since been contributing to exciting projects within the community. 
            I am currently working from the ${res[0].campus} campus, 
            where I continue to hone my skills and collaborate with other passionate talents. 
            Welcome to my portfolio!
        </p>`;
    }

    async getUserSkills(query) {
        try {
            const res = await fetchData(query, 'transaction');
            const skills = new Map();
            for (let i = 0; i < res.length; i++) {
                skills.set(res[i].type, res[i].amount);
            }
            // Convert Map to radar chart data format
            const radarData = Array.from(skills).map(([name, value]) => ({
                name,
                value
            }));

            const parent_div = document.getElementById('skills');
            const { width, height } = parent_div.getBoundingClientRect();
            const margin = {
                top: height * 0.05,
                right: width * 0.05,
                bottom: height * 0.6,
                left: width * 0.1
            };

            // Create SVG container
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);
            // svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

            // Radar chart logic
            const center = { x: width / 2, y: height / 2 };
            const maxRadius = Math.min(width, height) * 0.25;
            const numSkills = radarData.length;
            const angleStep = (2 * Math.PI) / numSkills;

            // Create web lines (circles)
            [20, 40, 60, 80, 100].forEach(percentage => {
                const radius = (maxRadius * percentage) / 100;
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', center.x);
                circle.setAttribute('cy', center.y);
                circle.setAttribute('r', radius);
                circle.setAttribute('fill', 'none');
                circle.setAttribute('stroke', 'var(--color-text-primary)');
                circle.setAttribute('stroke-width', '1');
                svg.appendChild(circle);
            });

            // Create spokes (lines from center to edge)
            radarData.forEach((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const x2 = center.x + Math.cos(angle) * maxRadius;
                const y2 = center.y + Math.sin(angle) * maxRadius;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', center.x);
                line.setAttribute('y1', center.y);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', 'var(--color-text-primary)');
                line.setAttribute('stroke-width', '1');
                svg.appendChild(line);
            });

            // Create skill points and shape
            const skillPoints = radarData.map((skill, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const radius = (maxRadius * skill.value) / 100;
                const x = center.x + Math.cos(angle) * radius;
                const y = center.y + Math.sin(angle) * radius;
                return { x, y, ...skill };
            });

            // Create the skill shape path
            const skillPath = skillPoints.reduce((path, point, i) => {
                return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
            }, "") + " Z";

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', skillPath);
            path.setAttribute('fill', 'var(--color-text-secondary)');
            path.setAttribute('stroke', 'var(--color-text-primary)');
            path.setAttribute('stroke-width', '2');
            svg.appendChild(path);

            // Add skill points
            skillPoints.forEach((point, i) => {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', point.x);
                circle.setAttribute('cy', point.y);
                circle.setAttribute('r', '4');
                circle.setAttribute('fill', 'var(--color-text-primary)');
                svg.appendChild(circle);
            });

            // Add labels
            skillPoints.forEach((point, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const labelRadius = maxRadius + 25;
                const x = center.x + Math.cos(angle) * labelRadius;
                const y = center.y + Math.sin(angle) * labelRadius;
                const textAnchor =
                    angle < -Math.PI / 2 || angle > Math.PI / 2 ? "end" :
                        angle === -Math.PI / 2 || angle === Math.PI / 2 ? "middle" : "start";

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', x);
                text.setAttribute('y', y);
                text.setAttribute('text-anchor', textAnchor);
                text.setAttribute('fill', 'currentColor');
                text.setAttribute('class', 'text-xs font-medium');
                text.textContent = point.name;
                svg.appendChild(text);
            });

            // Append SVG to parent div
            parent_div.innerHTML = `<h3>Skills</h3>`;
            parent_div.appendChild(svg);
        } catch (err) {
            console.error('On getting skills', err);
        }
    }

    async getUserProjectXP(query) {
        try {
            const res = await fetchData(query, 'transaction')
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

            const maxAmount = Math.max(...res.map(item => item.amount));

            const xScale = res.map((_, i) => i * (width / (res.length * 2)));
            const start = xScale[xScale.length - 1] / 2

            res.forEach((item, i) => {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.classList.add('project-name');
                text.setAttribute('x', xScale[i] + start);
                text.setAttribute('y', height - margin.bottom + 15);
                text.setAttribute('transform', `rotate(-90, ${xScale[i] + start}, ${height - margin.bottom + 10})`);
                text.setAttribute('text-anchor', 'end');
                text.textContent = getName(item.object.name);
                svg.appendChild(text);
            });

            res.forEach((item, i) => {
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
        } catch (err) {
            console.error('On geting Projects', err);
        }
    }

    async getUserProjectAuditRT(query) {
        try {
            const res = await fetchData(query, 'user.audits')

            let pass = 0, fail = 0
            for (let i = 0; i < res.length; i++) {
                (res[i]['closureType'] === 'succeeded') ? pass++ : fail++
            }

            const passRatio = pass / (pass + fail);
            const failRatio = fail / (pass + fail);

            const parent_div = document.getElementById('audit');
            const { width, height } = parent_div.getBoundingClientRect();

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);

            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 4;

            const passAngle = passRatio * 2 * Math.PI;
            const failAngle = failRatio * 2 * Math.PI;

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
        } catch (err) {
            console.error('On geting Audits', err);
        }
    }

    async getComponent() {
        return `
        <div class="log-out"></div>
        <section class="parallax-hero">
            <img src="assets/img/cloud.png" class="cloud-left" alt="Cloud">
            <img src="assets/img/cloud.png" class="cloud-right" alt="Cloud">
            <div class="hero-content">
                <p>loading ...</p>
                ${setTimeout(async () => await this.statistics.get("Infos")(), 0)}
            </div>
        </section>

        <section class="stats-section">
            <div class="stats-container">
                <div class="stats-grid">
                    <div id="skills" class="stat-card">
                        <h3>Skills</h3>
                        <p>loading ...</p>
                        ${setTimeout(async () => await this.statistics.get("Skills")(), 0)}
                    </div>
                    <div id="project" class="stat-card">
                        <h3>Projects</h3>
                        <p>loading ...</p>
                        ${setTimeout(async () => await this.statistics.get("ProjectXP")(), 0)}
                    </div>
                    <div id="audit" class="stat-card">
                        <h3>Audits</h3>
                        <p>loading ...</p>
                        ${setTimeout(async () => await this.statistics.get("ProjectAuditRT")(), 0)}
                    </div>
                </div>
            </div>
            <button class="nav-button left"><</button>
            <button class="nav-button right">></button>
        </section>`;
    }
}

export { HOME }