import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <nav>
          <a href="#">The Architecture Beast</a>
          <a href="#">Gallery</a>
          <a href="#">About</a>
        </nav>
      </footer>
    </>
  )
}
