# Plutchik's Wheel of Emotions - Agent Instructions

## About This Project

An interactive web application for exploring emotional dyads based on Robert Plutchik's psychoevolutionary theory of emotions. The app visualizes 8 basic emotions with 3 intensity levels each, and demonstrates how emotions combine to create 32 different dyads (complex emotional states).

## Project Architecture

```
plutchik-emotions/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── app.js              # Main application logic (PlutchikWheel class)
├── emotionData.js      # Emotion and dyad data definitions
└── README.md           # Documentation
```

## Key Domain Knowledge

### The 8 Basic Emotions (positioned on the wheel)
| Emotion | Angle | Mild Form | Medium Form | Strong Form |
|---------|-------|-----------|-------------|-------------|
| Joy | 0° | Serenity | Joy | Ecstasy |
| Trust | 45° | Acceptance | Trust | Admiration |
| Fear | 90° | Apprehension | Fear | Terror |
| Surprise | 135° | Distraction | Surprise | Amazement |
| Sadness | 180° | Pensiveness | Sadness | Grief |
| Disgust | 225° | Boredom | Disgust | Loathing |
| Anger | 270° | Annoyance | Anger | Rage |
| Anticipation | 315° | Interest | Anticipation | Vigilance |

### Dyad Types
- **Primary Dyads** (adjacent emotions): Love, Submission, Alarm, Disappointment, Remorse, Contempt, Aggression, Optimism
- **Secondary Dyads** (1 apart): Guilt, Curiosity, Despair, Unbelief, Envy, Cynicism, Pride, Hope
- **Tertiary Dyads** (2 apart): Delight, Sentimentality, Shame, Outrage, Pessimism, Morbidness, Dominance, Anxiety
- **Opposite Dyads** (across wheel): Bittersweetness, Ambivalence, Frozenness, Confusion

## Working with Playwright MCP

When using Playwright MCP tools to interact with this application:

1. **Start the server first**: `python -m http.server 8000`
2. **Navigate**: Use `mcp_playwright_browser_navigate` to go to `http://localhost:8000`
3. **Explore dyads**: Click on dyad type buttons, then specific dyads
4. **Capture insights**: Take screenshots to document emotional combinations

### Example Playwright Workflow
```
1. Navigate to http://localhost:8000
2. Click the "Tertiary Dyads" button to see tertiary emotional combinations
3. Click on "ANXIETY" to see how Anticipation + Fear creates Anxiety
4. Take a screenshot to capture the visualization
```

## Code Modification Guidelines

### Adding a New Emotion
1. Add the emotion definition to `EMOTIONS` in `emotionData.js`
2. Include all three intensity levels with appropriate colors
3. Position it at the correct angle (multiples of 45° for 8 emotions)

### Adding a New Dyad
1. Add to the appropriate array in `emotionData.js` (PRIMARY_DYADS, SECONDARY_DYADS, etc.)
2. Include `name`, `emotions` array, `description`, `explanation`, and `intensity`
3. The UI will automatically pick up the new dyad

### Modifying the Wheel Rendering
- All drawing logic is in `app.js` within the `PlutchikWheel` class
- The `drawWheel()` method handles all canvas rendering
- Maintain High DPI support by using `this.dpr` for scaling

## Testing Changes

1. Start the local server: `python -m http.server 8000`
2. Open `http://localhost:8000` in a browser
3. Test on both desktop and mobile (touch interactions)
4. Verify dyad selections highlight correctly on the wheel
5. Check that intensity changes update the score display

## Common User Requests

### "What emotions create [X]?"
- Search `emotionData.js` for the dyad name
- The `emotions` array contains the two component emotions

### "Show me the opposite of [emotion]"
- Opposite emotions are 180° apart on the wheel
- Joy ↔ Sadness, Trust ↔ Disgust, Fear ↔ Anger, Surprise ↔ Anticipation

### "Explain the intensity scoring"
- Mild = 1, Medium = 2, Strong = 3
- Total score is sum of both intensities (range: 2-6)
