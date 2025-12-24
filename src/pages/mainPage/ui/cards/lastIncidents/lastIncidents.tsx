import { Text } from "../../../../../shared/ui";
import styles from './lastIncidents.module.scss';

const RECENT_INCIDENTS = [
    {
        id: 1,
        title: "Car Collision",
        location: "Velyka Vasylkivska St.",
        time: "10:42 AM",
        severity: "critical"
    },
    {
        id: 2,
        title: "Road Maintenance",
        location: "Peremohy Ave.",
        time: "09:15 AM",
        severity: "warning"
    },
    {
        id: 3,
        title: "Traffic Light Failure",
        location: "Khreshchatyk St.",
        time: "08:30 AM",
        severity: "info"
    },
    {
        id: 4,
        title: "Road Maintenance",
        location: "Peremohy Ave.",
        time: "09:15 AM",
        severity: "warning"
    }
];

const LastIncidents = () => {
    return (
        <div className={styles.listWrapper}>
            {RECENT_INCIDENTS.map((item) => (
                <div key={item.id} className={styles.item}>
                    <div className={`${styles.indicator} ${styles[item.severity]}`} />

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <Text size="sm" weight="bold" className={styles.title}>
                                {item.title}
                            </Text>
                            <Text size="xs" className={styles.time}>
                                {item.time}
                            </Text>
                        </div>
                        <Text size="xs" className={styles.location}>
                            {item.location}
                        </Text>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LastIncidents;