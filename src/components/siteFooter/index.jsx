import {
    FaCoffee,
    FaCodepen,
    FaFacebookF,
    FaGithub,
    FaGlobe,
    FaEnvelope,
    FaLinkedinIn,
    FaPatreon,
    FaYoutube,
} from "react-icons/fa";
import styles from "./styles.module.css";

const footerLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net", Icon: FaGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", Icon: FaGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", Icon: FaCodepen },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        Icon: FaLinkedinIn,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish/",
        Icon: FaFacebookF,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
        Icon: FaYoutube,
    },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", Icon: FaEnvelope },
    {
        label: "Source code",
        href: "https://github.com/a2rp/neighborhood-resource-map",
        Icon: FaGithub,
    },
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        Icon: FaGlobe,
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/ashishranjan",
        Icon: FaCoffee,
    },
    {
        label: "Patreon",
        href: "https://www.patreon.com/ashishranjan",
        Icon: FaPatreon,
    },
];

const SiteFooter = () => (
    <footer className={styles.footer}>
        <div className={styles.footerInner}>
            <div className={styles.credit}>
                <a
                    className={styles.logoLink}
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={import.meta.env.BASE_URL + "logo.png"}
                        alt="Ashish Ranjan profile"
                        width="40"
                        height="40"
                    />
                </a>
                <p>
                    &copy; {new Date().getFullYear()}{" "}
                    <a
                        href="https://github.com/a2rp"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ashish Ranjan
                    </a>
                    . All rights reserved.
                </p>
            </div>

            <nav className={styles.links} aria-label="Footer links">
                {footerLinks.map(({ label, href, Icon }) => (
                    <a
                        href={href}
                        key={label}
                        target={
                            href.startsWith("mailto:") ? undefined : "_blank"
                        }
                        rel={
                            href.startsWith("mailto:")
                                ? undefined
                                : "noreferrer"
                        }
                    >
                        <Icon aria-hidden="true" />
                        {label}
                    </a>
                ))}
            </nav>
        </div>
    </footer>
);

export default SiteFooter;
