import { EMOTIONS, ALL_DYADS, getEmotionColor, createGradient } from './emotionData.js';

class PlutchikWheel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.selectedEmotions = [];
        this.currentDyadType = 'primary';
        
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.outerRadius = 230;
        this.innerRadius = 80;
        
        this.init();
    }
    
    init() {
        this.drawWheel();
        this.setupEventListeners();
        this.displayDyadCombinations('primary');
    }
    
    drawWheel() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const emotions = Object.entries(EMOTIONS);
        const segmentAngle = (Math.PI * 2) / emotions.length;
        
        emotions.forEach(([name, data], index) => {
            const startAngle = (data.angle * Math.PI / 180) - segmentAngle / 2;
            const endAngle = startAngle + segmentAngle;
            
            // Draw emotion segment
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.arc(this.centerX, this.centerY, this.outerRadius, startAngle, endAngle);
            this.ctx.closePath();
            
            // Fill with color
            this.ctx.fillStyle = data.color;
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Highlight if selected
            if (this.selectedEmotions.includes(name)) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 5;
                this.ctx.stroke();
            }
            
            // Draw intensity layers
            for (let i = 1; i <= 3; i++) {
                const radius = this.innerRadius + (this.outerRadius - this.innerRadius) * (i / 3);
                this.ctx.beginPath();
                this.ctx.arc(this.centerX, this.centerY, radius, startAngle, endAngle);
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * i})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
            
            // Draw labels
            const labelAngle = data.angle * Math.PI / 180;
            const labelRadius = this.outerRadius + 40;
            const labelX = this.centerX + Math.cos(labelAngle) * labelRadius;
            const labelY = this.centerY + Math.sin(labelAngle) * labelRadius;
            
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 13px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.shadowBlur = 4;
            this.ctx.fillText(name, labelX, labelY);
            this.ctx.shadowBlur = 0;
        });
        
        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.innerRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    getEmotionAtPoint(x, y) {
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.innerRadius || distance > this.outerRadius) {
            return null;
        }
        
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        if (angle < 0) angle += 360;
        
        const emotions = Object.entries(EMOTIONS);
        const segmentAngle = 360 / emotions.length;
        
        for (const [name, data] of emotions) {
            let emotionAngle = data.angle;
            let diff = Math.abs(angle - emotionAngle);
            if (diff > 180) diff = 360 - diff;
            
            if (diff < segmentAngle / 2) {
                return name;
            }
        }
        
        return null;
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const emotion = this.getEmotionAtPoint(x, y);
            
            if (emotion) {
                if (this.selectedEmotions.includes(emotion)) {
                    this.selectedEmotions = this.selectedEmotions.filter(e => e !== emotion);
                } else {
                    if (this.selectedEmotions.length < 2) {
                        this.selectedEmotions.push(emotion);
                    } else {
                        this.selectedEmotions = [emotion];
                    }
                }
                
                this.drawWheel();
                
                if (this.selectedEmotions.length === 2) {
                    this.findAndDisplayDyad(this.selectedEmotions);
                }
            }
        });
        
        // Dyad type buttons
        document.querySelectorAll('.dyad-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.dyad-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const type = btn.dataset.type;
                this.currentDyadType = type;
                this.displayDyadCombinations(type);
            });
        });
    }
    
    displayDyadCombinations(type) {
        const container = document.querySelector('.dyad-combinations');
        container.innerHTML = '';
        
        const dyads = ALL_DYADS[type];
        
        dyads.forEach(dyad => {
            const item = document.createElement('div');
            item.className = 'dyad-item';
            
            const name = document.createElement('div');
            name.className = 'dyad-item-name';
            name.textContent = dyad.name.toUpperCase();
            
            const emotions = document.createElement('div');
            emotions.className = 'dyad-item-emotions';
            
            dyad.emotions.forEach(emotion => {
                const tag = document.createElement('span');
                tag.className = 'emotion-tag';
                tag.textContent = emotion;
                tag.style.backgroundColor = getEmotionColor(emotion);
                tag.style.color = '#fff';
                emotions.appendChild(tag);
            });
            
            item.appendChild(name);
            item.appendChild(emotions);
            
            item.addEventListener('click', () => {
                this.displayDyadResult(dyad);
                this.selectedEmotions = [...dyad.emotions];
                this.drawWheel();
            });
            
            container.appendChild(item);
        });
    }
    
    findAndDisplayDyad(emotions) {
        const sorted = [...emotions].sort();
        
        for (const type in ALL_DYADS) {
            const dyad = ALL_DYADS[type].find(d => {
                const dyadEmotions = [...d.emotions].sort();
                return dyadEmotions[0] === sorted[0] && dyadEmotions[1] === sorted[1];
            });
            
            if (dyad) {
                this.displayDyadResult(dyad);
                return;
            }
        }
        
        // If no predefined dyad found, show custom blend
        this.displayCustomBlend(emotions);
    }
    
    displayDyadResult(dyad) {
        const resultDisplay = document.getElementById('resultDisplay');
        const dyadName = document.getElementById('dyadName');
        const emotionBadges = document.getElementById('emotionBadges');
        const resultVisualization = document.getElementById('resultVisualization');
        const resultExplanation = document.getElementById('resultExplanation');
        
        // Animate result display
        resultDisplay.style.animation = 'none';
        setTimeout(() => {
            resultDisplay.style.animation = 'fadeInUp 0.8s ease';
        }, 10);
        
        // Set dyad name
        dyadName.textContent = dyad.name.toUpperCase();
        
        // Create emotion badges
        emotionBadges.innerHTML = '';
        dyad.emotions.forEach(emotion => {
            const badge = document.createElement('div');
            badge.className = 'emotion-badge';
            badge.textContent = emotion.toUpperCase();
            badge.style.backgroundColor = getEmotionColor(emotion);
            emotionBadges.appendChild(badge);
        });
        
        // Create color blend visualization
        const color1 = getEmotionColor(dyad.emotions[0]);
        const color2 = getEmotionColor(dyad.emotions[1]);
        const gradient = createGradient(color1, color2);
        
        resultVisualization.innerHTML = `
            <div class="color-blend" style="background: ${gradient}"></div>
        `;
        
        // Create explanation
        resultExplanation.innerHTML = `
            <div class="explanation-section">
                <h3>💫 ${dyad.name.charAt(0).toUpperCase() + dyad.name.slice(1)}</h3>
                <p>${dyad.description}</p>
            </div>
            
            <div class="explanation-section">
                <h3>🔬 Why This Dyad?</h3>
                <p>${dyad.explanation}</p>
            </div>
            
            <div class="explanation-section">
                <h3>⚡ Emotional Components</h3>
                <p><strong>${dyad.emotions[0].toUpperCase()}</strong> provides ${this.getEmotionDescription(dyad.emotions[0])}</p>
                <p><strong>${dyad.emotions[1].toUpperCase()}</strong> provides ${this.getEmotionDescription(dyad.emotions[1])}</p>
            </div>
            
            <div class="explanation-section">
                <h3>🎭 Intensity: ${dyad.intensity.toUpperCase()}</h3>
                <p>${this.getIntensityDescription(dyad.intensity)}</p>
            </div>
        `;
    }
    
    displayCustomBlend(emotions) {
        const resultDisplay = document.getElementById('resultDisplay');
        const dyadName = document.getElementById('dyadName');
        const emotionBadges = document.getElementById('emotionBadges');
        const resultVisualization = document.getElementById('resultVisualization');
        const resultExplanation = document.getElementById('resultExplanation');
        
        dyadName.textContent = `${emotions[0].toUpperCase()} + ${emotions[1].toUpperCase()}`;
        
        emotionBadges.innerHTML = '';
        emotions.forEach(emotion => {
            const badge = document.createElement('div');
            badge.className = 'emotion-badge';
            badge.textContent = emotion.toUpperCase();
            badge.style.backgroundColor = getEmotionColor(emotion);
            emotionBadges.appendChild(badge);
        });
        
        const color1 = getEmotionColor(emotions[0]);
        const color2 = getEmotionColor(emotions[1]);
        const gradient = createGradient(color1, color2);
        
        resultVisualization.innerHTML = `
            <div class="color-blend" style="background: ${gradient}"></div>
        `;
        
        resultExplanation.innerHTML = `
            <div class="explanation-section">
                <h3>🎨 Custom Emotional Blend</h3>
                <p>You've created a unique combination of ${emotions[0]} and ${emotions[1]}. While not a traditional Plutchik dyad, this blend creates an interesting emotional state.</p>
            </div>
            
            <div class="explanation-section">
                <h3>⚡ Emotional Components</h3>
                <p><strong>${emotions[0].toUpperCase()}</strong>: ${this.getEmotionDescription(emotions[0])}</p>
                <p><strong>${emotions[1].toUpperCase()}</strong>: ${this.getEmotionDescription(emotions[1])}</p>
            </div>
        `;
    }
    
    getEmotionDescription(emotion) {
        const descriptions = {
            joy: 'positive feelings, happiness, and pleasure',
            trust: 'confidence, security, and acceptance',
            fear: 'apprehension, caution, and protective responses',
            surprise: 'unexpectedness, novelty, and startle responses',
            sadness: 'sorrow, grief, and feelings of loss',
            disgust: 'revulsion, rejection, and aversion',
            anger: 'hostility, assertion, and confrontation',
            anticipation: 'expectation, forward-looking, and preparedness'
        };
        return descriptions[emotion] || 'complex emotional qualities';
    }
    
    getIntensityDescription(intensity) {
        const descriptions = {
            strong: 'This is a PRIMARY DYAD - the strongest emotional blend, formed by adjacent emotions on the wheel. These combinations create powerful, well-recognized emotional states.',
            moderate: 'This is a SECONDARY DYAD - a moderate emotional blend, with one emotion between the pair. These create complex but recognizable emotional experiences.',
            mild: 'This is a TERTIARY DYAD - a subtle emotional blend, with two emotions between the pair. These create nuanced, sophisticated emotional states.',
            complex: 'This is an OPPOSITE DYAD - a complex emotional blend of contradictory emotions. These create paradoxical or conflicted emotional experiences.'
        };
        return descriptions[intensity] || 'This blend creates a unique emotional state.';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PlutchikWheel('emotionWheel');
});
