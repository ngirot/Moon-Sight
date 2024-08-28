let defaultLocale: string = "en-US";

export function currentLocale(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }
    const detected = window.navigator.language
    if (detected) {
        return detected;
    } else
        return defaultLocale;
}