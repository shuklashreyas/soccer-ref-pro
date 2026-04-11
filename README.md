# Refara

Refara is an AI soccer referee product that analyzes uploaded incident clips and returns a decision:

- Foul or no foul
- Restart decision (play on, free kick, penalty)
- Card recommendation (none, yellow, red)

## Project structure

- Frontend: React + Vite in `src`
- Backend: Express + TypeScript in `backend`

## Frontend

Install and run:

1. `npm install`
2. `npm run dev`

Current frontend pages are wired to mock analysis data. Next integration step is to call backend API endpoints from upload and detail pages.

## Backend

Backend scaffold includes:

- Video upload endpoint
- Analysis job lifecycle (`uploaded -> processing -> completed`)
- In-memory analysis repository
- Mock analysis service (replace with real model inference)

Run backend:

1. `cd backend`
2. `npm install`
3. `cp .env.example .env`
4. `npm run dev`

Default backend URL: `http://localhost:4000`

## API endpoints

- `GET /api/health`
- `POST /api/analyses` (multipart form-data, field name: `clip`)
- `GET /api/analyses`
- `GET /api/analyses/:analysisId`

## Training data guide

See `docs/training-data-guide.md` for a practical dataset and labeling plan tailored to manually clipped soccer incidents.
