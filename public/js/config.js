export const STRAPI_CONFIG = {
  BASE_URL: "https://cms.aairavx.com/api/single-spas",
  TIMEOUT: 5000,
};

export async function validateStrapiConnection() {
  try {
    const response = await fetch(STRAPI_CONFIG.BASE_URL);
    return response.ok;
  } catch (error) {
    console.error("Strapi validation error:", error);
    return false;
  }
}

export async function fetchWidgets() {
  try {
    const response = await fetch(STRAPI_CONFIG.BASE_URL);
    const json = await response.json();
    const raw = (json.data || []).filter((item) => item.Enabled !== false);

    return raw.map((item) => ({
      name: item.ComponentName,
      entry: item.EntryURL,
      route: item.MountPath,
      selector: item.MountSelector || item.ComponentName,
      props: item.Props || {},
    }));
  } catch (error) {
    console.error("❌ Error fetching widgets:", error);
    return [];
  }
}

export async function fetchLoginWidget() {
  const widgets = await fetchWidgets();
  return widgets.find((w) => w.name.toLowerCase().includes("login"));
}
