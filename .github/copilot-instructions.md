# Plutchik's Wheel of Emotions - Copilot Instructions

## Project Overview

This is an interactive web application for exploring emotional dyads based on Robert Plutchik's psychoevolutionary theory of emotions. The application visualizes the 8 basic emotions and their combinations (dyads) using an interactive wheel interface.

## Core Concepts

### Plutchik's Emotion Theory
- **8 Basic Emotions**: Joy, Trust, Fear, Surprise, Sadness, Disgust, Anger, Anticipation
- **3 Intensity Levels**: Mild (outermost), Medium, Strong (innermost)
- **4 Dyad Types**: Primary (adjacent), Secondary (1 apart), Tertiary (2 apart), Opposite (across)
- **Dyad Score**: 0-6 based on combined intensity levels of two emotions

### Key Terminology
- **Dyad**: A combination of two emotions that creates a complex feeling (e.g., Joy + Trust = Love)
- **Intensity**: Each emotion has three levels - mild, medium, and strong variants
- **Emotional Wheel**: Circular visualization where emotions are positioned at specific angles

## Technology Stack

- **Vanilla JavaScript (ES6 Modules)**: No frameworks, pure JS for maximum performance
- **HTML5 Canvas**: For rendering the interactive emotion wheel with High DPI support
- **CSS3**: Modern styling with animations and gradients
- **Static Hosting**: Can be served with any static file server

## File Structure

- `index.html` - Main HTML structure and layout
- `styles.css` - All styling, animations, and responsive design
- `app.js` - Main application logic and PlutchikWheel class
- `emotionData.js` - All emotion and dyad definitions (data layer)

## Code Style Guidelines

1. **Modularity**: Keep data definitions separate from UI logic
2. **ES6 Modules**: Use `import`/`export` for module organization
3. **Canvas Rendering**: Support High DPI displays using `devicePixelRatio`
4. **Touch Support**: Always handle both mouse and touch events for mobile compatibility
5. **No Dependencies**: Maintain vanilla JavaScript without external libraries

## When Modifying Code

### Adding New Emotions or Dyads
- Add emotion data to `emotionData.js` following the existing structure
- Each emotion needs: `color`, `angle`, `label`, and `intensities` object
- Each dyad needs: `name`, `emotions` array, `description`, `explanation`, and `intensity`

### Canvas Drawing
- Always scale coordinates using `devicePixelRatio` for crisp rendering
- Maintain the coordinate system: center at (300, 300), angles in degrees from 0-360
- Use the existing color scheme and blend functions

### Event Handling
- Implement both click and touch handlers
- Prevent default touch behavior to avoid double-tap zoom
- Handle touch events before click to prevent duplicate triggers

## Playwright MCP Integration

This project supports exploration via GitHub Copilot with Playwright MCP tools:
- Navigate to `http://localhost:8000`
- Click on dyad buttons and emotion segments
- Take screenshots to capture emotional insights

## Common Tasks

### Starting the Development Server
```bash
python -m http.server 8000
```

### Exploring an Emotion Dyad
1. Click on a dyad type button (Primary, Secondary, Tertiary, Opposite)
2. Select a specific dyad from the list
3. View the color blend and explanation
4. Adjust intensity levels by clicking in the result panel or wheel
