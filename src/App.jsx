import { useState } from "react";
import NeighborhoodMap from "./components/neighborhoodMap/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { resources } from "./data/resources.js";
import styles from "./App.module.css";

const App = () => {
    const [selectedId, setSelectedId] = useState(resources[0].id);
    const [zoom, setZoom] = useState(100);
    const selectedResource = resources.find((resource) => resource.id === selectedId);

    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.pageContent}>
                <section className={styles.intro}>
                    <div>
                        <p className={styles.location}>A local guide for Northbank</p>
                        <h1>Find helpful places nearby.</h1>
                        <p className={styles.description}>
                            Food, care, learning, and community support, mapped in one place.
                        </p>
                    </div>
                    <p className={styles.sampleNote}>Example listings for a fictional district</p>
                </section>

                <section className={styles.mapSection} id="map">
                    <NeighborhoodMap
                        resources={resources}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        zoom={zoom}
                        onZoomChange={setZoom}
                    />
                </section>

                <section className={styles.placeholder} id="places" aria-live="polite">
                    <h2>{selectedResource.name}</h2>
                    <p>
                        {selectedResource.category} in {selectedResource.neighborhood}
                        <span> - {selectedResource.address}</span>
                    </p>
                </section>

                <section className={styles.about} id="about">
                    <h2>Built for the everyday search.</h2>
                    <p>
                        Explore sample services in Northbank. Check details with each provider before visiting.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default App;