import styles from './card.module.scss';
import {Text} from "../text/Text.tsx";
import type {FC} from "react";

interface Props {
    title: string;
    className?: string;
    children: React.ReactNode;
}

const Card: FC<Props> = ({title, children, className}) => {
    return <div className={`${styles.cardWrapper} ${className} glass`}>
        <Text size={"h2"} weight={"medium"}>{title}</Text>
        {children}
    </div>
}

export default Card;