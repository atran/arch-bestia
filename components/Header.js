import { format, parse } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion';

import styles from './Header.module.css'

export default function Header({
  firstDateFormatted, 
  lastDateFormatted, 
  currDate, 
  goToPrevDay, 
  goToNextDay
}) {
  const currDateFormatted = format(currDate, 'yyyy-MM-dd');
  const directory = `iterations/${currDateFormatted}`;
  const iterationVideoSrc = `${directory}/bounce.mp4`;
  
  // TODO: it has to be a <> comparison
  const hasPrevDays = lastDateFormatted === currDateFormatted;
  const hasNextDays = firstDateFormatted === currDateFormatted;

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <div style={{ display: 'inline', width: '4vw', height: '4vw', overflow: 'hidden', marginRight: '1vw'}}>
            <AnimatePresence>
          {
            <motion.video 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 2 }}
              src={iterationVideoSrc} 
              key={iterationVideoSrc}
              exitBeforeEnter
              autoPlay 
              loop 
            />
          }
          </AnimatePresence>
          </div>
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
