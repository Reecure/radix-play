import styles from './regionsCard.module.scss';
const RegionsCard = () => {
    return <div className={styles.circlesWrapper}>
            <div className={`${styles.circle} ${styles.biggest} glass`}>
                <p>Kyiv</p>
                <span>44</span>
            </div>
            <div className={`${styles.circle} ${styles.big} glass`}>
                <p>Kharkiv</p>
                <span>44</span>
            </div>
            <div className={`${styles.circle} ${styles.medium} glass`}>
                <p>Ternopil</p>
                <span>44</span>
            </div>
            <div className={`${styles.circle} ${styles.small} glass`}>
                <p>Lviv</p>
                <span>44</span>
            </div>
        </div>
}

export default RegionsCard;