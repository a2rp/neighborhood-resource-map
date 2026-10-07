import {
    FiBookOpen,
    FiCheck,
    FiHeart,
    FiHome,
    FiSearch,
    FiShoppingBag,
    FiSliders,
} from "react-icons/fi";
import {
    neighborhoodOptions,
    resourceCategories,
} from "../../data/resources.js";
import styles from "./styles.module.css";

const categoryIcons = {
    food: FiShoppingBag,
    health: FiHeart,
    learning: FiBookOpen,
    community: FiHome,
};

const ResourceExplorer = ({
    resources,
    totalCount,
    query,
    onQueryChange,
    activeCategory,
    onCategoryChange,
    neighborhood,
    onNeighborhoodChange,
    openOnly,
    onOpenOnlyChange,
    savedOnly,
    onSavedOnlyChange,
    savedIds,
    storageError,
    selectedId,
    onSelect,
    onSave,
    onClear,
    hasFilters,
}) => (
    <aside className={styles.explorer} aria-labelledby="explorer-title">
        <div className={styles.heading}>
            <div>
                <h2 id="explorer-title">Find a place</h2>
                <p>
                    {resources.length} of {totalCount} sample places
                </p>
            </div>
            <FiSliders aria-hidden="true" />
        </div>

        <label className={styles.search}>
            <FiSearch aria-hidden="true" />
            <span className={styles.screenReaderOnly}>
                Search places and services
            </span>
            <input
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search places or services"
            />
        </label>

        <fieldset className={styles.categoryFilters}>
            <legend>Type of place</legend>
            <button
                className={
                    activeCategory === "all"
                        ? styles.categoryActive
                        : styles.category
                }
                type="button"
                aria-pressed={activeCategory === "all"}
                onClick={() => onCategoryChange("all")}
            >
                All places
            </button>
            {resourceCategories.map((category) => {
                const Icon = categoryIcons[category.id];
                const active = activeCategory === category.id;

                return (
                    <button
                        className={
                            active ? styles.categoryActive : styles.category
                        }
                        key={category.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onCategoryChange(category.id)}
                    >
                        <Icon aria-hidden="true" />
                        {category.label}
                    </button>
                );
            })}
        </fieldset>

        <label className={styles.selectLabel}>
            Neighborhood
            <select
                value={neighborhood}
                onChange={(event) => onNeighborhoodChange(event.target.value)}
            >
                {neighborhoodOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>

        <div className={styles.quickFilters}>
            <button
                className={openOnly ? styles.quickActive : styles.quickFilter}
                type="button"
                aria-pressed={openOnly}
                onClick={() => onOpenOnlyChange(!openOnly)}
            >
                <FiCheck aria-hidden="true" />
                Open today
            </button>
            <button
                className={savedOnly ? styles.quickActive : styles.quickFilter}
                type="button"
                aria-pressed={savedOnly}
                onClick={() => onSavedOnlyChange(!savedOnly)}
            >
                <FiHeart aria-hidden="true" />
                Saved
            </button>
        </div>

        {storageError ? (
            <p className={styles.storageWarning} role="status">
                Saved places will reset when this page closes because browser
                storage is unavailable.
            </p>
        ) : null}

        <div className={styles.listHeading}>
            <h3>Nearby places</h3>
            {hasFilters ? (
                <button type="button" onClick={onClear}>
                    Clear
                </button>
            ) : null}
        </div>

        <div className={styles.results} aria-live="polite">
            {resources.length ? (
                resources.map((resource) => {
                    const category = resourceCategories.find(
                        (item) => item.id === resource.category,
                    );
                    const Icon = categoryIcons[resource.category];
                    const saved = savedIds.includes(resource.id);
                    const selected = resource.id === selectedId;

                    return (
                        <article
                            className={
                                selected ? styles.placeSelected : styles.place
                            }
                            key={resource.id}
                        >
                            <button
                                className={styles.placeButton}
                                type="button"
                                aria-current={selected ? "true" : undefined}
                                onClick={() => onSelect(resource.id)}
                            >
                                <span
                                    className={styles.placeIcon}
                                    style={{
                                        "--category-color": category.color,
                                    }}
                                >
                                    <Icon aria-hidden="true" />
                                </span>
                                <span className={styles.placeCopy}>
                                    <strong>{resource.name}</strong>
                                    <span>
                                        {resource.neighborhood} ·{" "}
                                        {resource.distance}
                                    </span>
                                </span>
                            </button>
                            <button
                                className={
                                    saved
                                        ? styles.saveActive
                                        : styles.saveButton
                                }
                                type="button"
                                aria-label={
                                    saved
                                        ? "Remove " +
                                          resource.name +
                                          " from saved places"
                                        : "Save " + resource.name
                                }
                                aria-pressed={saved}
                                onClick={() => onSave(resource.id)}
                            >
                                <FiHeart aria-hidden="true" />
                            </button>
                        </article>
                    );
                })
            ) : (
                <p className={styles.emptyState}>
                    No places match those filters. Try a different search or
                    clear them.
                </p>
            )}
        </div>
    </aside>
);

export default ResourceExplorer;
