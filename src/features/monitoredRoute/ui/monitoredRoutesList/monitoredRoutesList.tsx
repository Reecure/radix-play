import {type FC, useState} from 'react';
import styles from "./monitoredRoutesList.module.scss";
import {useMonitoredRoutes, useRouteMutations} from "../../model/useMonitoredRoutes";
import type {MonitoredRoute} from "../../model/types";
import {Button, Text} from "../../../../shared/ui";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle
} from "../../../../shared/ui/dialog/Dialog.tsx";

interface Props {
    onEdit: (route: MonitoredRoute) => void;
}

const MonitoredRoutesList: FC<Props> = () => {
    const [routeToDelete, setRouteToDelete] = useState<string | null>(null);

    const {data: monitoredRoutes, isLoading, isError} = useMonitoredRoutes();
    const {deleteMutation} = useRouteMutations();


    const confirmDelete = () => {
        if (routeToDelete) {
            deleteMutation.mutate(routeToDelete, {
                onSuccess: () => {
                    setRouteToDelete(null);
                }
            });
        }
    };

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text color="error">Error loading routes</Text>;
    if (!monitoredRoutes?.length) return <Text>No routes found.</Text>;

    return (
        <div className={styles.wrapper}>
            <Dialog
                open={!!routeToDelete}
                onOpenChange={(open) => !open && setRouteToDelete(null)}
            >
                <DialogContent className="glass">
                    <DialogTitle>Delete Route</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this route? This action cannot be undone.
                    </DialogDescription>

                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setRouteToDelete(null)}
                            disabled={deleteMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            intent={"danger"}
                            onClick={confirmDelete}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default MonitoredRoutesList