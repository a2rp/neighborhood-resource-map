import { useEffect, useState } from "react";
import BackToTop from "./components/backToTop/index.jsx";
import NeighborhoodMap from "./components/neighborhoodMap/index.jsx";
import ResourceDetails from "./components/resourceDetails/index.jsx";
import ResourceExplorer from "./components/resourceExplorer/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { isOpenToday, resources } from "./data/resources.js";
import styles from "./App.module.css";

const getSavedIds = () => {
    try {
        const saved = JSON.parse(window.localStorage.getItem("block-atlas-saved") || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
};

const App = () => {
    const [selectedId, setSelectedId] = useState(resources[0].id);
    const [zoom, setZoom] = useState(100);
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [neighborhood, setNeighborhood] = useState("All neighborhoods");
    const [openOnly, setOpenOnly] = useState(false);
    const [savedOnly, setSavedOnly] = useState(false);
    const [savedIds, setSavedIds] = useState(getSavedIds);

    useEffect(() => {
        try {
            window.localStorage.setItem("block-atlas-saved", JSON.stringify(savedIds));
        } catch {
            return;
        }
    }, [savedIds]);

    const filteredResources = resources.filter((resource) => {
        const searchText = [
            resource.name,
            resource.neighborhood,
            resource.address,
            resource.description,
            resource.category,
            ...resource.services,
        ].join(" ").toLowerCase();
        const matchesQuery = searchText.includes(query.trim().toLowerCase());
        const matchesCategory =
            activeCategory === "all" || resource.category === activeCategory;
        const matchesNeighborhood =
            neighborhood === "All neighborhoods" ||
            resource.neighborhood === neighborhood;
        const matchesOpen = !openOnly || isOpenToday(resource);
        const matchesSaved = !savedOnly || savedIds.includes(resource.id);

        return (
            matchesQuery &&
            matchesCategory &&
            matchesNeighborhood &&
            matchesOpen &&
            matchesSaved
        );
    });

    const activeResource =
        filteredResources.find((resource) => resource.id === selectedId) ||
        filteredResources[0] ||
        null;
    const hasFilters =
        query.trim() !== "" ||
        activeCategory !== "all" ||
        neighborhood !== "All neighborhoods" ||
        openOnly ||
        savedOnly;

    const toggleSaved = (resourceId) => {
        setSavedIds((current) =>
            current.includes(resourceId)
                ? current.filter((id) => id !== resourceId)
                : [...current, resourceId],
        );
    };

    const clearFilters = () => {
        setQuery("");
        setActiveCategory("all");
        setNeighborhood("All neighborhoods");
        setOpenOnly(false);
        setSavedOnly(false);
    };

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

                <section className={styles.workspace} id="map">
                    <div className={styles.explorerSlot}>
                        <ResourceExplorer
                            resources={filteredResources}
                            totalCount={resources.length}
                            query={query}
                            onQueryChange={setQuery}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            neighborhood={neighborhood}
                            onNeighborhoodChange={setNeighborhood}
                            openOnly={openOnly}
                            onOpenOnlyChange={setOpenOnly}
                            savedOnly={savedOnly}
                            onSavedOnlyChange={setSavedOnly}
                            savedIds={savedIds}
                            selectedId={activeResource?.id}
                            onSelect={setSelectedId}
                            onSave={toggleSaved}
                            onClear={clearFilters}
                            hasFilters={hasFilters}
                        />
                    </div>

                    <div className={styles.mapColumn}>
                        <NeighborhoodMap
                            resources={filteredResources}
                            selectedId={activeResource?.id}
                            onSelect={setSelectedId}
                            zoom={zoom}
                            onZoomChange={setZoom}
                        />
                    </div>

                    <ResourceDetails
                        resource={activeResource}
                        saved={activeResource ? savedIds.includes(activeResource.id) : false}
                        openToday={activeResource ? isOpenToday(activeResource) : false}
                        onSave={toggleSaved}
                    />
                </section>

                <section className={styles.about} id="about">
                    <h2>Built for the everyday search.</h2>
                    <p>
                        Explore sample services in Northbank. Check details with each provider before visiting.
                    </p>
                </section>
            </main>
            <SiteFooter />
            <BackToTop />
        </div>
    );
};

export default App;