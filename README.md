## Ilocos Norte Tourism Path Planner

This is a **Next.js 16** app that shows an onboarding flow and a map-style itinerary page (similar to Airbnb) for Ilocos Norte tourism.

### Prerequisites

- **Node.js** 20+ (recommended)
- **npm** (comes with Node)

### 1. Install dependencies

From the project root (`tourism-path-planner`):

```bash
npm install
```

Run this once when you first clone the repo or when dependencies change.

### 2. Set up Mapbox API key

The map feature requires a Mapbox access token:

1. **Message me**

2. **Create `.env.local` file:**
   - In the project root (`tourism-path-planner`), create a file named `.env.local`
   - Add your Mapbox token:

   ```bash
   NEXT_PUBLIC_MAPBOX_TOKEN=token_here
   ```

3. **Important:** 
   - Never commit `.env.local` to git (it's already in `.gitignore`)
   - Don't do anything stupid as it might cost me money
   - Don't share to others

### 3. Run the dev server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### 4. Main screens

- `/` – Welcome / landing page  
- `/onboarding` – Select interests (churches, beaches, museums, etc.)  
- `/map` – Airbnb-style list + map placeholder using data from `data/*.json`

### 5. Editing destination data

- Destination data is split by interest in the `data/` folder:
  - `churches.json`, `beaches.json`, `museums.json`, `nature.json`, `landmarks.json`, `history.json`, `cuisine.json`, `shopping.json`
- Each file is a JSON array of objects with:
  - `id`, `title`, `description`, `rating`, `reviews`, `type`, `timeRange`, `latitude`, `longitude`, `image`
- After editing JSON, just save the file; Next.js will hot-reload.

### 6. Notes

- Images use `next/image` and remote URLs from `images.unsplash.com` (already configured in `next.config.ts`).
- If `npm run dev` fails, try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
