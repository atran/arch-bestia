import { format } from 'date-fns'

import styles from './Header.module.css'

export default function Header({currDate, changeDate}) {
  const currDateFormatted = format(currDate, 'yyyy-MM-dd');
  const directory = `iterations/${currDateFormatted}`;
  const iterationVideoSrc = `${directory}/bounce.mp4`;
  
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <video src={iterationVideoSrc} autoPlay loop />
          Iteration {currDateFormatted}
        </h1>

        <div className={styles.breadcrumbs}>
          <div className={styles.breadcrumb} onClick={changeDate}>
            <span className={styles.arrow}>
              {String.fromCharCode(11105)}
            </span>
            <p>Prev Day</p>
          </div>
          <div className={styles.breadcrumb} onClick={changeDate}>
            <span className={styles.arrow}>
              {String.fromCharCode(11107)}
            </span>
            <p>Next Day</p>
          </div>
        </div>
      </header>
    </>
  )
}
