# Service Hover Messaging

The preview dispatches `hernex:service-interest` with a slug and interaction type only. The client never supplies service descriptions or evidence.

`/api/service-message` resolves the slug on the server, rate-limits repeated requests, caches the deterministic response by service, and returns a compact HN Bot bubble. The bubble does not steal focus, has a dismissal control, offers a full-chat action, and includes a service-specific WhatsApp link.

Hover/focus use an 820ms intent delay. Touch uses the explicit `Ask HN Bot` control.
