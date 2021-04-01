import { format, isBefore, isAfter, isEqual } from 'date-fns'
import { last } from 'lodash';

import styles from './Header.module.css'

export default function Header({
  firstDate, 
  lastDate, 
  currDate, 
  goToPrevDay, 
  goToNextDay
}) {
  const currDateFormatted = format(currDate, 'yyyy-MM-dd');
  const directory = `iterations/${currDateFormatted}`;
  const iterationVideoSrc = `${directory}/bounce.mp4`;
  
  const hasPrevDays = isAfter(currDate, firstDate);
  const hasNextDays = isBefore(currDate, lastDate);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <video src={iterationVideoSrc} autoPlay loop />
          Iteration {currDateFormatted}
        </h1>

        <div className={styles.breadcrumbs}>
          {
            hasPrevDays &&
            <div className={styles.breadcrumb} onClick={goToPrevDay}>
              <span className={styles.arrow}>
                {String.fromCharCode(11105)}
              </span>
              <p>Prev Day</p>
            </div>
          }
          {
            hasNextDays &&
            <div className={styles.breadcrumb} onClick={goToNextDay}>
              <span className={styles.arrow}>
                {String.fromCharCode(11107)}
              </span>
              <p>Next Day</p>
            </div>
          }
        </div>
      </header>
    </>
  )
}
