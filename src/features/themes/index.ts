import { getCurrentWindow } from "@tauri-apps/api/window";

export type ThemeMode = "light" | "dark" | "system";
export const STORAGE_KEY = "theme-mode";

export const getSavedThemeMode = (): ThemeMode => {
  const theme = localStorage.getItem(STORAGE_KEY);
  return (theme ?? "light") as ThemeMode;
};

export const getSystemTheme = async (): Promise<ThemeMode> => {
  const window = getCurrentWindow();
  const theme = (await window.theme()) as ThemeMode;
  return theme ?? "light";
};

export const saveTheme = (mode: ThemeMode) => {
  localStorage.setItem(STORAGE_KEY, mode);
};

export async function applyTheme(mode: ThemeMode) {
  let theme;

  if (mode === "system") {
    theme = await getSystemTheme();
  } else {
    theme = mode;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");

  // Update the theme listener when theme mode changes
  await updateThemeListener(mode);
}

// Store the current unlisten function
let currentUnlisten: (() => void) | null = null;

export const listenToSystemThemeChanges = async (): Promise<() => void> => {
  // Clean up previous listener if it exists
  if (currentUnlisten) {
    currentUnlisten();
    currentUnlisten = null;
  }

  const mode = getSavedThemeMode();
  if (mode !== "system") {
    return () => {};
  }

  const window = getCurrentWindow();
  const unlisten = await window.onThemeChanged(({ payload }) => {
    document.documentElement.classList.toggle("dark", payload === "dark");
  });

  currentUnlisten = unlisten;
  return unlisten;
};

export const updateThemeListener = async (newMode: ThemeMode) => {
  if (newMode === "system") {
    // Re-establish listener for system theme changes
    await listenToSystemThemeChanges();
  } else {
    // Clean up listener if switching away from system theme
    if (currentUnlisten) {
      currentUnlisten();
      currentUnlisten = null;
    }
  }
};
