import type { SidebarMenu } from "../../widgets/sidebar/types.ts";

import DashboardIcon from "../assets/icons/home.svg?react";
import TransactionsIcon from "../assets/icons/transfer.svg?react";
import AccountsIcon from "../assets/icons/user.svg?react";

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
];