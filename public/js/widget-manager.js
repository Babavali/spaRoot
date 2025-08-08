import { fetchWidgets } from "../js/config.js";

class WidgetManager {
  constructor() {
    this.widgets = [];
    this.updateListeners = [];
  }

  async initialize() {
    try {
      this.widgets = await fetchWidgets();
      // console.log("✅ WidgetManager initialized with widgets:", this.widgets);
    } catch (error) {
      console.error("❌ Failed to initialize WidgetManager:", error);
    }
  }

  // You can re-enable the filter if your Strapi data has `isActive`
  getActiveWidgets() {
    console.log("📦 Getting active widgets:", this.widgets);
    return this.widgets; // Or: return this.widgets.filter(w => w.isActive);
  }

  createWidgetConfig(widget) {
    if (!widget || !widget.name || !widget.route) {
      console.warn("⚠️ Invalid widget config:", widget);
      return null;
    }

    return {
      name: widget.name,
      app: () => System.import(widget.entry),
      activeWhen: [widget.route],
      // customProps: {
      //   domElementGetter: () => document.getElementById(widget.selector),
      //   ...widget.props
      // }
    };
  }

  onUpdate(callback) {
    this.updateListeners.push(callback);
    // Optional: implement polling or WebSocket to trigger updates
  }
}

const widgetManager = new WidgetManager();
export default widgetManager;
