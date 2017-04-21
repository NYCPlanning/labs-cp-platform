# sitemap.js
Generates a txt sitemap (one url per line) for facility detail pages

## To Use:
Navigate to `scripts`

Run `node sitemap.js`

That's it, the script will make an API call to the carto server to get a list of facilities uids, and will compost a url for each one in `public/sitemap.txt`.
