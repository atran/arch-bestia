import { format } from 'date-fns'

import styles from './Header.module.css'

export default function Header({currDate, changeDate}) {
  const currDateFormatted = format(currDate, 'yyyy-MM-dd');
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Iteration {currDateFormatted}
        </h1>

        <div className={styles.breadcrumbs} onClick={changeDate}>
          <span className={styles.arrow}>
            {String.fromCharCode(11105)}
          </span>
          <div>Go to previous day</div>
        </div>
      </header>
    </>
  )
}
