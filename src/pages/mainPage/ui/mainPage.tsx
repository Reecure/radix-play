import {useEffect, useState} from "react";
import axios from "axios";
import type {AccidentRecord, AccidentResponse} from "../../../app/model/accident/types.ts";
import {Text} from "../../../shared/ui";
import styles from './mainPage.module.scss';
import UkraineCard from "./cards/ukraineCard/ukraineCard.tsx";
import RegionsCard from "./cards/regionsCard/regionsCard.tsx";
import IncidentCompletion from "./cards/incidentCompletion/incidentCompletion.tsx";
import Card from "../../../shared/ui/card/card.tsx";
import ChartCard from "./cards/chartCard/chartCard.tsx";
import LastIncidents from "./cards/lastIncidents/lastIncidents.tsx";

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
            <Text size={"h1"} weight={'bold'}>Traffic Incident Overview</Text>

            <div className={`${styles.cardWrapper}`}>
                <Card title={"Total incidents"} className={`${styles.totalCard}`}>
                    <ChartCard />
                </Card>

                <Card title={"Top Severities"} className={`${styles.severityCard}`}>
                    <UkraineCard/>
                </Card>
            </div>

            <div className={`${styles.cardWrapper}`}>
                <Card title={"Top Regions"} className={`${styles.topRegionsCard}`}>
                    <RegionsCard />
                </Card>

                <Card title={"Incident Completion"} className={`${styles.card}`}>
                    <IncidentCompletion/>
                </Card>

                <Card title={"Recent Activity"} className={`${styles.incidentsCompletionCard} glass`}>
                    <LastIncidents />
                </Card>
            </div>
        </div>
    );
};

export default MainPage;