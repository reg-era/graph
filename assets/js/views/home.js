import { BASE } from "./base.js"

class HOME extends BASE {
    constructor() {
        super()
        super.setTitle('home')
        super.setStyle('assets/style/home.css')
    }
    
    getComponent() {
        return `    
        <section class="parallax-hero">
            <div class="parallax-bg"></div>
            <img src="assets/img/cloud.png" class="cloud-left" alt="Cloud">
            <img src="assets/img/cloud.png" class="cloud-right" alt="Cloud">
        
            <div class="hero-content">
                <h1 class="hero-title">GOD OF WAR</h1>
                <p>Journey Through the Nine Realms</p>
            </div>
        
        </section>
        
        <section class="stats-section">
            <div class="container">
                <h2 class="section-title">COMBAT STATISTICS</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Weapon Mastery</h3>
                        <div class="stat-value">87%</div>
                        <p>Proficiency with the Leviathan Axe</p>
                    </div>
                    <div class="stat-card">
                        <h3>Defense Rating</h3>
                        <div class="stat-value">92%</div>
                        <p>Guardian Shield Efficiency</p>
                    </div>
                    <div class="stat-card">
                        <h3>Runic Power</h3>
                        <div class="stat-value">95%</div>
                        <p>Magical Abilities Strength</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="realm-section">
            <div class="container">
                <h2 class="section-title">THE NINE REALMS</h2>
                <div class="realm-grid">
                    <div class="realm-card">
                        <h3>Midgard</h3>
                        <p>The realm of humans, where Kratos and Atreus begin their journey.</p>
                    </div>
                    <div class="realm-card">
                        <h3>Alfheim</h3>
                        <p>Home of the Light Elves, bathed in the light of the Bifröst.</p>
                    </div>
                </div>
            </div>
        </section>`
    }
}

export { HOME }