import React from "react";
import { THEMES } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";
import { useNavigate } from "react-router-dom";

const ThemesPage = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-base-100 text-base-content p-8"
      data-theme={theme}
    >
      <div className="max-w-4xl mx-auto">
        <section className="bg-base-200 shadow-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme for your interface
            </p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors cursor-pointer
                  ${
                    theme === t
                      ? "bg-base-300 ring-2 ring-primary"
                      : "hover:bg-base-300/50"
                  }
                `}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-error"
          >
            Back
          </button>
        </section>
      </div>
    </div>
  );
};

export default ThemesPage;
