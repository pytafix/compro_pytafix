import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Dev-only helper scripts (Node scripts, not part of the app bundle):
    "scratch/**",
  ]),
  // Rule overrides.
  {
    rules: {
      // Enabled: This rule helps catch actual bugs where state is set during render phase.
      // Admin pages should use proper patterns (React Query, SWR, or proper useEffect cleanup).
      "react-hooks/set-state-in-effect": "warn",
      // Caught errors (catch (error) { toast(...) }) are intentionally unused in
      // many catch-and-notify patterns across admin pages and API routes.
      "@typescript-eslint/no-unused-vars": ["warn", { "caughtErrors": "none" }],
      // Admin pages render dynamic images loaded from URLs; using <img> is intentional.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
