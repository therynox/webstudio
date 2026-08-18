# THERYNOX Homepage CMS Phase 2

Added a database-backed Homepage Editor.

## Admin

`/admin/homepage`

Controls:
- Hero content, CTAs and visibility
- Homepage stats with add/remove/reorder/visibility
- Technology, Work, Process and Pricing section messaging/visibility
- Final CTA content and URL
- Homepage SEO title, description, keywords and OG image URL
- Preview website link

## API

Public:
- `GET /api/homepage`

Authenticated admin:
- `GET /api/homepage/admin`
- `PUT /api/homepage/admin`

The public homepage loads CMS settings at runtime. Existing project-driven hero imagery and existing section designs are preserved.

Keep your existing `server/.env` when installing this package.

## Homepage Section Manager

The homepage editor now includes a database-backed section manager. Admins can drag sections to reorder them, move them with arrow controls, toggle visibility, and save the complete structure. The public homepage reads `sections` from `/api/homepage` and renders visible sections in the saved order.
