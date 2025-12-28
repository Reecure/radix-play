import { useState } from "react";
import { Button, Text } from "../../../shared/ui";
import MonitoredRoutesList from "../../../features/monitoredRoute/ui/monitoredRoutesList/monitoredRoutesList";
import MonitoredRoutesForm from "../../../features/monitoredRoute/ui/monitoredRoutesForm/monitoredRoutesForm";
import styles from './settingPage.module.scss';
import type {MonitoredRoute} from "../../../features/monitoredRoute/model/types";

const SettingPage = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [editingRoute, setEditingRoute] = useState<MonitoredRoute | null>(null);

    const handleEdit = (route: MonitoredRoute) => {
        setEditingRoute(route);
        setCreateModalOpen(true);
    };

    const handleClose = (open: boolean) => {
        setCreateModalOpen(open);
        if (!open) setEditingRoute(null);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Text size="h1" weight="bold">Monitored Routes</Text>
                <Button type="button" onClick={() => setCreateModalOpen(true)}>
                    Create Route
                </Button>
            </div>

            <MonitoredRoutesList onEdit={handleEdit} />

            <MonitoredRoutesForm
                open={isCreateModalOpen}
                onOpenChange={handleClose}
                initialData={editingRoute}
            />
        </div>
    )
}
export default SettingPage