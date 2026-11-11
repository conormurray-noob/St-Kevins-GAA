# St. Kevin's Website — Roadmap & Open Items

Logged 11 November 2026 after the committee presentation.

## Waiting on people

| Item | Who | Notes |
| --- | --- | --- |
| Club history for the website | James O'Donnell | Goes in "Who We Are" on Our Club (admin → ⚙️ Club Details / page text) |
| Foireann membership booking link | Sinéad | Paste into admin → ⚙️ Club Details → "Membership link"; all Join buttons use it |
| Mentor contacts for each team | Team mentors / secretary | Admin → 👥 Teams & Mentors. Get each mentor's consent before publishing a phone number |
| ~~Club Notes WhatsApp invite link~~ | Done | Live on site + QR; print QR at public/whatsapp-club-notes-qr.png |
| Regenerate the DecapBridge GitHub token | Conor | Token expired 22 Oct 2026; permissions fixed 11 Nov. Regenerate, paste into DecapBridge → site settings |
| Real photos, policy documents, training schedule, membership prices, Saints opening hours | Committee | See committee question list |

## To build / decide

- [x] Tags on news articles (U14 Boys, U14 Girls, Senior, Ladies, etc.) with filtering
- [x] Teams & mentors contacts section
- [x] WhatsApp Club Notes sign-up button (shows once the invite link is added)
- [x] Membership link slot for Foireann
- [ ] Admin login for pro.stkevins.kildare@gaa.ie (DecapBridge invite)
- [ ] Move to the stkevinsgfc.ie domain (registered with Blacknight) — see "Domain switch" below
- [ ] ClubZap alternatives — research in progress
- [ ] Pitch-booking platforms that can hook into the site (TimeTree has no API) — research in progress
- [ ] Optional: email-to-website news posting
- [ ] Optional: Stripe payments for astro hire

## Domain switch: stkevinsgfc.ie (Blacknight)

What's there today (checked 11 Nov 2026):

- Website: stkevinsgfc.ie points at ClubZap (AWS addresses; `www` → a Heroku host).
- **DNS is not managed at Blacknight.** The nameservers are DNSimple
  (ns1–ns4.dnsimple.com), most likely set up by ClubZap. Blacknight is the
  registrar, but changes made in Blacknight's DNS panel won't take effect
  while the nameservers point elsewhere.
- **The domain receives email:** MX → `inbound-smtp.cp.blacknight.com`. Any
  @stkevinsgfc.ie mailboxes must keep working through the move.

Steps:

1. ✅ Nightly lotto sync now reads ClubZap's own address
   (stkevinsgfckildare.clubzap.com/draws), so the domain move won't break it.
2. Decide whether ClubZap stays (lotto, app) — see ClubZap alternatives.
3. Find out who controls the DNSimple account (ask ClubZap support). Then
   either (a) ask ClubZap to change the records, or (b) better long-term:
   point the nameservers back to Blacknight in the Blacknight control panel,
   **after** recreating the MX record (and any SPF/TXT records — export the
   current zone first) in Blacknight DNS so email doesn't drop.
4. Netlify → Domain management → Add `stkevinsgfc.ie` and `www.stkevinsgfc.ie`;
   set the A / CNAME records it shows. HTTPS certificate is automatic.
5. Update `site_url` in `public/admin/config.yml` and the DecapBridge
   "Decap CMS login URL" to the new domain.
6. Tell ClubZap the lotto/app should carry on at stkevinsgfckildare.clubzap.com.
