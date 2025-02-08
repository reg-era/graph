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
        const res = await fetchData(query,"user");
        return `
        <h1 class="hero-title">${res.firstName} ${res.lastName}</h1>
        <p>
            Hello, I am a talent from ${res.attrs}.
            I joined Zone01 on ${new Date(res.createdAt).toLocaleDateString()}, 
            and have since been contributing to exciting projects within the community. 
            I am currently working from the ${res.campus} campus, 
            where I continue to hone my skills and collaborate with other passionate talents. 
            Welcome to my portfolio!
        </p>
        `;
    }

    async getUserSkills(query) {
    }

    async getUserProjectXP(query) {
        try {
            const res = await fetchData(query, 'transaction')
            const parent_div = document.getElementById('project')
            const { width, height } = parent_div.getBoundingClientRect();

            const margin = {
                top: height * 0.05,
                right: width * 0.05,
                bottom: height * 0.6,
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
                text.textContent = item.object.name;
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
            console.error('On geting skills', err);
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
            passPath.classList.add('circle-fail')

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
            console.error('On geting skills', err);
        }
    }


    //<div class="stat-card">
    //<h3>Skills</h3>
    //${await this.statistics.get("Skills")()}
    //</div>

    async getComponent(query) {
        return `    
        <section class="parallax-hero">
            <div class="parallax-bg"></div>
            <img src="assets/img/cloud.png" class="cloud-left" alt="Cloud">
            <img src="assets/img/cloud.png" class="cloud-right" alt="Cloud">
            <div class="hero-content">
                ${await this.statistics.get("Infos")()}
            </div>
        </section>

        <section class="stats-section">
            <div class="container">
                <h2 class="section-title">STATISTICS</h2>
                <div class="stats-grid">
                    <div id="project" class="stat-card">
                        <h3>Projects</h3>
                        <p>loading ...</p>
                        ${setTimeout(async () => await this.statistics.get("ProjectXP")(), 0)}
                    </div>
                    <div id="audit" class="stat-card">
                        <h3>Audits</h3>
                        ${setTimeout(async () => await await this.statistics.get("ProjectAuditRT")(), 0)}
                    </div>
                </div>
            </div>
        </section>`;
    }
}

export { HOME }