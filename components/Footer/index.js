import Link from 'next/link';
import styles from './style.module.css';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <nav>
          <Link className="footer-link" href="/">The Architectural Beast</Link>
          <Link className="footer-link" href="/gallery">Gallery</Link>
          <Link className="footer-link" href="/about">About</Link>
        </nav>
      </footer>
    </>
  )
}
