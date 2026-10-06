import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell}>
        <SiteHeader />
        <main className={styles.pageContent}>
            <section className={styles.intro} id="map">
                <div>
                    <p className={styles.location}>A local guide for Northbank</p>
                    <h1>Find helpful places nearby.</h1>
                    <p className={styles.description}>
                        Food, care, learning, and community support, mapped in one place.
                    </p>
                </div>
            </section>
            <section className={styles.placeholder} id="places">
                <h2>Places around you</h2>
                <p>The neighborhood map is coming together.</p>
            </section>
            <section className={styles.about} id="about">
                <h2>Built for the everyday search.</h2>
                <p>Browse sample listings for Northbank and find the right place to start.</p>
            </section>
        </main>
    </div>
);

export default App;