import type { PropsWithChildren } from 'react';
import { MapProvider } from '../../../app/providers/MapProvider/MapProvider';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { DEFAULT_MAP_CONFIG } from '../../../shared/config/map/map.ts';
import { getMapStyle } from '../../../shared/config/map/mapStyles.ts';

interface MapWidgetProps extends PropsWithChildren {
    className?: string;
}

export function MapWidget({ children, className = 'map-widget' }: MapWidgetProps) {
    const { theme } = useTheme();
    const style = getMapStyle(theme);

    return (
        <MapProvider config={DEFAULT_MAP_CONFIG} style={style} className={className}>
            {children}
        </MapProvider>
    );
}