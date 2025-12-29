import { createContext } from 'react';
import type { MapContextValue } from './types';

export const MapContext = createContext<MapContextValue | null>(null);