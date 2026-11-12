---
name: Yaechan Lee
description: A technical product portfolio built around actual interfaces and concrete design decisions.
colors:
  paper: "#fcfcfc"
  ink: "#18202b"
  muted: "#586372"
  line: "#dce1e7"
  accent: "#2255d9"
  accent-deep: "#173fa8"
  source-success: "#176647"
  tint: "#f0f3f7"
  dark: "#151c28"
typography:
  display:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(34px, 3.5vw, 52px)"
    fontWeight: 650
    lineHeight: 1.32
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "24px"
    fontWeight: 650
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  body-compact:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  label-detail:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  text-link:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  square: "0"
spacing:
  compact: "8px"
  inline: "12px"
  inset: "16px"
  group: "24px"
  block: "32px"
  section: "48px"
  spread: "64px"
  major: "96px"
components:
  text-link:
    textColor: "{colors.accent}"
    typography: "{typography.text-link}"
    padding: "8px 0"
  language-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: "36px"
  language-button-hover:
    textColor: "{colors.accent}"
  desk-scope:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "9px 14px"
    rounded: "{rounded.square}"
  desk-scope-selected:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
  desk-run:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    padding: "15px 20px"
    rounded: "{rounded.square}"
  desk-run-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "#ffffff"
  event-link:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    padding: "13px 16px"
    rounded: "{rounded.square}"
  event-link-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "#ffffff"
  media-frame:
    backgroundColor: "{colors.tint}"
    padding: "24px"
    rounded: "{rounded.square}"
  viewer-action:
    backgroundColor: "#273244"
    textColor: "#ffffff"
    padding: "10px 16px"
    rounded: "{rounded.square}"
  viewer-action-hover:
    backgroundColor: "#3a4b67"
    textColor: "#ffffff"
  contact-action:
    textColor: "#ffffff"
    padding: "16px 0 10px"
---

# Design System: Yaechan Lee

## Overview

**Creative North Star: "The Technical Product Monograph"**

A neutral technical portfolio makes actual software the visual material. Cool-white ground, ink headings, and cobalt actions hold together work with very different interfaces. Pretendard carries both Korean and English, from the role statement to compact project metadata.

Projects read as exhibits: a product name, subtitle, and context identify the work before its actual media and concrete explanation. Thin rules and open columns establish structure; dark product stages and the contact field provide contrast without introducing a separate identity.

**Key Characteristics:**
- Cool-white surfaces, dark ink, and cobalt interaction states.
- One self-hosted bilingual sans serif with a controlled heading hierarchy.
- Actual product captures, square frames, and visible contextual information.
- Equal project and collaborator contact paths, with keyboard-accessible controls.

Recorded from `src/index.css`, `src/components/Site.jsx`, `src/components/CaseStudy.jsx`, and `src/components/Notes.jsx`, and the local Signal Desk extension in `src/components/IntelligenceHub.jsx` and its stylesheet, including the final responsive overrides. This replaces the rejected bookish identity. Product claims and page strategy remain in `Product.md`, `.impeccable/direction.md`, and the relevant surface brief.

## Colors

A single cobalt accent sits within a cool neutral palette. The frontmatter owns the exact shared colors; product screenshots retain their native palettes.

### Primary

- **Cobalt (`accent`)** identifies text actions, ordinary hover states, the event and agent-run actions, event metadata, citations, and the human-review step in the document workflow.

The deeper cobalt (`accent-deep`) is the shared filled-action hover state. Successful source retrieval uses restrained green (`source-success`) with an explicit text status; it means a source responded, not that a place or shipment is safe. This semantic exception does not introduce a second brand accent.

### Neutral

- **Cool White (`paper`)** is the page ground and event surface.
- **Technical Ink (`ink`)** carries headings, primary text, strong rules, and the identity mark.
- **Muted Ink (`muted`)** carries supporting prose and metadata on light backgrounds.
- **Cool Rule (`line`)** divides rows and frames light media.
- **Pale Slate (`tint`)** grounds the community field, standard media frames, and quiet supporting containers.
- **Deep Ink (`dark`)** grounds the contact field. The screenshot stage uses a closely related dark surface with its own light foregrounds. Signal Desk uses Deep Ink for its compact header and Technical Ink for the selected scope.

**The Evidence Frame Rule.** Keep site chrome neutral; color inside actual product captures belongs to the product and does not become a site token.

## Typography

**Display, Body, and Label Font:** Pretendard, with Apple system and generic sans-serif fallbacks. The variable font is self-hosted with swap loading; no separate serif or monospace display family is used.

The hierarchy uses size and weight within one bilingual family. Large text is confident but compact, while paragraphs have generous leading. The scale follows content roles rather than a fixed mathematical ratio.

### Hierarchy

- **Display:** the frontmatter describes the main role statement. Case names use a larger variant (72px, weight 600, line-height 1.1), becoming 56px on mobile. The home statement becomes 38px at the intermediate breakpoint, a 28–42px clamp on mobile, and 54px at very wide widths.
- **Headline:** section storytelling generally uses 25–34px and weights 550–650. Repeated major content headings use the frontmatter headline role; section labels are smaller (20px desktop, 18px mobile).
- **Title:** product names use the frontmatter title role, becoming 20px on mobile. Writing titles use 19px, weight 550, line-height 1.5, becoming 16px on mobile.
- **Body:** substantive explanations use the frontmatter body role and generally become 15px on mobile. Case introductions are larger (18px desktop, 16px mobile). Paragraph measures are constrained within columns; case introductions stop at 780px and project body copy at 550px. The hero context currently changes to 15px at the intermediate breakpoint.
- **Label:** dates, captions, source labels, and context use 12–14px. Text actions use the frontmatter link role, becoming 13px on mobile. Signal Desk uses the compact body role for findings and the detail-label role for source coverage, execution status, citations, and scope notes; source names and subsection titles use 15px semibold. Observation and collection times use 12px with tabular numerals.

Signal Desk keeps the existing role-based scale: its section heading is 28px (25px mobile), request is 24px (21px at 1000px, 22px mobile), report title is 30px (25px mobile), and finding titles are 17px. The dark header title is 22px (20px mobile). These compact application roles supplement the portfolio hierarchy; they do not shrink general explanatory copy. The report summary remains 16px (15px mobile), with a 78ch maximum measure.

**The Reading Hierarchy Rule.** Use readable body text for explanations and compact labels for metadata. Preserve Korean word boundaries and English whitespace; keep heading tracking no tighter than -0.035em.

## Layout

A centered shell stops at 1280px, with 48px desktop gutters. Gutters become 32px at 1100px and below, and 20px at 760px and below. The sticky header is 88px tall on desktop and 72px on mobile. Scroll padding leaves room for the header. Section divisions use 1px rules; recurring spacing steps are recorded in the frontmatter, with content-specific 20px, 40px, 56px, and 80px adjustments present in the build.

Desktop uses an asymmetric two-column hero, full-width product exhibits, and title/copy spreads. DocAgent spans the full content width, with an enlarged source-review image followed by a two-column explanation and four-stage workflow. STRIX also spans the full width: its project header sits above a contained image on the left and copy on the right, with a 48px column gap. Project headers consistently place name and subtitle before media, with year and context aligned to the right. The Argus exhibit follows the same header pattern, then pairs its real screenshot with explanatory text. Case studies use a masthead, role/context definition list, anchored contents, ruled text sections, and full-width figures.

At 760px and below, the hero, DocAgent explanation, STRIX image/copy spread, Argus, community, about, case copy, and contact pair stack. The four-stage workflow becomes a vertical ordered list. The event date becomes a horizontal row above the event content. Project context metadata and the About navigation link are hidden to preserve space. Writing rows keep thumbnail, title, and arrow while omitting the source column.

Standard preview frames contain their images inside a 1.67 aspect ratio with 24px insets, reducing to 16px on mobile. The Argus frame uses 1.44. The lead FSK exhibit preserves the entire current Electrovaya interface at its native 1920 × 1080 ratio: left shipment status, central route map, right risk monitoring, and bottom voyage schedule remain visible together. This is the captured product’s composition, not a layout template for the portfolio. Its caption identifies the version and example data and offers enlargement. The DocAgent source-review capture is likewise full-width and uncropped at its native 2280 × 1280 ratio, with redaction and implementation scope stated alongside. Both use the shared evidence viewer. Signal Desk follows the monitoring exhibit on the homepage, replacing the sailing comparison controls. The release-planning simulation remains in the FSK case study as actual interface evidence with example sailings, caption, and full-image action. Homepage evidence figures extend 10px into mobile gutters. Case figures contain images without cropping and retain captions and full-image links.

Signal Desk is one square ruled workspace: a dark title row, request and scope controls, a three-column source rail, execution strip, full-width brief, and a collapsed evidence disclosure. Source status stays above the report on every screen size. Desktop task padding is 28px, report padding 32px; mobile insets are 18px. Findings form two ruled columns on desktop and stack on mobile. Scope controls wrap instead of becoming a horizontal scroller.

## Elevation & Depth

The page is structurally flat: whitespace, thin rules, and alternating neutral fields provide separation. Actual media uses a restrained soft shadow, and the dark FSK stage carries a lighter ambient shadow. This is a technical exhibit surface, not a floating-card interface. Focus uses a blue 3px outline with 5px offset, including controls on dark surfaces.

### Shadow Vocabulary

- **Product stage:** `0 8px 28px #17243a0b` gives the large dark exhibit a slight lift.
- **Contained media:** `0 4px 18px #17243a14` separates screenshots from their frame backgrounds.

**The Media Depth Rule.** Keep page sections flat; reserve soft shadows for actual media and its stage.

## Shapes

Frames, event actions, language controls, identity marks, and Signal Desk controls have square corners. One-pixel strokes organize surfaces. The small circular execution indicator is a status cue, not a rounded component language. Directional icons are inline stroked SVGs, normally 20px; compact captions and mobile rows use smaller variants.

## Components

### Text actions

Cobalt text and an inline arrow form the ordinary action. Hero actions are ink with a lower rule; both contact destinations have matching weight. Hover moves the arrow 3px over 180ms. Shared visible focus applies to links and buttons.

### Navigation and language control

The sticky translucent cool-white masthead uses a square ink identity mark, a bilingual name, visible text navigation, and a square outlined language button. The language button displays the destination language and has a full accessible name. Hover changes text to cobalt. Mobile tightens spacing and hides only the About link. A skip link appears on keyboard focus.

### Full-interface evidence viewer

A shared evidence-image component serves both the complete Electrovaya monitor and the redacted DocAgent source-review capture. Each image is an enlargement button with a zoom-in cursor and an accessible label. A separate visible caption action opens its native dialog, whose title has a unique ID so multiple exhibits remain independently labeled. The monitor retains its map and surrounding status, risk, and schedule panels; the document capture retains review fields and source evidence together. The caption and viewer note state example-data provenance or redaction and implementation scope as appropriate.

The square dark dialog leaves 16px around the viewport, uses a dim deep-ink backdrop, and divides title/actions, image, and provenance note with fine rules. It opens in fit-to-screen mode; Original size uses that asset’s supplied intrinsic dimensions with scrollable panning, and Fit to screen restores containment. The toggle exposes its state with `aria-pressed`. The image region is keyboard-focusable. A named Close control and native Escape dismissal close the dialog; page scrolling is locked while it is open and restored afterward. Reopening resets to fit mode.

The toolbar uses bordered dark buttons with a lighter hover fill. Below the mobile breakpoint it wraps, reduces padding, and keeps the image and provenance note within the viewport. Shared focus styling applies to its controls and scroll region. This is an evidence-inspection component, not a generic modal family or a live embedded dashboard.

### Signal Desk request and execution

This is a local operational extension of the monograph, separate from the client-system evidence. Three fixed requests use pressed-state scope buttons: Global signals, Around Panama, and Newark arrival. Global weather coverage is US-only while natural events and earthquakes are worldwide; Panama uses a 1,000km event radius without NWS coverage; Newark uses a 750km event radius and point-based NWS alerts. Scope selection resets the briefing, tool state, errors, and ledger selection. The scope group uses `aria-pressed`, ordinary button keyboard behavior, an ink selected fill and a pale unselected hover; it is not a tablist. The cobalt Run agent action initiates briefing generation. Scopes and run action are disabled while busy.

Source observations load as the section approaches the viewport; paid briefing generation starts only from the run control. A polite live execution strip reports ready, source connection, API querying, evidence comparison/writing, completion, or interruption. Actual tool-start and tool-end events update provider rows; a pending tool says it is querying, a completed source distinguishes retrieved records from the provider’s scoped result count, unsupported coverage remains explicit, and unavailable sources remain failed rather than zero. Collection time is available with each source in the evidence disclosure. A completed brief shows its generation time; a cache hit is labeled as a recent result. An error alert includes retry, and failed source loading has a separate retry action. Status is expressed in words, not color alone.

### Signal Desk briefing and evidence ledger

The brief leads with a 30px concrete headline (25px mobile), a single-sentence summary, and at most two numbered findings with follow-up actions. Each finding's explanation and citation live inside a native details disclosure. The source rail shows provider, source category, and retrieval status above the brief. It never equates successful retrieval or zero records with safety. Initial and running states show three execution stages, with phase changes driven by server events, plus actual elapsed seconds. A delayed-response hint appears after 15 seconds and directs visitors to already retrieved records. No simulated completion percentage or timed tool calls.

A native details disclosure titled Sources & coverage contains the evidence ledger, provider metadata, query scope and unverified items. It starts closed; citation activation opens it, filters exact record IDs, focuses its heading and scrolls it into view. Show all exposes every retrieved record, with a two-record-per-provider preview available. Source links and observation times remain distinct from retrieval and generation times. The visible footer retains the public-demo and sampled-evidence qualification; additional limits remain in the disclosure.

The pending indicator pulses only during execution; reduced-motion disables it and citation navigation scrolls immediately. Native summaries retain keyboard activation and shared focus styling. Paid generation starts only on Run; API observations may preload. Fixed scopes route directly to parallel APIs, followed by one model call for the concise grounded brief.

### Project exhibits and figures

Project names, subtitles, and context precede actual media and concrete body text. Light frames contain screenshots and add a slight image shadow; linked previews move their image upward 3px over 250ms on hover. Case figures keep caption and full-image link adjacent. Argus uses an actual homepage capture and links to the language-specific product destination.

### Document workflow

An ordered list explains receive → extract and code match → human review → order integration below the actual source-review image. It is explanatory content, not a simulated product interface. Four equal desktop columns use thin vertical separators and inline SVG arrows; the human-review title and supporting operator-judgment label use cobalt. A nearby status identifies implementation and validation scope.

At the mobile breakpoint, the stages stack with horizontal separators and downward arrows. Stage titles are 16px semibold; supporting status labels are 12px. Step explanations and the primary DocAgent explanation use 16px desktop and 15px mobile.

### Event panel and filled action

A square bordered white panel sits in the pale community field. Date and event content form columns on desktop and stack on mobile. The cobalt full-width action has white text and a trailing arrow; hover darkens the fill. Event status is supporting information below the event title, not a reusable eyebrow style.

### Writing rows

A ruled list pairs a thumbnail with a medium-weight title, source, and external arrow. The full row is a link with shared hover and focus treatments. Mobile preserves the title and arrow while reducing the thumbnail and omitting the source.

### Contact pair

Two options share heading size, copy measure, spacing, and underlined actions inside a deep-ink field. They sit in equal columns and stack on mobile with a separating rule. Light text, muted blue-gray prose, and pale-blue hover states retain contrast. The general email and booking route remain available alongside both paths.

Reduced-motion preference disables transitions, animations, and smooth scrolling. The evidence viewer is the implemented native dialog. Signal Desk adds fixed scope buttons and citation filtering; no free-text input, general-purpose modal, or generic rounded-card component family exists.

## Do's and Don'ts

### Do:

- **Do** identify each project with its name, subtitle, and context before its media and explanation.
- **Do** pair actual product evidence with readable context and a named enlargement action or full-image link where detailed inspection is needed.
- **Do** preserve the complete monitoring interface and its surrounding information panels when presenting the system; let viewers inspect it in fit and original-size modes.
- **Do** distinguish actual interface captures from explanatory workflow diagrams, and keep evidence scope visible in captions and viewer notes.
- **Do** use Pretendard across Korean and English, with explanatory body text at 16px desktop and 15px mobile.
- **Do** retain visible focus, pressed scope states, keyboard-operable citations, and reduced-motion support.
- **Do** keep business inquiries and collaborator contact paths equal in hierarchy and action styling.

### Don't:

- **Don't** restore the rejected serif identity, warm paper palette, or ornamental bookish framing.
- **Don't** replace actual product evidence with invented interface illustrations or decorative typographic mockups.
- **Don't** make small text embedded in screenshots the only source of an important explanation.
- **Don't** turn one product's colors or a compact metadata size into a default for the whole site.
- **Don't** add a rounded card, input, chip, or general-purpose modal family that the build does not implement.

Not canonized: one-off product-frame and Signal Desk chrome colors, event date sizing, and the intermediate-width 15px hero context are implementation details rather than reusable body defaults. The letterform identity marks are brand identifiers, not permission to use glyphs as interface icons. The viewer uses a named Close action without a decorative glyph; use inline SVG for future icons. No decorative kicker treatment is defined.


### Shipment story and observation map
The FSK exhibit begins with the business question: when will the equipment reach the US factory? A 38px heading (29px mobile) and two short paragraphs establish the multi-leg shipment and scheduling dependencies before the full control-tower capture. The following explanation connects changed plans, route observations and operator decisions. The end-client name is withheld in public copy and the re-rendered screenshot; FSK L&S remains identified with permission.

Signal Desk starts with Panama, then Newark and global observations. A dark geographic field uses Natural Earth land geometry, actual NASA/USGS record coordinates and a dashed query-radius boundary. Blue circular earthquake points and amber diamond natural-event points distinguish sources without implying severity. Selected observations have an outline and a side reading panel with magnitude where supplied, source date, title and original link. Previous/next buttons offer an alternative to selecting closely spaced map points. On mobile the reading panel stacks beneath the map. There is no invented vessel position, forecast track or shipment-impact assertion. Weather alerts remain in the briefing, with their omission from this point layer stated. Empty and unavailable data have distinct text states. The map preloads with public observations and adds no paid model call.

### Yakbang product case

Keep the FSK monitoring and DocAgent cases adjacent. After STRIX, an Independent products heading groups Yakbang and Argus. Yakbang uses a compact 1.35:1 split. Its cover uses the original 1536×1024 product artwork with a live HTML caption, not a compressed UI screenshot. A short narrative, three workflow rows, and two actions sit alongside it. The result action opens a native dialog containing the fictional input email and the actual generated task, deadline, and source quote as selectable HTML text. It is labeled as a transcription, not the product interface. Desktop presents input and result side by side; mobile stacks them. Preserve keyboard focus, Escape dismissal and scroll locking. No invented outcome or customer data is included.
