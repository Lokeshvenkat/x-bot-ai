import { createContext } from "react";

/**
 * Context to manage and provide the light theme state across the app.
 * Defaults to `true` (light theme enabled).
 */
export const LightThemeContext = createContext(true);
