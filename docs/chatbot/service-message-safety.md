# Service Message Safety

- Service messages use the approved local problem and solution fields in `src/data/site.ts`.
- No client-provided description is trusted.
- `src/data/service-evidence.ts` currently contains no approved benchmark records, so service messages show no statistics.
- The existing Groq chat endpoint remains unchanged for direct conversation. Service-trigger messaging is deterministic to prevent unsupported generated claims when no approved evidence exists.
- Messages explain a relevant friction, operational consequence, possible improvement, and low-friction next step without a guarantee, deadline, invented proof, or fake scarcity.
