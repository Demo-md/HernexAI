# Browser Verification Checklist

## Environment

- [ ] Server command and URL recorded
- [ ] Production/preview build identified
- [ ] Browser and OS recorded

## Routes and content

- [ ] Homepage loads
- [ ] Every major route loads
- [ ] Missing routes recorded as failures
- [ ] Fonts and critical media load
- [ ] No invisible required text

## Responsive matrix

- [ ] 1440
- [ ] 1280
- [ ] 1024
- [ ] 768
- [ ] 430
- [ ] 390

## Interaction

- [ ] Desktop navigation and internal links
- [ ] Mobile menu open/close and Escape
- [ ] CTA buttons and forms
- [ ] Chatbot states when present
- [ ] Keyboard focus and visible focus styles
- [ ] Hover/touch equivalents
- [ ] Back/forward navigation

## Motion and layout

- [ ] Hero initial and final states
- [ ] ScrollTrigger scenes activate and reset
- [ ] Sticky/pinned content does not block reading
- [ ] Reduced-motion state
- [ ] No overlap, clipping, blocked scrolling, or horizontal overflow

## Runtime

- [ ] Console errors checked
- [ ] Page errors checked
- [ ] Network failures reviewed
- [ ] Evidence screenshots/traces stored under QA output
- [ ] Critical defects resolved or explicitly reported
