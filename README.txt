THERYNOX LANDING PAGE PROJECT VISIBILITY FIX

Replace:
src/components/Hero.jsx
src/components/HomeProjects.jsx

Rules after patch:
- Hero never receives in-progress / in-process / in-development / coming-soon projects.
- Hero prefers published + featured projects. If none are featured, it uses published projects only.
- Landing-page Selected Work shows published projects only.
- An in-process project with no cover image can still exist on /work, but it cannot create a blank landing-page image or appear in Hero.

Restart frontend and hard refresh the site (Ctrl+Shift+R).
