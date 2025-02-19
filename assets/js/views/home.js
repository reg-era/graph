import { fetchData } from "../lib/expo.js"
import { GraphqlQuery } from "../lib/interfaceQL.js"
import { setupStyle } from "../lib/style.js";
import { makeBarGraph } from "../utils/barGraph.js";
import { makeCercleGraph } from "../utils/cercleGraph.js";
import { makeRadarGraph } from "../utils/radarGraph.js";

class HOME {
    constructor() {
        this.statistics = new Map();
    }

    async init() {
        const data = await fetchData(GraphqlQuery)
        this.statistics.set("infos", data.infos);
        this.statistics.set("skills", data.skills);
        this.statistics.set("projectXP", data.projects);
        this.statistics.set("auditRT", data.audits);
    }

    AfterRendring() {
        setupStyle()

        // infos paragraph
        const data = this.statistics.get('infos')
        const parent_div = document.querySelector('.user-infos');
        parent_div.innerHTML = `
        <h1 class="user-title">${data[0].firstName} ${data[0].lastName}</h1>
        <p>
            Hello, I am a talent from ${data[0].attrs}. fdsdudbjdkjnj 
        </p>`;

        // bar graph
        makeBarGraph(this.statistics.get('projectXP'))

        // cercle graph
        const res = this.statistics.get('auditRT')
        const pass = res[0].pass.aggregate.count
        const fail = res[0].fail.aggregate.count
        makeCercleGraph({
            passRatio: pass / (pass + fail),
            failRatio: fail / (pass + fail),
        })

        // radar graph
        const rad = this.statistics.get('skills')
        const skills = new Map()
        for (let i = 0; i < rad.length; i++) {
            skills.set(rad[i].type, rad[i].amount);
        }
        const radarData = Array.from(skills).map(([name, value]) => ({
            name,
            value
        }));
        makeRadarGraph(radarData);
    }

    async Rendring() {
        return `
        <div class="log-out"></div>
        <section class="parallax">
            <img src="assets/img/cloud.png" class="cloud-left" alt="Cloud">
            <img src="assets/img/cloud.png" class="cloud-right" alt="Cloud">
            <div class="user-infos">
                <p>loading ...</p>
            </div>
        </section>

        <section class="stats-section">
            <div id="skills" class="stat-card">
                <h3>Skills</h3>
                <p>loading ...</p>
            </div>
            <div id="project" class="stat-card">
                <h3>Projects</h3>
                <p>loading ...</p>
            </div>
            <div id="audit" class="stat-card">
                <h3>Audits</h3>
                <p>loading ...</p>
            </div>
        </section>`;
    }
}

export { HOME }