

# AI Soccer Referee - Frontend Build Plan

## Overview
Build a dark, sporty-themed frontend for an AI Soccer Referee application with mock data. The app will have 4 main pages: Dashboard, Video Upload & Analysis, Analysis History, and Detailed Result Page.

## Design System
- **Theme:** Dark background (#0a0f1a) with neon green (#00ff87) and electric blue (#00d4ff) accents
- **Typography:** Bold, modern — sports broadcast aesthetic
- **Cards:** Dark glass-morphism style with subtle borders
- **Animations:** Subtle pulse/glow effects on key elements

## Pages & Components

### 1. Dashboard (`/`)
- Welcome header with stats overview cards (total analyses, fouls detected, cards given, accuracy %)
- Recent analyses list (last 5)
- Donut/bar charts showing foul type distribution and card breakdown (using recharts)
- Quick upload CTA button

### 2. Video Upload & Analysis (`/upload`)
- Drag-and-drop video upload zone with file picker fallback
- Upload progress bar
- Processing animation (soccer ball spinner or field animation)
- Once "processed," display the verdict with confidence scores
- Mock: simulate 3-5 second processing delay, return randomized analysis

### 3. Analysis History (`/history`)
- Table/list of past analyses with columns: date, video name, verdict, confidence, card type
- Filter by decision type (foul, card, penalty, offside)
- Search by video name
- Click row to navigate to detail page

### 4. Detailed Result Page (`/analysis/:id`)
- Video player placeholder (thumbnail + play icon)
- Verdict banner (Foul/No Foul) with confidence percentage
- Decision breakdown: card type, penalty/free kick, offside status
- Key frame highlights section (mock thumbnails with timestamps)
- Confidence scores visualized as progress bars

## Technical Details

### New Files
- `src/pages/Dashboard.tsx` — stats overview page
- `src/pages/Upload.tsx` — video upload and analysis page
- `src/pages/History.tsx` — analysis history with filters
- `src/pages/AnalysisDetail.tsx` — detailed result view
- `src/components/Navbar.tsx` — top navigation bar
- `src/components/StatsCard.tsx` — reusable stat card
- `src/components/VerdictBadge.tsx` — foul/card type badge
- `src/components/VideoDropzone.tsx` — drag-and-drop upload zone
- `src/components/AnalysisChart.tsx` — recharts wrapper for dashboard
- `src/data/mockData.ts` — mock analyses, stats, and helper functions
- `src/types/analysis.ts` — TypeScript types for analysis results

### Modified Files
- `src/index.css` — dark sporty color palette
- `src/App.tsx` — add routes for all pages
- `tailwind.config.ts` — add custom colors and animations

### Dependencies
- `recharts` — for dashboard charts
- `lucide-react` — icons (already available)

### Mock Data Shape
```text
Analysis {
  id, videoName, date, duration,
  verdict: "foul" | "no_foul",
  cardType: "none" | "yellow" | "red",
  penaltyType: "none" | "penalty" | "free_kick",
  offside: boolean,
  confidence: number (0-100),
  keyFrames: { timestamp, description, thumbnail }[]
}
```

## Implementation Order
1. Types, mock data, and color theme
2. Navbar component
3. Dashboard page with stats and charts
4. Upload page with dropzone and mock processing
5. History page with table and filters
6. Detail page with verdict display
7. Wire up routing

