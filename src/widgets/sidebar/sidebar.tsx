import { type FC } from 'react';
import type { SidebarMenu } from "./types.ts";
import Logo from "../../shared/ui/logo/logo.tsx"; // Убедись в пути
import { Icon } from "../../shared/ui/icon/icon.tsx";
import { Link, useLocation } from "react-router";
import styles from './sidebar.module.scss';
import ThemeSettings from "../../shared/ui/themeSettings/themeSettings.tsx"; // Твой путь

interface Props {
    menu: SidebarMenu[]
}

const Sidebar: FC<Props> = ({ menu }) => {
    const location = useLocation();

    return (
        <aside className={`${styles.sidebar} glass`}>
            <nav className={styles.navContainer}>
                <ul className={styles.menuList}>
                    {menu.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link key={item.id} to={item.path} className={styles.link}>
                                <li className={styles.item}>
                                    {/* Старая вертикальная полоска активного роута */}
                                    <span className={`${styles.activeRoute} ${isActive ? styles.show : ''}`}></span>

                                    <div className={`${styles.iconWrapper} ${isActive ? styles.activeColor : ''}`}>
                                        <Icon icon={item.icon} />
                                    </div>

                                    <span className={`${styles.label} ${isActive ? styles.activeColor : ''}`}>
                                        {item.label}
                                    </span>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </nav>

            <div className={styles.footer}>
                <ThemeSettings />
            </div>
        </aside>
    );
}

export default Sidebar;