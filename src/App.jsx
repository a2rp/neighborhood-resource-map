import styles from "./App.module.css";

const App = () => (
    <main className={styles.appShell}>
        <div className={styles.placeholder}>
            <p>Block Atlas</p>
            <h1>Find helpful places nearby.</h1>
            <p>Local resources, brought together in one map.</p>
        </div>
    </main>
);

export default App;