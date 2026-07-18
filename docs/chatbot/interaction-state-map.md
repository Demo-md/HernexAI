# HN Bot Interaction State Map

| State | Entry | Exit | Visual / panel behaviour | Accessibility and fallback |
| --- | --- | --- | --- | --- |
| `loading` | Server-rendered initial markup | `entering`, `idle`, or `reduced-motion` | Static bot is visible immediately | Launcher remains a real button |
| `entering` | First browser visit | `greeting` | Short ready-state setup | No content is blocked |
| `greeting` | First visit only | `idle` | One compact wave / attention moment | Skipped in reduced motion; session-scoped |
| `idle` | Default stable state | `looking`, `hovered`, `chat-open`, `sleeping` | Low-amplitude floating and rare signal | Stable static pose when reduced |
| `looking` / `hovered` | Precise pointer around bot | `idle` or `chat-open` | Bounded head rotation, desktop only | Pointer is never required to open chat |
| `chat-open` | Launcher activation | `typing`, `success`, `error`, `minimised`, `idle` | Panel visible and input focused | `aria-expanded=true`; Escape closes and focus returns |
| `typing` | Valid message submitted | `success`, `error`, `chat-open` | Processing face and announced status | Send button is disabled during request |
| `success` | Chat API returns a reply | `chat-open` or `idle` | Brief positive expression, reply added to message history | Reply appears as text in live message history |
| `error` | Invalid local message or failed API | `typing`, `chat-open`, `idle` | Concerned visual state and visible error copy | Error is a live status; valid retry is allowed |
| `minimised` | Minimise button | `chat-open` or `idle` | Panel closes, launcher persists | Focus returns to launcher |
| `sleeping` | Reserved inactivity state | `idle` / `chat-open` | Not yet automatically activated | Must stay visually quiet |
| `reduced-motion` | `prefers-reduced-motion: reduce` | `chat-open` / `idle` | Stable bot and immediate panel behavior | All chat features remain available |
| `webgl-unavailable` / `asset-load-failed` | Reserved for future WebGL replacement | `idle` / `chat-open` | CSS bot is the fallback | No blank canvas or lost control |
| `unavailable` | Reserved backend/runtime condition | `idle` / `chat-open` | Calm unavailable cue | Direct user to retry or existing contact path |

## Lifecycle Guarantees

The controller in `src/scripts/chatbot/state-controller.ts` owns allowed transitions. `src/scripts/chatbot/chatbot.ts` owns DOM effects, API calls, observers, and focus behavior. State is not inferred from visual CSS alone.
