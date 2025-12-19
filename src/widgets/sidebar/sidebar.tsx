import type {FC} from 'react';
import type {SidebarMenu} from "./types.ts";
import Logo from "../../shared/ui/logo/logo.tsx";
import {Icon} from "../../shared/ui/icon/icon.tsx";
import "./sidebar.scss";

interface Props {
    menu: SidebarMenu[]
}

const Sidebar:FC<Props> = ({menu}) => {
    return (
        <aside className={"sidebar"}>
            <div className={"sidebar__logo"}>
                <Logo />
            </div>

            <ul className={"sidebar__menu-items"}>
                {
                    menu.map((item) => {
                        return (
                            <li key={item.id} className={"sidebar__menu-items_item"}>
                                <Icon icon={<item.icon />} />
                                <span>{item.label}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    );
}

export default Sidebar;