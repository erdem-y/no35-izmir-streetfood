# No.35 Izmir Streetfood Demo

A website demo I made for No.35 Original Izmir Streetfood in Hamburg, with the restaurant's knowledge. The idea was that people can look at the food, read the menu and find the restaurant on their phone.

The sale did not go ahead, so I stopped before it was finished. This repo is the demo as I left it. It is not the restaurant's official website.

**Author:** Erdem Yacel · [Open the demo](https://no35-izmir-streetfood.vercel.app)

Built with React, Vite, Tailwind CSS and Motion, hosted on Vercel.

## What's in it

- Navigation, a food showcase, a menu and a contact section
- The showcase works with arrow buttons, keyboard and touch dragging
- The menu has category filters, and the navigation turns into a menu button on small screens
- Short food videos on the selected product, and a still image if reduced motion is on
- Menu and business details are in separate data files, so I can change them without touching the layout

Some images and videos are AI-generated with fal.ai. The Node scripts for that are in the repo, but they are separate from the website. You only need a `FAL_KEY` if you want to generate new files, and that can cost money. See [scripts/fal/README.md](scripts/fal/README.md).

## Run it

Needs Node.js 24 and npm.

```bash
npm ci
npm run dev
```

Then open `http://localhost:5173`. To build it, use `npm run build` and `npm run preview`. `npm run qa` runs a few basic checks on the page, the menu data and colour contrast.

## Not finished

- The address still needs to be confirmed
- No opening hours yet
- The review button opens a Google Maps search, not the review page
- The order button goes to the platform's homepage, not the restaurant's own page
- Final content approval was not completed.

The menu, prices and contact details are from when I built it and may be out of date. I did not build any ordering or payment system.

## Notes

The restaurant's name, logo and reference material are included only as context for this demo.

I used AI to help create the images and videos are AI-generated.
