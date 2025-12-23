import type {FC} from "react";
import styles from './NotFoundPage.module.scss';
interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className = "" }) => {
    return (
        <div className={`${styles.notFoundPage} ${className}`}>
            Not Found
        </div>
    );
};
