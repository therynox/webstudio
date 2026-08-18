# THERYNOX JSON-LD implementation

Added automatic structured data to the existing `SEO` component.

Schemas:
- Homepage/global: Organization + WebSite
- Blog detail: Article + BreadcrumbList
- Project detail: CreativeWork + BreadcrumbList
- Service detail: Service + BreadcrumbList
- Admin custom JSON-LD remains supported as an additional schema.

The schema is generated client-side from the same public SEO endpoint already used for title/meta/canonical data.
