# Don't Click That

A modern security awareness application built with Svelte and Vite. Clean architecture, optimized workflow, and developer-friendly structure.

---

## Why?

I am building this for the **Congressional App Challenge** for the UT-004 region. This is built because I hate getting scammed and want to help stop it all around the world.

## Deplyoment

This is built and deployed on **Railway Hobby Plan** which I HIGHLY recommend to new devs.

## File Structure

```text
src/
├── App.svelte
├── app.css
├── main.js
├── assets/
└── lib/
    ├── assets/
    │   └── images/
    ├── components/
    │   ├── core/
    │   │   ├── Button.svelte
    │   │   └── Card.svelte
    │   ├── screens/
    │   │   ├── GameScreen.svelte
    │   │   ├── HowToPlay.svelte
    │   │   ├── Info.svelte
    │   │   ├── InfoScreen.svelte
    │   │   ├── SplashScreen.svelte
    │   │   └── WinScreen.svelte
    │   └── widgets/
    │       └── SitePreview.svelte
    └── stores/
        ├── game.ts
        └── levels.ts
```

- `core/` is for lower level base components I use a LOT
- `screens/` is for the actual screens I rotate between in `App.svelte`
- `widgets/` is for more advanced components I use within the screens
