import type { SidebarMenu } from "../../../widgets/sidebar/types.ts";

import DashboardIcon from "../../assets/icons/home.svg?react";
import TransactionsIcon from "../../assets/icons/transfer.svg?react";
import AccountsIcon from "../../assets/icons/user.svg?react";
import {RoutePath} from "./routerConfig.tsx";

export const sidebarMenu: SidebarMenu[] = [
    {
        id: 1,
        icon: DashboardIcon,
        label: "Main",
        path: "/",
    },
    {
        id: 2,
        icon: TransactionsIcon,
        label: "Map",
        path: "/map",
    },
    {
        id: 3,
        icon: AccountsIcon,
        label: "Accounts",
        path: "/accounts",
    },
    {
        icon: AccountsIcon,
        id: 4,
        label: "Setting",
        path: RoutePath.settings,
    },
];