import type {FC, SVGProps} from "react";

export interface SidebarMenu {
    id: number;
    icon: FC<SVGProps<SVGSVGElement>>;
    label: string;
    path: string;
}