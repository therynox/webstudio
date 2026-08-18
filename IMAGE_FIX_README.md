# THERYNOX Work + Project Detail Fix

## What changed

- Fixed project media URL handling for both Work and Project Detail.
- `/images/projects/...` paths are resolved against the API/media server instead of the frontend host.
- Old `localhost:3000` / `localhost:5173` image URLs are repaired automatically.
- Public project API responses now return absolute media URLs.
- Added configurable API URL for local and production deployments.
- Redesigned Project Detail into a premium case-study layout:
  - Large editorial hero
  - Project facts strip
  - Overview
  - Services + technology
  - Challenge / Solution / Result
  - Dark visual gallery
  - CTA
  - Next project navigation
- Added graceful image failure placeholders so broken media never creates an empty giant block.

## Local development

Create `.env` in the frontend root:

REACT_APP_API_URL=http://localhost:5000/api

Create `.env` in `server/`:

CLIENT_URL=http://localhost:3000
PUBLIC_API_URL=http://localhost:5000

## Production

Set the frontend environment variable to the real API URL:

REACT_APP_API_URL=https://api.example.com/api

Set the server environment variables:

CLIENT_URL=https://www.example.com
PUBLIC_API_URL=https://api.example.com

Then rebuild/redeploy the frontend and restart the API server.
