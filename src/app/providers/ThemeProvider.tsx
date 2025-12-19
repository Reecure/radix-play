import { useEffect } from 'react'

type Theme = 'light' | 'dark'
type Brand = 'acme' | 'nova'

export const ThemeProvider = ({
                                  theme = 'light',
                                  brand = 'acme',
                                  children,
                              }: {
    theme?: Theme
    brand?: Brand
    children: React.ReactNode
}) => {
    useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.documentElement.dataset.brand = brand
    }, [theme, brand])

    return <>{children}</>
}