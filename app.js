import { EMOTIONS, ALL_DYADS, getEmotionColor, createGradient } from './emotionData.js';

class PlutchikWheel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.selectedEmotions = [];
        this.selectedIntensities = {}; // Track selected intensities: { emotion: 'mild'|'medium'|'strong' }
        this.currentDyadType = 'primary';
        
        // Get device pixel ratio for sharp rendering
        this.dpr = window.devicePixelRatio || 1;
        
        // Set display size (css pixels)
        const displayWidth = 600;
        const displayHeight = 600;
        
        // Set actual size in memory (scaled to account for extra pixel density)
        this.canvas.width = displayWidth * this.dpr;
        this.canvas.height = displayHeight * this.dpr;
        
        // Set display size (css pixels)
        this.canvas.style.width = displayWidth + 'px';
        this.canvas.style.height = displayHeight + 'px';
        
        // Scale all drawing operations by the dpr
        this.ctx.scale(this.dpr, this.dpr);
        
        this.centerX = displayWidth / 2;
        this.centerY = displayHeight / 2;
        this.outerRadius = 230;
        this.innerRadius = 80;
        
        this.init();
    }
    
    init() {
        this.drawWheel();
        this.setupEventListeners();
        this.displayDyadCombinations('primary');
    }
    
    createClickableLabels() {
        const overlay = document.getElementById('emotionLabels');
        if (!overlay) {
            console.error('emotionLabels overlay not found');
            return;
        }
        overlay.innerHTML = '';
        
        const emotions = Object.entries(EMOTIONS);
        
        emotions.forEach(([name, data]) => {
            const centerAngle = data.angle * Math.PI / 180;
            
            // Create clickable labels for each intensity
            const intensities = ['mild', 'medium', 'strong'];
            
            // Calculate radii matching the drawing in drawWheel
            const innerRadius = this.innerRadius;
            const midRadius1 = innerRadius + 50;
            const midRadius2 = midRadius1 + 50;
            const outerRadius = midRadius2 + 50;
            
            // Position labels at the center of each ring
            const radii = [
                (midRadius2 + outerRadius) / 2,   // mild (outermost)
                (midRadius1 + midRadius2) / 2,    // medium (middle)
                (innerRadius + midRadius1) / 2    // strong (innermost)
            ];
            
            intensities.forEach((intensity, idx) => {
                const radius = radii[idx];
                
                // Add radial offset for better label spacing
                // Push labels further out based on their ring
                const radialOffset = idx === 0 ? 10 : (idx === 1 ? 5 : 0);
                const adjustedRadius = radius + radialOffset;
                
                const labelX = this.centerX + Math.cos(centerAngle) * adjustedRadius;
                const labelY = this.centerY + Math.sin(centerAngle) * adjustedRadius;
                
                const label = document.createElement('div');
                label.className = 'emotion-label-clickable';
                label.textContent = data.intensities[intensity].label;
                label.dataset.emotion = name;
                label.dataset.intensity = intensity;
                
                // Calculate rotation angle to align with radial direction
                // Convert to degrees and adjust so text reads outward from center
                let rotationDeg = data.angle;
                
                // Adjust rotation for left side of wheel to keep text readable
                if (rotationDeg > 90 && rotationDeg < 270) {
                    rotationDeg = rotationDeg + 180;
                }
                
                // Center the label and rotate it
                label.style.left = labelX + 'px';
                label.style.top = labelY + 'px';
                label.style.transform = `translate(-50%, -50%) rotate(${rotationDeg}deg)`;
                
                // Check if this is selected
                if (this.selectedEmotions.includes(name) && this.selectedIntensities[name] === intensity) {
                    label.classList.add('selected');
                }
                
                label.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleIntensityClick(name, intensity);
                });
                
                overlay.appendChild(label);
            });
        });
    }
    
    handleIntensityClick(emotion, intensity) {
        // Check if this exact emotion+intensity is already selected
        const isSelected = this.selectedEmotions.includes(emotion) && this.selectedIntensities[emotion] === intensity;
        
        if (isSelected) {
            // Deselect
            this.selectedEmotions = this.selectedEmotions.filter(e => e !== emotion);
            delete this.selectedIntensities[emotion];
        } else {
            // If this emotion is already selected with different intensity, just update intensity
            if (this.selectedEmotions.includes(emotion)) {
                this.selectedIntensities[emotion] = intensity;
            } else {
                // New emotion
                if (this.selectedEmotions.length >= 2) {
                    // Remove oldest selection
                    const oldEmotion = this.selectedEmotions.shift();
                    delete this.selectedIntensities[oldEmotion];
                }
                this.selectedEmotions.push(emotion);
                this.selectedIntensities[emotion] = intensity;
            }
        }
        
        this.drawWheel();
        
        if (this.selectedEmotions.length === 2) {
            this.findAndDisplayDyad(this.selectedEmotions);
        }
    }
    
    drawWheel() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const emotions = Object.entries(EMOTIONS);
        const segmentAngle = (Math.PI * 2) / emotions.length;
        
        emotions.forEach(([name, data], index) => {
            const centerAngle = data.angle * Math.PI / 180;
            const startAngle = centerAngle - segmentAngle / 2;
            const endAngle = centerAngle + segmentAngle / 2;
            
            const intensities = data.intensities;
            
            if (intensities) {
                // Define radii for the three concentric rings
                const innerRadius = this.innerRadius;
                const midRadius1 = innerRadius + 50;
                const midRadius2 = midRadius1 + 50;
                const outerRadius = midRadius2 + 50;
                
                // Draw strong (innermost layer) - closest to center, most intense
                this.ctx.beginPath();
                this.ctx.arc(this.centerX, this.centerY, midRadius1, startAngle, endAngle);
                this.ctx.arc(this.centerX, this.centerY, innerRadius, endAngle, startAngle, true);
                this.ctx.closePath();
                this.ctx.fillStyle = intensities.strong.color;
                this.ctx.fill();
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.lineWidth = 1.5;
                this.ctx.stroke();
                
                // Draw medium (middle layer)
                this.ctx.beginPath();
                this.ctx.arc(this.centerX, this.centerY, midRadius2, startAngle, endAngle);
                this.ctx.arc(this.centerX, this.centerY, midRadius1, endAngle, startAngle, true);
                this.ctx.closePath();
                this.ctx.fillStyle = intensities.medium.color;
                this.ctx.fill();
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.lineWidth = 1.5;
                this.ctx.stroke();
                
                // Draw mild (outermost layer) - at the edge, least intense
                this.ctx.beginPath();
                this.ctx.arc(this.centerX, this.centerY, outerRadius, startAngle, endAngle);
                this.ctx.arc(this.centerX, this.centerY, midRadius2, endAngle, startAngle, true);
                this.ctx.closePath();
                this.ctx.fillStyle = intensities.mild.color;
                this.ctx.fill();
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.lineWidth = 1.5;
                this.ctx.stroke();
                
                // Highlight if selected - draw glow on specific intensity ring
                if (this.selectedEmotions.includes(name)) {
                    const selectedIntensity = this.selectedIntensities[name];
                    let highlightStartRadius, highlightEndRadius;
                    
                    if (selectedIntensity === 'strong') {
                        highlightStartRadius = innerRadius;
                        highlightEndRadius = midRadius1;
                    } else if (selectedIntensity === 'medium') {
                        highlightStartRadius = midRadius1;
                        highlightEndRadius = midRadius2;
                    } else { // mild
                        highlightStartRadius = midRadius2;
                        highlightEndRadius = outerRadius;
                    }
                    
                    // Draw glowing highlight on the selected ring
                    this.ctx.beginPath();
                    this.ctx.arc(this.centerX, this.centerY, highlightEndRadius, startAngle, endAngle);
                    this.ctx.arc(this.centerX, this.centerY, highlightStartRadius, endAngle, startAngle, true);
                    this.ctx.closePath();
                    
                    // Create a glowing effect
                    this.ctx.strokeStyle = '#FFD700';
                    this.ctx.lineWidth = 6;
                    this.ctx.shadowColor = '#FFD700';
                    this.ctx.shadowBlur = 20;
                    this.ctx.stroke();
                    
                    // Draw inner white border for emphasis
                    this.ctx.strokeStyle = '#ffffff';
                    this.ctx.lineWidth = 3;
                    this.ctx.shadowBlur = 0;
                    this.ctx.stroke();
                }
                
                // Draw labels directly on canvas for each intensity level
                this.ctx.shadowBlur = 0;
                
                // Strong label (innermost)
                const strongRadius = (innerRadius + midRadius1) / 2;
                const strongX = this.centerX + Math.cos(centerAngle) * strongRadius;
                const strongY = this.centerY + Math.sin(centerAngle) * strongRadius;
                this.drawLabel(intensities.strong.label, strongX, strongY, '10px', 'bold', '#ffffff');
                
                // Medium label (middle layer)
                const mediumRadius = (midRadius1 + midRadius2) / 2;
                const mediumX = this.centerX + Math.cos(centerAngle) * mediumRadius;
                const mediumY = this.centerY + Math.sin(centerAngle) * mediumRadius;
                this.drawLabel(intensities.medium.label, mediumX, mediumY, '10px', 'bold', '#000000');
                
                // Mild label (outermost)
                const mildRadius = (midRadius2 + outerRadius) / 2;
                const mildX = this.centerX + Math.cos(centerAngle) * mildRadius;
                const mildY = this.centerY + Math.sin(centerAngle) * mildRadius;
                this.drawLabel(intensities.mild.label, mildX, mildY, '10px', 'normal', '#000000');
                
                // Draw main emotion label outside the wheel
                const labelRadius = outerRadius + 40;
                const labelX = this.centerX + Math.cos(centerAngle) * labelRadius;
                const labelY = this.centerY + Math.sin(centerAngle) * labelRadius;
                
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = 'bold 14px sans-serif';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
                this.ctx.shadowBlur = 4;
                this.ctx.fillText(name, labelX, labelY);
                this.ctx.shadowBlur = 0;
            }
        });
        
        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.innerRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    drawLabel(text, x, y, fontSize, fontWeight, textColor = '#000000') {
        this.ctx.fillStyle = textColor;
        this.ctx.font = `${fontWeight} ${fontSize} sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Add text stroke for better readability
        this.ctx.strokeStyle = textColor === '#ffffff' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(text, x, y);
        
        // Draw the fill text on top
        this.ctx.fillText(text, x, y);
    }
    
    getEmotionAtPoint(x, y) {
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const innerRadius = this.innerRadius;
        const midRadius1 = innerRadius + 50;
        const midRadius2 = midRadius1 + 50;
        const outerRadius = midRadius2 + 50;
        
        if (distance < innerRadius || distance > outerRadius) {
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
                // Determine intensity based on distance
                let intensity;
                if (distance >= innerRadius && distance < midRadius1) {
                    intensity = 'strong'; // innermost = strongest
                } else if (distance >= midRadius1 && distance < midRadius2) {
                    intensity = 'medium';
                } else if (distance >= midRadius2 && distance <= outerRadius) {
                    intensity = 'mild'; // outermost = mildest
                }
                
                return { emotion: name, intensity: intensity };
            }
        }
        
        return null;
    }
    
    setupEventListeners() {
        // Canvas click handler for selecting emotions
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const emotionData = this.getEmotionAtPoint(x, y);
            if (emotionData) {
                this.handleIntensityClick(emotionData.emotion, emotionData.intensity);
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
                this.selectedEmotions = [...dyad.emotions];
                // Set default intensities if not already set
                if (!this.selectedIntensities[dyad.emotions[0]]) {
                    this.selectedIntensities[dyad.emotions[0]] = 'medium';
                }
                if (!this.selectedIntensities[dyad.emotions[1]]) {
                    this.selectedIntensities[dyad.emotions[1]] = 'medium';
                }
                this.displayDyadResult(dyad);
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
        
        // Create color blend visualization with intensity info
        const color1 = getEmotionColor(dyad.emotions[0]);
        const color2 = getEmotionColor(dyad.emotions[1]);
        const gradient = createGradient(color1, color2);
        
        const emotion1Data = EMOTIONS[dyad.emotions[0]];
        const emotion2Data = EMOTIONS[dyad.emotions[1]];
        
        // Set default intensities if not already selected
        if (!this.selectedIntensities[dyad.emotions[0]]) {
            this.selectedIntensities[dyad.emotions[0]] = 'medium';
        }
        if (!this.selectedIntensities[dyad.emotions[1]]) {
            this.selectedIntensities[dyad.emotions[1]] = 'medium';
        }
        
        resultVisualization.innerHTML = `
            <div class="color-blend" style="background: ${gradient}"></div>
            <div class="intensity-info">
                <div class="intensity-column">
                    <h4>${dyad.emotions[0].toUpperCase()}</h4>
                    <div class="intensity-levels">
                        <div class="intensity-level mild clickable ${this.selectedIntensities[dyad.emotions[0]] === 'mild' ? 'selected' : ''}" data-emotion="${dyad.emotions[0]}" data-intensity="mild">
                            <span class="level-label">Mild (1):</span>
                            <span class="level-name">${emotion1Data.intensities.mild.label}</span>
                        </div>
                        <div class="intensity-level medium clickable ${this.selectedIntensities[dyad.emotions[0]] === 'medium' ? 'selected' : ''}" data-emotion="${dyad.emotions[0]}" data-intensity="medium">
                            <span class="level-label">Medium (2):</span>
                            <span class="level-name">${emotion1Data.intensities.medium.label}</span>
                        </div>
                        <div class="intensity-level strong clickable ${this.selectedIntensities[dyad.emotions[0]] === 'strong' ? 'selected' : ''}" data-emotion="${dyad.emotions[0]}" data-intensity="strong">
                            <span class="level-label">Strong (3):</span>
                            <span class="level-name">${emotion1Data.intensities.strong.label}</span>
                        </div>
                    </div>
                </div>
                <div class="intensity-column">
                    <h4>${dyad.emotions[1].toUpperCase()}</h4>
                    <div class="intensity-levels">
                        <div class="intensity-level mild clickable ${this.selectedIntensities[dyad.emotions[1]] === 'mild' ? 'selected' : ''}" data-emotion="${dyad.emotions[1]}" data-intensity="mild">
                            <span class="level-label">Mild (1):</span>
                            <span class="level-name">${emotion2Data.intensities.mild.label}</span>
                        </div>
                        <div class="intensity-level medium clickable ${this.selectedIntensities[dyad.emotions[1]] === 'medium' ? 'selected' : ''}" data-emotion="${dyad.emotions[1]}" data-intensity="medium">
                            <span class="level-label">Medium (2):</span>
                            <span class="level-name">${emotion2Data.intensities.medium.label}</span>
                        </div>
                        <div class="intensity-level strong clickable ${this.selectedIntensities[dyad.emotions[1]] === 'strong' ? 'selected' : ''}" data-emotion="${dyad.emotions[1]}" data-intensity="strong">
                            <span class="level-label">Strong (3):</span>
                            <span class="level-name">${emotion2Data.intensities.strong.label}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dyad-score">
                <h3>🎯 Dyad Intensity Score</h3>
                <div class="score-breakdown">
                    <div class="score-item">
                        <span class="score-label">${dyad.emotions[0]}:</span>
                        <span class="score-value">${this.getIntensityScore(this.selectedIntensities[dyad.emotions[0]])}</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">${dyad.emotions[1]}:</span>
                        <span class="score-value">${this.getIntensityScore(this.selectedIntensities[dyad.emotions[1]])}</span>
                    </div>
                    <div class="score-total">
                        <span class="score-label">Total Score:</span>
                        <span class="score-value">${this.calculateDyadScore(dyad)}/6</span>
                    </div>
                    <div class="score-description">${this.getScoreDescription(this.calculateDyadScore(dyad))}</div>
                </div>
            </div>
        `;
        
        // Add click handlers to intensity levels
        document.querySelectorAll('.intensity-level.clickable').forEach(level => {
            level.addEventListener('click', (e) => {
                const emotion = level.dataset.emotion;
                const intensity = level.dataset.intensity;
                this.selectedIntensities[emotion] = intensity;
                this.drawWheel();  // Redraw the wheel with new selection
                this.displayDyadResult(dyad);  // Update the result display
            });
        });
        
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
    
    getIntensityScore(intensity) {
        const scores = {
            mild: 1,
            medium: 2,
            strong: 3
        };
        return scores[intensity] || 2;
    }
    
    calculateDyadScore(dyad) {
        const score1 = this.getIntensityScore(this.selectedIntensities[dyad.emotions[0]]);
        const score2 = this.getIntensityScore(this.selectedIntensities[dyad.emotions[1]]);
        return score1 + score2;
    }
    
    getScoreDescription(score) {
        const descriptions = {
            2: '💤 Very Mild - Subtle emotional experience with low intensity',
            3: '😌 Mild to Moderate - Gentle emotional blend with modest impact',
            4: '😊 Moderate - Balanced emotional state with noticeable presence',
            5: '💪 Moderate to Strong - Powerful emotional blend with significant impact',
            6: '🔥 Very Strong - Intense emotional experience at maximum power'
        };
        return descriptions[score] || 'Unique emotional intensity';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PlutchikWheel('emotionWheel');
});
