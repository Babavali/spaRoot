import { registerApplication, start } from 'single-spa';
import widgetManager from '/public/js/widget-manager.js'; // adjust path

const STATIC_APPS = [
  {
    name: '@aix/root-config',
    app: () => System.import('@aix/root-config'), // already handled by import map
    activeWhen: ["/"],
  },
];

STATIC_APPS.forEach((app) => {
  registerApplication(app);
});

widgetManager.initialize().then(() => {
  const widgets = widgetManager.getActiveWidgets();

  widgets.forEach((widget) => {
    const config = widgetManager.createWidgetConfig(widget);
    if (config) {
      registerApplication(config);
    }
  });

  start({ urlRerouteOnly: true });
});