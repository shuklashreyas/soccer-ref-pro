# Refara Training Data Guide

This guide is optimized for your workflow: manually clipped soccer incidents.

## 1) Define your model targets first

Primary target:
- foul_decision: `foul`, `no_foul`, `unclear`

Secondary targets:
- restart_decision: `play_on`, `direct_free_kick`, `indirect_free_kick`, `penalty_kick`
- card_decision: `none`, `yellow_card`, `red_card`

Optional targets:
- offside_flag: `yes`, `no`, `unclear`
- simulation_flag: `yes`, `no`, `unclear`

## 2) What clips to collect

Each clip should include:
- 3 to 5 seconds before contact
- Contact moment itself
- 2 to 4 seconds after contact (reaction and continuation)

Diversity checklist:
- League level: pro, semi-pro, youth
- Camera angle: broadcast, sideline, behind-goal
- Pitch zones: box, midfield, wing, transition
- Event type: tackles, shoulder challenges, handball, shirt pull, trip, charge
- Match context: open play, set pieces, counters, crowded box

## 3) Recommended dataset size

MVP baseline (manual):
- 3,000 to 8,000 labeled incidents

Usable v1:
- 15,000 to 30,000 incidents

Strong v2:
- 50,000+ incidents with balanced classes

## 4) Label schema

Use JSON per clip plus optional frame/event annotations.

Example:

```json
{
  "clip_id": "refara_000123",
  "match_id": "EPL_2025_ARS_CHE",
  "competition": "EPL",
  "camera_angle": "broadcast",
  "fps": 25,
  "duration_sec": 8.4,
  "incident_window": {
    "start_sec": 12.2,
    "contact_sec": 15.4,
    "end_sec": 20.6
  },
  "labels": {
    "foul_decision": "foul",
    "restart_decision": "direct_free_kick",
    "card_decision": "yellow_card",
    "offside_flag": "no",
    "confidence": 0.86
  },
  "actors": {
    "attacker_id": "A9",
    "defender_id": "D4",
    "goalkeeper_involved": false
  },
  "quality_flags": {
    "occlusion": "medium",
    "replay_only": false,
    "missing_leadup": false
  },
  "annotator": {
    "id": "ann_07",
    "pass": 1
  }
}
```

## 5) Labeling workflow that scales

1. Pass 1 (single annotator): quick labels + reject low-quality clips.
2. Pass 2 (second annotator): independently label 20 to 30 percent sample.
3. Adjudication pass: resolve disagreements with a senior rules reviewer.
4. Gold set creation: freeze 500 to 1500 high-agreement clips for validation.

Track inter-annotator agreement weekly (Cohen's kappa or Krippendorff alpha).

## 6) Class balance targets

Avoid a dataset dominated by `no_foul`.

Suggested distribution for training set:
- foul: 35 to 45 percent
- no_foul: 35 to 45 percent
- unclear: 10 to 20 percent

Card decisions are naturally imbalanced. Keep enough yellows/reds by targeted collection.

## 7) Hard negatives and edge cases

Explicitly collect:
- legal shoulder contacts that look dramatic
- attacker-initiated contact
- minimal contact with delayed fall
- crowded-box incidents with partial occlusion
- handball ambiguity (deflection vs deliberate)

Hard negatives are critical for reducing false positives.

## 8) Data splits

Split by match, not by clip, to prevent leakage.

- train: 70 percent
- validation: 15 percent
- test: 15 percent

Never allow clips from the same match in both train and test.

## 9) Metrics to track

Primary:
- foul_decision macro F1

Secondary:
- confusion matrix for foul/no_foul/unclear
- restart_decision F1
- card_decision F1
- calibration error (confidence quality)

Product-facing thresholding:
- if model confidence < threshold, return `unclear` + explanation.

## 10) Legal and product hygiene

- Verify usage rights for all footage.
- Keep source metadata and license records per clip.
- Remove personally identifiable overlays when needed.
- Version your dataset and labels (e.g., `dataset_v0.3`).

## 11) Suggested folder layout

```text
datasets/
  raw/
  clips/
    train/
    val/
    test/
  labels/
    train.jsonl
    val.jsonl
    test.jsonl
  docs/
    labeling_guidelines.md
    decision_rules.md
```

## 12) Next step after this backend scaffold

Integrate model inference into `backend/src/services/analysisService.ts`:
- replace mock result generation with your model call
- persist model version in each analysis record
- save frame-level rationale for explainability in UI
