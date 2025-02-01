import { BASE } from "./base.js"
import { fetchData } from "../lib/expo.js"
import { userInfos, userSkills, userProjectXP, userAuditRT } from "../lib/interfaceQL.js"

class HOME extends BASE {
    constructor() {
        super();
        super.setTitle('home');
        super.setStyle('assets/style/home.css');

        this.statistics = new Map();

        this.statistics.set("Infos", () => this.getUserInformations(userInfos));
        this.statistics.set("Skills", () => this.getUserSkills(userSkills));
        this.statistics.set("ProjectXP", () => this.getUserProjectXP(userProjectXP));
        this.statistics.set("AuditRT", () => this.getUserAuditRT(userAuditRT));
    }

    async getUserInformations(query) {
        const res = await fetchData(query);
        return `
        <h1 class="hero-title">${res.data.user[0].firstName} ${res.data.user[0].lastName}</h1>
        <p>
            Hello, I am a talent from ${res.data.user[0].attrs}.
            I joined Zone01 on ${new Date(res.data.user[0].createdAt).toLocaleDateString()}, 
            and have since been contributing to exciting projects within the community. 
            I am currently working from the ${res.data.user[0].campus} campus, 
            where I continue to hone my skills and collaborate with other passionate talents. 
            Welcome to my portfolio!
        </p>
        `;
    }

    async getUserSkills(query) {
        return `
        <div class="graph"></div>`
    }

    async getUserProjectXP(query) {
        return `
        <div class="graph"></div>`
    }

    async getUserAuditRT(query) {
        return `
        <div class="graph"></div>`
    }

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
                    <div class="stat-card">
                        <h3>Projects</h3>
                        ${await this.statistics.get("ProjectXP")()}
                    </div>
                    <div class="stat-card">
                        <h3>Skills</h3>
                        ${await this.statistics.get("Skills")()}
                    </div>
                    <div class="stat-card">
                        <h3>Audits</h3>
                        ${await this.statistics.get("AuditRT")()}
                    </div>
                </div>
            </div>
        </section>`;
    }
}

export { HOME }