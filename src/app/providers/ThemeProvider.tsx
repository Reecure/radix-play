import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type Brand = 'twitch' | 'kick'

interface ThemeContextValue {
    theme: Theme
    brand: Brand
    toggleTheme: () => void
    setBrand: (brand: Brand) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('dark')
    const [brand, setBrandState] = useState<Brand>('twitch')

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.documentElement.dataset.brand = brand
    }, [theme, brand])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    const setBrand = (brand: Brand) => {
        setBrandState(brand)
    }

    return (
        <ThemeContext.Provider value={{ theme, brand, toggleTheme, setBrand }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
    return ctx
}
