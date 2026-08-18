# THERYNOX Blog CMS — Phase 1

Implemented on top of the current THERYNOX Web Studio admin project.

## Added
- Draft / Published / Scheduled article states.
- Scheduled publishing without a cron job: scheduled posts become public automatically once `publishedAt` is reached.
- Blog admin metadata endpoint for categories, tags, and status counts.
- Admin blog list now shows Total / Published / Scheduled / Draft counts.
- Server-side admin pagination support (`page`, `limit`).
- Search now includes tags.
- Automatic reading-time calculation from article word count.
- Article word counter.
- Cover-image upload with visible preview and error handling.
- SEO fields and tag management retained.
- Preview button for the current article draft.
- Only one article remains featured when a new article is marked featured.
- Public blog APIs no longer expose future scheduled articles.
- Removed the duplicate Blog `slug` schema index warning.

## Important
Keep your existing `server/.env`. Do not commit it.

## Start

Backend:

```powershell
cd "D:\therynox webstudieo\therynox-webstudio-admin-rebuilt\server"
npm install
npm start
```

Frontend:

```powershell
cd "D:\therynox webstudieo\therynox-webstudio-admin-rebuilt"
npm install
npm start
```

## Admin
- `/admin/blog`
- `/admin/blog/create`
- `/admin/blog/:id/edit`

## Public
- `/blog`
- `/blog/:slug`
