/**
 * Registers Barlow + Inter from locally-bundled @fontsource packages, so
 * rendering never depends on a runtime Google Fonts fetch (which this
 * environment's network policy would block). Arial remains the final fallback.
 * Import this once at the top of the composition entry.
 */
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
