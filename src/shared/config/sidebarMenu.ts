import type { SidebarMenu } from "../../widgets/sidebar/types.ts";

import DashboardIcon from "../assets/icons/home.svg?react";
import TransactionsIcon from "../assets/icons/transfer.svg?react";
import AccountsIcon from "../assets/icons/user.svg?react";
import InvestmentsIcon from "../assets/icons/economic-investment.svg?react";
import CreditCardsIcon from "../assets/icons/credit-card.svg?react";
import LoansIcon from "../assets/icons/loan.svg?react";
import ServicesIcon from "../assets/icons/service.svg?react";
import PrivilegesIcon from "../assets/icons/econometrics.svg?react";
import SettingsIcon from "../assets/icons/settings-solid.svg?react";

export const sidebarMenu: SidebarMenu[] = [
    {
        id: 1,
        icon: DashboardIcon,
        label: "Dashboard",
        path: "/",
    },
    {
        id: 2,
        icon: TransactionsIcon,
        label: "Transactions",
        path: "/transactions",
    },
    {
        id: 3,
        icon: AccountsIcon,
        label: "Accounts",
        path: "/accounts",
    },
    {
        id: 4,
        icon: InvestmentsIcon,
        label: "Investments",
        path: "/investments",
    },
    {
        id: 5,
        icon: CreditCardsIcon,
        label: "Credit Cards",
        path: "/credit-cards",
    },
    {
        id: 6,
        icon: LoansIcon,
        label: "Loans",
        path: "/loans",
    },
    {
        id: 7,
        icon: ServicesIcon,
        label: "Services",
        path: "/services",
    },
    {
        id: 8,
        icon: PrivilegesIcon,
        label: "My Privileges",
        path: "/privileges",
    },
    {
        id: 9,
        icon: SettingsIcon,
        label: "Setting",
        path: "/settings",
    }
];