import { useTheme } from "../../../app/providers/ThemeProvider";
import styles from './themeSettings.module.scss';

const ThemeSettings = () => {
    const { theme, brand, toggleTheme, setBrand } = useTheme();

    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.brandSwitcher}>
                <button
                    className={`${styles.brandBtn} ${brand === 'twitch' ? styles.active : ''}`}
                    onClick={() => setBrand('twitch')}
                >
                    <span>Twitch</span>
                </button>
                <button
                    className={`${styles.brandBtn} ${brand === 'kick' ? styles.active : ''}`}
                    onClick={() => setBrand('kick')}
                >
                    <span>Kick</span>
                </button>

                <div
                    className={styles.glider}
                    style={{ transform: brand === 'twitch' ? 'translateX(0)' : 'translateX(100%)' }}
                />
            </div>

            <button className={styles.themeToggle} onClick={toggleTheme}>
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
        </div>
    );
};

export default ThemeSettings;