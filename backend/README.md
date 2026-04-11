# Refara Backend

Express + TypeScript API for video upload and foul-decision analysis jobs.

## Quick start

1. Install dependencies:
   npm install
2. Create env file:
   cp .env.example .env
3. Start in dev mode:
   npm run dev

The API runs on `http://localhost:4000` by default.

## Endpoints

- `GET /api/health`
- `POST /api/analyses` (multipart form-data: field `clip` + optional metadata)
- `GET /api/analyses`
- `GET /api/analyses/:analysisId`

## Notes

Current analysis logic is mock/stubbed in `src/services/analysisService.ts` so you can integrate your real CV/ML model next.
