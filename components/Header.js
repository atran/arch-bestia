import { format, isBefore, isAfter } from 'date-fns'
import classnames from 'classnames';

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
  const prevBreadcrumbCls = classnames(styles.breadcrumb, {
    [`${styles.disabled}`]: !hasPrevDays,
  })
  const nextBreadcrumbCls = classnames(styles.breadcrumb, {
    [`${styles.disabled}`]: !hasNextDays,
  })
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <video src={iterationVideoSrc} autoPlay loop playsInline />
          Iteration {currDateFormatted}
        </h1>

        <div className={styles.breadcrumbs}>
          <div className={prevBreadcrumbCls} onClick={goToPrevDay}>
            <span className={styles.arrow}>
              {String.fromCharCode(11105)}
            </span>
            <p>Prev Day</p>
          </div>
          <div className={nextBreadcrumbCls} onClick={goToNextDay}>
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
