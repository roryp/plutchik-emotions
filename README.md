# 🌈 Plutchik's Wheel of Emotions - Interactive Explorer

An interactive web application for exploring emotional dyads based on Robert Plutchik's psychoevolutionary theory of emotions.

![Plutchik's Wheel of Emotions](https://img.shields.io/badge/Emotions-8%20Basic-blue) ![Dyads](https://img.shields.io/badge/Dyads-32%20Total-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Features

- **Interactive Emotion Wheel**: Click on emotion segments to select different intensity levels
- **Three Intensity Levels**: Each emotion has mild, medium, and strong variants
- **Dyad Exploration**: Discover how emotions combine to create complex feelings
- **Four Dyad Types**:
  - **Primary Dyads**: Adjacent emotions (e.g., Joy + Trust = Love)
  - **Secondary Dyads**: One emotion apart (e.g., Joy + Fear = Guilt)
  - **Tertiary Dyads**: Two emotions apart (e.g., Joy + Surprise = Delight)
  - **Opposite Dyads**: Conflicting emotions (e.g., Joy + Sadness = Bittersweetness)
- **Intensity Scoring**: Dynamic scoring system (1-6) based on selected intensity levels
- **Visual Blend Display**: See color gradients representing emotional combinations
- **Detailed Explanations**: Learn about each dyad's psychological meaning

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.x (for local development server) or any static file server

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plutchik-emotions.git
cd plutchik-emotions
```

2. Start a local web server:
```bash
python -m http.server 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 📖 How to Use

1. **Select Emotions**: Click on any segment of the emotion wheel to select an emotion and intensity level
2. **View Dyads**: Choose from predefined dyad combinations on the right panel
3. **Adjust Intensities**: Click on intensity levels in the result panel to adjust the emotional strength
4. **Explore Scores**: See how different intensity combinations affect the overall dyad score (0-6)
5. **Learn**: Read detailed explanations about each emotional combination

## 🎨 Understanding the Wheel

### Basic Emotions (8)
- **Joy** (Yellow) - Happiness and pleasure
- **Trust** (Green) - Confidence and acceptance
- **Fear** (Dark Green) - Apprehension and caution
- **Surprise** (Blue) - Unexpectedness and novelty
- **Sadness** (Dark Blue) - Sorrow and grief
- **Disgust** (Purple) - Revulsion and aversion
- **Anger** (Red) - Hostility and confrontation
- **Anticipation** (Orange) - Expectation and preparedness

### Intensity Levels
- **Mild (1)**: Outermost ring - weakest form (e.g., serenity, pensiveness)
- **Medium (2)**: Middle ring - moderate intensity (e.g., joy, sadness)
- **Strong (3)**: Innermost ring - most intense (e.g., ecstasy, grief)

### Dyad Score (0-6)
The total intensity score is calculated by adding both emotion intensities:
- **6/6**: Very Strong - Maximum emotional intensity
- **5/6**: Moderate to Strong - Powerful emotional blend
- **4/6**: Moderate - Balanced emotional state
- **3/6**: Mild to Moderate - Gentle emotional blend
- **2/6**: Very Mild - Subtle emotional experience

## 🛠️ Technologies Used

- **HTML5 Canvas**: For rendering the interactive emotion wheel
- **Vanilla JavaScript**: No frameworks, pure JS for maximum performance
- **CSS3**: Modern styling with animations and gradients
- **High DPI Support**: Crisp rendering on all displays including Retina screens

## 📁 Project Structure

```
plutchik-emotions/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── app.js             # Main application logic
├── emotionData.js     # Emotion and dyad definitions
└── README.md          # Documentation
```

## 🎓 About Plutchik's Theory

Robert Plutchik's wheel of emotions is a psychological model that identifies 8 basic emotions and demonstrates how they relate to one another. Emotions can be combined to create complex feelings, and they exist at varying intensities. This model is widely used in psychology, design, and AI for understanding human emotions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Robert Plutchik for his groundbreaking work on emotion theory
- The psychology community for continued research on emotional intelligence
- All contributors who help improve this educational tool

## 📧 Contact

Your Name - [@yourhandle](https://twitter.com/yourhandle)

Project Link: [https://github.com/yourusername/plutchik-emotions](https://github.com/yourusername/plutchik-emotions)

---

Made with ❤️ for understanding human emotions
