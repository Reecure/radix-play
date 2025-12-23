import {type FC} from 'react';
import type {SidebarMenu} from "./types.ts";
import Logo from "../../shared/ui/logo/logo.tsx";
import {Icon} from "../../shared/ui/icon/icon.tsx";
import "./sidebar.scss";
import {Link, useLocation} from "react-router";
import {useTheme} from "../../app/providers/ThemeProvider.tsx";

interface Props {
    menu: SidebarMenu[]
}

const Sidebar: FC<Props> = ({menu}) => {
    const location = useLocation();

    return (
        <aside className={"sidebar"}>
            <ul className={"sidebar__menu-items"}>
                {
                    menu.map((item) => {
                        return (
                            <Link key={item.id} to={item.path}>
                                <li className={"sidebar__menu-items_item"}>
                                    <span className={`${location.pathname === item.path && "active-route"}`}></span>

                                    <Icon icon={<item.icon/>}
                                          className={`${location.pathname === item.path && "active-route-color"}`}/>
                                    <span
                                        className={`${location.pathname === item.path && "active-route-color"}`}>{item.label}</span>

                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </aside>
    );
}

export default Sidebar;