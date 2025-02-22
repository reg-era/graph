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
        if (!data) return false
        document.title = '01olympus'
        this.statistics.set("infos", data.infos);
        this.statistics.set("skills", data.skills);
        this.statistics.set("projectXP", data.projects);
        this.statistics.set("auditRT", data.audits);
        return true
    }

    AfterRendring() {
        setupStyle()

        // infos paragraph
        const data = this.statistics.get('infos')
        const parent_div = document.querySelector('.user-infos');
        parent_div.innerHTML = `
        <h1 class="user-title">${data[0].firstName} ${data[0].lastName}</h1>
        <p>
            From the ancient word of <span class="magic-word">${data[0].attrs.toLowerCase()}</span>, a talent whose strength and cunning are unmatched<br>
            I have amassed a fortune of <span class="magic-word">${data[0].transactions_aggregate.aggregate.sum.amount}</span> in XP through battles fought and alliances forged<br>
            My skill in the ways of discipline is reflected in my high audit ratio of <span class="magic-word">${data[0].auditRatio.toFixed(2)}</span><br>
            My legacy began on a fateful day <span class="magic-word">${new Date(data[0].createdAt).toLocaleDateString('en-GB', {day: '2-digit',month: 'long',year: 'numeric'})}</span> when my journey towards glory began
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