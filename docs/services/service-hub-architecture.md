# Service Hub Architecture

- `/services/marketing` renders `marketingServices` through `ServiceHub.astro`.
- `/services/technology` renders `technologyCapabilities` through the same component.
- `/services` is a lightweight category selector.
- Existing marketing detail pages and `/services/tech-services` remain server-rendered routes.
- The hubs render all content in Astro HTML; the client controller only changes the active preview and sends optional service-interest events.
