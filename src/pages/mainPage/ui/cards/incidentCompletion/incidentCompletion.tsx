import {Text} from "../../../../../shared/ui";

import styles from './incidentCompletion.module.scss';

const INCIDENT_COMPLETION_DATA = [{
    title: "Reports",
    value: 100
}, {
    title: "Reports 2",
    value: 80
}, {
    title: "Reports 3",
    value: 70
}, {
    title: "Reports 4",
    value: 30
}];

const IncidentCompletion = () => {
    return <div className={styles.barsWrapper}>
        {
            INCIDENT_COMPLETION_DATA.map((item, i) => (
                <div key={i} className={styles.percentageBarWrapper}>
                    <Text size={"md"}>{item.title}</Text>
                    <div className={styles.percentageBar}>
                        <div style={{width: `${item.value}%`}} className={styles.percentageBarContent}>
                        </div>
                    </div>
                    <div className={styles.percentageBlock}>
                        <Text size={"sm"}>{item.value}% / 100%</Text>
                    </div>
                </div>
            ))
        }
    </div>
}

export default IncidentCompletion;