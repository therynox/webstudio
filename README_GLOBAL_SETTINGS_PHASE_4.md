# THERYNOX Global Settings + Navigation CMS — Phase 4

Added:
- Admin Settings page at `/admin/settings`
- Editable main navigation, Services dropdown, Solutions dropdown
- Header CTA text and URL
- Footer description, email, location, legal URLs
- Editable footer columns and social links
- Contact information
- Branding fields
- Global SEO fields
- Public GET /api/settings
- Protected GET/PUT /api/settings/admin
- Public Navbar and Footer consume saved settings with safe fallbacks

Keep your existing `server/.env`.

Backend:
`cd server`
`npm install`
`npm start`

Frontend:
`npm install`
`npm start`

Open:
`http://localhost:3000/admin/settings`
