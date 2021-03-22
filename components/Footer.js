import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <nav>
          <span className="footer-link" href="#">The Architecture Beast</span>
          <span href="#">Gallery</span>
          <span href="#">About</span>
        </nav>
        <p className={styles.caption}>
          Hello world AI generated caption ipsum dolor; etc.
        </p>
      </footer>
    </>
  )
}
