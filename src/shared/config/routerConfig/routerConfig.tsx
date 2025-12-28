import type {RouteProps} from "react-router";
import {MainPage} from "../../../pages/mainPage";
import {NotFoundPage} from "../../../pages/notFoundPage";
import Map from "../../../pages/mapPage/mapPage.tsx";
import {SettingsPage} from "../../../pages/settingPage";

export enum AppRoutes {
    MAIN = 'main',
    MAP = 'map',
    SETTINGS = 'settings',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.MAP]: '/map',
    [AppRoutes.SETTINGS]: '/settings',

    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.MAP]: {
        path: RoutePath.map,
        element: <Map />,
    },
    [AppRoutes.SETTINGS]: {
      path: RoutePath.settings,
      element: <SettingsPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
