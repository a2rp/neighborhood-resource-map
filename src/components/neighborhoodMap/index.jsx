import {
    FiBookOpen,
    FiHeart,
    FiHome,
    FiMapPin,
    FiMinus,
    FiPlus,
    FiShoppingBag,
} from "react-icons/fi";
import { resourceCategories } from "../../data/resources.js";
import styles from "./styles.module.css";

const categoryIcons = {
    food: FiShoppingBag,
    health: FiHeart,
    learning: FiBookOpen,
    community: FiHome,
};

const NeighborhoodMap = ({
    resources,
    selectedId,
    onSelect,
    zoom,
    onZoomChange,
}) => (
    <section className={styles.mapPanel} aria-labelledby="map-title">
        <div className={styles.mapHeader}>
            <div>
                <h2 id="map-title">Resource map</h2>
                <p>Northbank district guide</p>
            </div>
            <span className={styles.mapNote}>Illustrative sample map</span>
        </div>

        <div className={styles.mapCanvas} role="group" aria-label="Map of Northbank with selectable community resource markers">
            <div
                className={styles.mapArtwork}
                style={{ "--map-zoom": zoom / 100 }}
            >
                <svg
                    className={styles.mapDrawing}
                    viewBox="0 0 1000 620"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <rect width="1000" height="620" fill="#e9eadc" />
                    <path
                        d="M0 56 235 22 327 111 281 221 53 246 0 194Z"
                        fill="#d5dfca"
                    />
                    <path
                        d="M595 0 788 0 749 150 600 174 548 98Z"
                        fill="#dfe3d2"
                    />
                    <path
                        d="M0 423 218 380 324 489 277 620 0 620Z"
                        fill="#d6dfca"
                    />
                    <path
                        d="M670 410 900 372 1000 443 1000 620 756 620 676 533Z"
                        fill="#d5dfca"
                    />
                    <path
                        d="M861 -20c-38 117-17 178-48 257-34 87-17 146-69 225-34 52-31 108-56 178h180c35-90 45-152 80-229 44-98 15-173 50-256 34-81 27-126 56-175Z"
                        fill="#b5ceca"
                    />
                    <g fill="none" stroke="#d4d8c9" strokeWidth="48">
                        <path d="M-40 318 744 318" />
                        <path d="M320 -40 346 670" />
                        <path d="M55 96 787 504" />
                        <path d="M80 555 810 104" />
                    </g>
                    <g fill="none" stroke="#fffdf6" strokeWidth="37">
                        <path d="M-40 318 744 318" />
                        <path d="M320 -40 346 670" />
                        <path d="M55 96 787 504" />
                        <path d="M80 555 810 104" />
                    </g>
                    <g fill="none" stroke="#f7f4e9" strokeWidth="20">
                        <path d="M-20 168 766 168" />
                        <path d="M-10 475 780 475" />
                        <path d="M140 -20 155 650" />
                        <path d="M525 -20 544 650" />
                        <path d="M720 -20 738 650" />
                        <path d="M20 40 654 594" />
                        <path d="M54 593 760 50" />
                    </g>
                    <g fill="#87958a" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">
                        <text x="80" y="303">MARKET STREET</text>
                        <text x="575" y="153">LIBRARY LANE</text>
                        <text x="410" y="467">CEDAR AVENUE</text>
                        <text x="822" y="341" transform="rotate(-72 822 341)">RIVER WALK</text>
                    </g>
                    <g fill="#718276" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700" letterSpacing="3">
                        <text x="77" y="82">RIVER WARD</text>
                        <text x="394" y="101">OLD MARKET</text>
                        <text x="392" y="570">HILLTOP</text>
                        <text x="760" y="567">EASTBANK</text>
                    </g>
                    <circle cx="482" cy="336" r="8" fill="#f4f3ed" stroke="#315a4c" strokeWidth="4" />
                </svg>

                {resources.map((resource) => {
                    const category = resourceCategories.find(
                        (item) => item.id === resource.category,
                    );
                    const Icon = categoryIcons[resource.category];
                    const selected = resource.id === selectedId;

                    return (
                        <button
                            className={selected ? styles.marker + " " + styles.selected : styles.marker}
                            key={resource.id}
                            type="button"
                            aria-label={"Select " + resource.name + ", " + category.label}
                            aria-pressed={selected}
                            title={resource.name}
                            style={{
                                left: resource.position.left,
                                top: resource.position.top,
                                "--marker-color": category.color,
                            }}
                            onClick={() => onSelect(resource.id)}
                        >
                            <span className={styles.markerIcon}>
                                <Icon aria-hidden="true" />
                            </span>
                            {selected ? (
                                <span className={styles.markerName}>{resource.name}</span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <div className={styles.mapControls} aria-label="Map zoom controls">
                <button
                    type="button"
                    aria-label="Zoom in"
                    onClick={() => onZoomChange(Math.min(zoom + 10, 120))}
                    disabled={zoom >= 120}
                >
                    <FiPlus aria-hidden="true" />
                </button>
                <button
                    type="button"
                    aria-label="Zoom out"
                    onClick={() => onZoomChange(Math.max(zoom - 10, 80))}
                    disabled={zoom <= 80}
                >
                    <FiMinus aria-hidden="true" />
                </button>
                <button
                    className={styles.resetZoom}
                    type="button"
                    onClick={() => onZoomChange(100)}
                    disabled={zoom === 100}
                >
                    Reset view
                </button>
            </div>

            <span className={styles.scaleLabel}>{zoom}%</span>
            <span className={styles.mapPinKey}>
                <FiMapPin aria-hidden="true" />
                {resources.length} places
            </span>
        </div>

        <ul className={styles.legend} aria-label="Resource categories">
            {resourceCategories.map((category) => (
                <li key={category.id}>
                    <span style={{ "--legend-color": category.color }} />
                    {category.label}
                </li>
            ))}
        </ul>
    </section>
);

export default NeighborhoodMap;