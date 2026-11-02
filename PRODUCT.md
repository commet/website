# Yaechan Lee / 이예찬

Personal website at https://yclee.today, React/Vite, existing Vercel project `website`.

## Confirmed brief
- Present an AX business leader who also builds the systems himself.
- Project inquiries and connections with collaborators have equal priority.
- Korean is the default language; retain complete English support.
- User approved a substantial redesign, led by real work rather than an application to one employer.
- Lead with FSK logistics work and actual authorized screenshots, then STRIX and Argus, community and selected writing, brief background and personal interests, and equal contact paths.
- Arkpoint Partner / Enterprise AX leadership is the current direction. No invented start date; no public profit-sharing or spinout terms. Historical work is not attributed to Arkpoint.
- Beyond Deploy: organizing team. FDE톤: participating in planning, not sole organizer. Event 2026-12-05 13:00–18:00, Sogang University; registration deadline 2026-11-15 23:59 KST. Link to official event for details. Do not imply completed attendance or success.
- FSK name and actual project screenshots are explicitly authorized for publication. Use already redacted demonstration screenshots; no raw customer records.
- Keep the valid SK On STRIX experience: 600+ registrations, approximately 30 daily users in strategy division, 1,000+ mySUNI learners/reach. These populations are distinct. Do not treat training reach as usage.
- No unverified cost-saving claims, invented production status, or recovered-money claims. Document integration is implementation/validation; distinguish it from a running deployed control tower.
- Praxis remains part of independent work history. Argus stays a live personal product. Overture is now Argus, not another independent live project. SAYU remains as an art-interest project archive while its domain is unavailable.
- Preserve existing Calendly 15-minute meeting route alongside email and LinkedIn.

## Success and scope
Visitors can understand the work, inspect real evidence, and choose either contact path on mobile and desktop. Existing STRIX route keeps working. Remove job-application pitch, empty resume download, dead live-product links, metric clutter, and repetitive claims. Preserve unrelated APIs and existing deployment target.

## Source trail
Existing website source and live website reviewed 2026-11-02. FSK evidence: fsk-ops/sites/arkpoint-ax-home/public/proof/{ct-map,doc-check}.webp; research/dt-automation/22-시연-대본-1023.md; apps/ops-deck/docs/HANDOFF-collection-reconciliation.md. Event: https://fdethon.beyonddeploy.kr/ and https://beyonddeploy.kr/. Writing links are preserved from existing authored site.

## Boundaries
FSK result metrics require separate verification before adding. No confidential business terms, fabricated testimonials, or legal/security compliance guarantees. No new backend or lead database. Contact opens the user's email client or existing booking page.

## Revision brief (2026-11-02)
The user rejected the first implementation as underdeveloped in language, content, and design. They specifically asked to inspect the actual Electrovaya control-tower work and show stronger work. Replace the previous quiet-bookish direction with a coherent, rigorous portfolio system. Avoid generic AI-marketing phrases, airy name-first composition, disconnected project styling, and copying research uncertainty into customer-facing filler. Use concrete working scenarios, actual design decisions, and a stronger hierarchy of selected work. Equal business and collaborator contact paths remain.

## Revision evidence
Electrovaya live app at https://fsk-ops.site/electrovaya/ was inspected; the public route is gated and reports an unset password. The actual app source was therefore run locally with the repository's existing `tests/test_electrovaya_peta.py` SAIL/PETA fixtures, without accessing production feeds or changing the FSK repo. `public/images/work/sailing-plan.png` and `sailing-delay.png` capture only the schedule/simulator region. The fixture demonstrates a 3-day release shift causing a 7-day arrival shift through reassignment to the following weekly sailing; it is not a measured customer outcome. Exclude client quantities, contacts, contracts and action lists. `public/images/work/argus.png` is the public Argus homepage captured on 2026-11-02. All three are genuine interface captures, not generated mockups.


## Final map requirement
User clarified that the lead must show the complete Electrovaya Busan–Newark monitoring screen, including surrounding information panels, not the separate general FSK map and not a map-only crop. `public/images/work/electrovaya-full.png` is a full viewport capture of the actual app rendered locally with example monitoring data, existing test sailings/berth fixtures, and a synthetic storm named DEMO A. All displayed figures are demonstration data. The local fixture uses the repository's statistics function for the generated port series. Both app header/footer and portfolio caption explicitly label the data. Production APIs return401, so no authenticated production data was obtained. Native modal supports fit/original size and Escape. The original general FSK map remains only as supporting evidence in the FSK detail page.

## Unresolved source correction (2026-11-02)
The user rejected `electrovaya-full.png` as an old version and specified information panels on both sides of the map. The asset above is therefore NOT approved evidence and must not be deployed as the latest interface. Fetching fsk-ops found main at `4fef7c0364b80046e172884a1914292dd1d7b04f`, with the latest Electrovaya edit at `67dc6c7f36b697bbd642f09a4226bfd9bea653ae` (2026-10-29). That source was rendered separately at localhost:5195; it has a map on the left and information cards on the right, so it still does not establish the requested both-side layout. Exact user URL requested. Do not substitute a guessed layout, relabel old images as current, or promote the staged revision until this is resolved. No website asset was replaced during this inspection.

## Resolved evidence and copy (2026-11-02)
The user supplied the separate authoritative repository https://github.com/commet/electrovaya/. Its main commit `b4f7413`, version 1.2.0 (2026-11-01), contains the requested central map, left shipment status, right segment monitoring and bottom voyage dock. The full image now captures that exact interface at 1920×1080, run locally with example feed fixtures and anonymized cargo quantities. Header and caption identify the demonstration; `asof=2026-12-24` enables the product's existing scenario-date control. No production authentication was bypassed. The earlier simulator remains a separate, explicitly labelled earlier-version exhibit.
The user also asked for sharper copy and stronger DocAgent visualization. Hero now states “AI 사업을 이끌고, 제품을 직접 만듭니다.” Role descriptions, project titles, community/about/contact and social metadata have been revised together in Korean and English. Authored LinkedIn article titles remain unchanged.
DocAgent evidence reviewed: local docextract review UI, FMS Doc Agent 검토 flow/status diagrams, FMSDOCAGENT design documents and the October 23 rehearsal notes. The public page enlarges the already-redacted source-review screenshot and adds a public-facing four-stage workflow explanation. Internal schema, customer matrices and system addresses were not copied into public assets. The workflow remains labelled implementation/validation; no accuracy or full-production claims added. Both full-interface exhibits share an accessible fit/original-size image viewer.

## Company context (2026-11-02)
The user asked to explain FSK for visitors unfamiliar with the company. Public headings and case introductions identify it as 물류기업 FSK L&S (logistics company), and DocAgent is introduced as logistics document automation. No unverified company-size or group-affiliation claim is added.
