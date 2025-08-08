import { registerApplication, start } from "single-spa";
import widgetManager from "../public/js/widget-manager"; // or correct the path

// Register static applications (except login, which we get from API)
const STATIC_APPS = [
  {
    name: "@aix/root-config",
    app: () => System.import("http://localhost:9000/Dashboard-root-config.js"),
    activeWhen: ["/"],
  },
];

// Register static apps
STATIC_APPS.forEach((app) => {
  console.log(`[STATIC] Registering ${app.name} at:`, app.activeWhen);
  registerApplication(app);
});

// Dynamically register widgets (including login)
widgetManager.initialize().then(() => {
  const widgets = widgetManager.getActiveWidgets();

  widgets.forEach((widget) => {
    const config = widgetManager.createWidgetConfig(widget);
    if (config) {
      const isLogin =
        config.route === "/login" ||
        config.name.toLowerCase().includes("login");

      console.log(
        `[DYNAMIC] Registering ${isLogin ? "LOGIN" : "WIDGET"}: ${config.name}`
      );
      console.log(` ↳ URL: ${config.app}`);
      console.log(` ↳ Route: ${config.activeWhen}`);
      console.log(` ↳ Props:`, config.customProps);

      registerApplication(config);
    }
  });

  // ✅ Start single-spa after dynamic + static registration
  console.log("✅ Starting single-spa...");
  start({ urlRerouteOnly: true });
});
