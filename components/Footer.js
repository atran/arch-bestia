import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <nav>
          <span href="#">The Architecture Beast</span>
          <span href="#">Gallery</span>
          <span href="#">About</span>
        </nav>
      </footer>
    </>
  )
}
