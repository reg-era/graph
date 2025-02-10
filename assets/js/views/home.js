import { fetchData } from "../lib/expo.js"
import { userInfos, userSkills, userProjectXP, userProjectAuditRT } from "../lib/interfaceQL.js"
import { makeBarGraph } from "../utils/barGraph.js";
import { makeCercleGraph } from "../utils/cercleGraph.js";
import { makeRadarGraph } from "../utils/graph.js";

class HOME {
    constructor() {
        this.style = 'assets/style/home.css'
        this.statistics = new Map();

        this.statistics.set("Infos", () => this.getUserInformations(userInfos));
        this.statistics.set("Skills", () => this.getUserSkills(userSkills));
        this.statistics.set("ProjectXP", () => this.getUserProjectXP(userProjectXP));
        this.statistics.set("ProjectAuditRT", () => this.getUserProjectAuditRT(userProjectAuditRT));
    }

    setStyle() {
        document.title = 'home'

        document.head.querySelectorAll('link').forEach((link) => {
            if (link.getAttribute('rel') === 'stylesheet' && link.getAttribute('href') !== this.style) {
                link.remove()
            }
        })

        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', this.style)
        document.head.appendChild(link)
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

            const radarData = Array.from(skills).map(([name, value]) => ({
                name,
                value
            }));

            makeRadarGraph(radarData);
        } catch (err) {
            console.error('On getting skills', err);
        }
    }

    async getUserProjectXP(query) {
        try {
            const res = await fetchData(query, 'transaction')
            makeBarGraph(res)
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

            makeCercleGraph({
                passRatio: pass / (pass + fail),
                failRatio: fail / (pass + fail),
            })
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