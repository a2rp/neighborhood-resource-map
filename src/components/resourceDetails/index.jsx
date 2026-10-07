import { useEffect, useState } from "react";
import {
    FiBookOpen,
    FiCheck,
    FiClock,
    FiCopy,
    FiExternalLink,
    FiHeart,
    FiHome,
    FiMapPin,
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

const ResourceDetails = ({ resource, saved, openToday, onSave }) => {
    const [copyStatus, setCopyStatus] = useState("");

    useEffect(() => {
        if (!copyStatus) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => setCopyStatus(""), 2200);
        return () => window.clearTimeout(timeoutId);
    }, [copyStatus]);

    if (!resource) {
        return (
            <aside className={styles.details} id="places" aria-labelledby="details-title">
                <h2 id="details-title">Place details</h2>
                <p className={styles.emptyState}>
                    No places match those filters. Clear a filter to view a listing.
                </p>
            </aside>
        );
    }

    const category = resourceCategories.find((item) => item.id === resource.category);
    const Icon = categoryIcons[resource.category];
    const address = resource.address + ", " + resource.neighborhood + ", Northbank";
    const mapUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(resource.name + ", " + address);

    const copyAddress = async () => {
        try {
            await navigator.clipboard.writeText(address);
            setCopyStatus("Address copied");
        } catch {
            setCopyStatus("Address could not be copied");
        }
    };

    return (
        <aside
            className={styles.details}
            id="places"
            aria-labelledby="details-title"
            aria-live="polite"
        >
            <div className={styles.placeHeader}>
                <span
                    className={styles.categoryIcon}
                    style={{ "--category-color": category.color }}
                >
                    <Icon aria-hidden="true" />
                </span>
                <span className={openToday ? styles.openStatus : styles.closedStatus}>
                    <span />
                    {openToday ? "Open today" : "Closed today"}
                </span>
            </div>

            <p className={styles.categoryLabel}>{category.label} · {resource.neighborhood}</p>
            <h2 id="details-title">{resource.name}</h2>
            <p className={styles.description}>{resource.description}</p>

            <div className={styles.address}>
                <FiMapPin aria-hidden="true" />
                <p>{resource.address}<span>{resource.neighborhood}, Northbank</span></p>
            </div>

            <dl className={styles.facts}>
                <div>
                    <dt><FiClock aria-hidden="true" /> Hours</dt>
                    <dd>{resource.hours}</dd>
                </div>
                <div>
                    <dt><FiCheck aria-hidden="true" /> Access</dt>
                    <dd>{resource.access}</dd>
                </div>
            </dl>

            <div className={styles.services}>
                <h3>What you can find</h3>
                <ul>
                    {resource.services.map((service) => (
                        <li key={service}>{service}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.saveButton}
                    type="button"
                    aria-pressed={saved}
                    onClick={() => onSave(resource.id)}
                >
                    <FiHeart aria-hidden="true" />
                    {saved ? "Saved place" : "Save place"}
                </button>
                <button
                    className={styles.copyButton}
                    type="button"
                    onClick={copyAddress}
                >
                    <FiCopy aria-hidden="true" />
                    Copy address
                </button>
                <a
                    className={styles.mapLink}
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    <FiExternalLink aria-hidden="true" />
                    Search in Maps
                </a>
            </div>
            <p className={styles.copyStatus} role="status" aria-live="polite">
                {copyStatus}
            </p>
            <p className={styles.sampleNote}>
                Demo listing for design purposes. Confirm current details with the provider.
            </p>
        </aside>
    );
};

export default ResourceDetails;