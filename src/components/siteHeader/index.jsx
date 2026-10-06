import { useEffect, useRef, useState } from "react";
import { FiGithub, FiMap, FiMenu, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape" && menuOpen) {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.headerInner}>
                <a
                    className={styles.brand}
                    href="#map"
                    onClick={closeMenu}
                    aria-label="Block Atlas home"
                >
                    <span className={styles.brandMark}>
                        <FiMap aria-hidden="true" />
                    </span>
                    <span>Block Atlas</span>
                </a>

                <nav
                    className={menuOpen ? styles.nav + " " + styles.navOpen : styles.nav}
                    id="site-navigation"
                    aria-label="Main navigation"
                >
                    <a href="#map" onClick={closeMenu}>Map</a>
                    <a href="#places" onClick={closeMenu}>Places</a>
                    <a href="#about" onClick={closeMenu}>About</a>
                </nav>

                <div className={styles.actions}>
                    <a
                        className={styles.repository}
                        href="https://github.com/a2rp/neighborhood-resource-map"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGithub aria-hidden="true" />
                        <span>Repository</span>
                    </a>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        aria-expanded={menuOpen}
                        aria-controls="site-navigation"
                        onClick={() => setMenuOpen(!menuOpen)}
                        ref={menuButtonRef}
                    >
                        {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;