# THERYNOX Project Status — Coming Soon

## Statuses
- `draft`: private, not returned by the public project API.
- `in-progress`: public project route is available and renders a Coming Soon page; Work also shows a Coming Soon badge.
- `published`: public case study is rendered normally.

## Lead conversion
Lead → Project conversion accepts `in-progress` and the conversion modal exposes `In Process — Coming Soon`.

## Coming Soon page
`/work/:slug` for an `in-progress` project shows:
- project title
- Project in Process label
- Coming Soon state
- cover image when available
- link back to Selected Work
- up to 3 other published projects at the bottom

When the project is changed to `published` in Admin → Projects, the same URL automatically renders the full case study.
