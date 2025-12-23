import {useEffect, useState} from "react";
import axios from "axios";
import type {AccidentRecord, AccidentResponse} from "../../../app/model/accident/types.ts";
import {Text} from "../../../shared/ui";
import styles from './mainPage.module.scss';

const MainPage = () => {
    const [accidents, setAccidents] = useState<AccidentRecord[]>([]);

    const getAccidents = async () => {
        return await axios.get<AccidentResponse>('https://localhost:7281/get-accidents?start=2023-01-01&end=2025-12-31')
            .then(res => setAccidents(res.data.features));
    }

    //INIT DATA
    useEffect(() => {
        getAccidents();
    }, []);

    useEffect(() => {
        console.log(accidents)
    }, [accidents]);

    return (
        <div className={`${styles.pageWrapper}`}>
            <Text size={"h2"} weight={'bold'}>Traffic Incident Overview</Text>

            <div className={`${styles.cardWrapper}`}>
                <div className={`${styles.totalCard} glass`}>

                </div>

                <div className={`${styles.severityCard} glass`}>

                </div>
            </div>

            <div className={`${styles.cardWrapper}`}>
                <div className={`${styles.card} glass`}>

                </div>

                <div className={`${styles.card} glass`}>

                </div>

                <div className={`${styles.card} glass`}>

                </div>

                <div className={`${styles.card} glass`}>

                </div>
            </div>
        </div>
    );
};

export default MainPage;