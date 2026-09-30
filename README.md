# Publish with GitHub Pages: read.tryfullforce.com

Final links (use these as your ad destinations):

- read.tryfullforce.com/under-the-dash  (Tony R., mobile detailer)
- read.tryfullforce.com/nobody-said-a-word  (Tire shop owner)
- read.tryfullforce.com/grandbaby-road-trip  (Grandparent road trip)
- read.tryfullforce.com/back-seat-question  (Question from the back seat)
- read.tryfullforce.com/quiet-stretch  (Craig P., land surveyor, mileage angle)
- read.tryfullforce.com/oil-pressure  (Rob M., dyno tuner, oil pressure)

Every buy button, sticky bar, logo and checker link on all six pages goes to the product page:
https://www.tryfullforce.com/products/fullforce%E2%84%A2-afm-dfm-disabler
(Verified live, $84.99.) The root page (read.tryfullforce.com) also redirects there.

## Steps

1. Create a new GitHub repo (public, since free accounts need that for Pages). Name it anything, for example `ff-pages`.
2. Upload everything in this folder to the repo root: the six page folders, index.html, CNAME. On github.com use Add file, then Upload files, and drag the contents in (drag the folders too). Commit to `main`.
3. Repo Settings, Pages: Source is "Deploy from a branch", Branch is `main`, folder `/ (root)`. Save.
4. Same page, Custom domain: enter `read.tryfullforce.com` and save. (The CNAME file already contains it.)
5. DNS: add a CNAME record. Name `read`, value `tryfullforce.github.io` (organization name only, no repo name). Where: your registrar's DNS page, or if the domain is managed by Shopify, Shopify admin, Settings, Domains, your domain, DNS settings, Add custom record.
6. Wait 10 to 60 minutes, then tick "Enforce HTTPS" in the Pages settings.
7. Open every link on your phone and tap every button to confirm it lands on the product page.
8. Meta Pixel 835098329258243 is already installed in all six pages (PageView on load, ViewContent, and a custom AdvertorialCTAClick on every button). After deploying, open a page with the Meta Pixel Helper Chrome extension or Events Manager, Test events, to confirm it fires.

To update a page later: replace its index.html in the repo and commit. It redeploys in a minute.
