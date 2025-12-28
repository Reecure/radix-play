import {type FC, useState} from 'react';
import styles from "./monitoredRoutesList.module.scss";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../../../shared/ui/table/Table";
import DotsIcon from "../../../../shared/assets/icons/dots.svg?react";
import {Icon} from "../../../../shared/ui/icon/icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../../shared/ui/dropdown/Dropdown";
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

const MonitoredRoutesList: FC<Props> = ({onEdit}) => {
    const [routeToDelete, setRouteToDelete] = useState<string | null>(null);

    const {data: monitoredRoutes, isLoading, isError} = useMonitoredRoutes();
    const {deleteMutation} = useRouteMutations();

    const handleDeleteClick = (id: string) => {
        setRouteToDelete(id);
    };

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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead style={{textAlign: "center"}}>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {monitoredRoutes.map((route) => (
                        <TableRow key={route.id}>
                            <TableCell>{route.isActive ? "Active" : "Not Active"}</TableCell>
                            <TableCell>{route.name}</TableCell>
                            <TableCell>{route.originLatitude} {route.originLongitude}</TableCell>
                            <TableCell>{route.destinationLatitude} {route.destinationLongitude}</TableCell>
                            <TableCell style={{textAlign: "center"}}>
                                <div className={styles.actionsCell}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className={styles.actionBtn}
                                                type="button"
                                            >
                                                <Icon
                                                    icon={<DotsIcon width="100%" height="100%"/>}
                                                    size={24}
                                                    viewBox="0 0 32 32"
                                                />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="glass">
                                            <DropdownMenuItem onClick={() => onEdit(route)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteClick(route.id)}
                                                disabled={deleteMutation.isPending}
                                                style={{color: 'var(--color-danger, #ef4444)'}}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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