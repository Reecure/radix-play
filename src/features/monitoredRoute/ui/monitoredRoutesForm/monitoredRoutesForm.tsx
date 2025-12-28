import {type FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Checkbox, Input, Label } from "../../../../shared/ui";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "../../../../shared/ui/dialog/Dialog";
import styles from './monitoredRoutesForm.module.scss';
import { useRouteMutations } from "../../model/useMonitoredRoutes";
import type { MonitoredRoute } from "../../model/types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: MonitoredRoute | null;
}

interface FormValues {
    name: string;
    originCoordinate: string;
    destinationCoordinate: string;
    isActive: boolean;
}

const MonitoredRoutesForm: FC<Props> = ({ open, onOpenChange, initialData }) => {
    const { createMutation, updateMutation } = useRouteMutations(() => {
        onOpenChange(false);
        reset();
    });

    const isEditMode = !!initialData;
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            isActive: true,
            name: '',
            originCoordinate: '',
            destinationCoordinate: ''
        }
    });

    useEffect(() => {
        if (open && initialData) {
            reset({
                name: initialData.name,
                isActive: initialData.isActive,
                originCoordinate: `${initialData.originLatitude} ${initialData.originLongitude}`,
                destinationCoordinate: `${initialData.destinationLatitude} ${initialData.destinationLongitude}`,
            });
        } else if (open && !initialData) {
            reset({ isActive: true, name: '', originCoordinate: '', destinationCoordinate: '' });
        }
    }, [open, initialData, reset]);

    const onSubmit = (data: FormValues) => {
        const parseCoord = (str: string) => {
            const [lat, lng] = str.split(" ").map(Number);
            return { lat: lat || 0, lng: lng || 0 };
        };

        const origin = parseCoord(data.originCoordinate);
        const dest = parseCoord(data.destinationCoordinate);

        const payload = {
            name: data.name,
            isActive: data.isActive,
            originLatitude: origin.lat,
            originLongitude: origin.lng,
            destinationLatitude: dest.lat,
            destinationLongitude: dest.lng,
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
        };

        if (isEditMode && initialData) {
            updateMutation.mutate({ id: initialData.id, data: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`${styles.wrapper} glass`}>
                <DialogTitle>{isEditMode ? 'Edit Route' : 'Create Route'}</DialogTitle>

                <form id="route-form" className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                    <Label>
                        Name
                        <Input {...register("name", { required: true })} />
                        {errors.name && <span className={styles.error}>Required</span>}
                    </Label>

                    <Label>
                        Origin (Lat Long)
                        <Input
                            placeholder="50.45 30.52"
                            {...register("originCoordinate", {
                                required: true,
                                pattern: /^-?\d+(\.\d+)?\s-?\d+(\.\d+)?$/
                            })}
                        />
                    </Label>

                    <Label>
                        Destination (Lat Long)
                        <Input
                            placeholder="50.45 30.52"
                            {...register("destinationCoordinate", { required: true })}
                        />
                    </Label>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={() => onChange(!value)}
                                        ref={ref}
                                    />
                                    <Label
                                        onClick={() => onChange(!value)}
                                        style={{ cursor: 'pointer', marginBottom: 0 }}
                                    >
                                        Is active
                                    </Label>
                                </>
                            )}
                        />
                    </div>
                </form>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button
                        variant="solid"
                        type="submit"
                        form="route-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default MonitoredRoutesForm;