// Plutchik's Wheel of Emotions Data
export const EMOTIONS = {
    joy: { color: '#FFD700', intensity: 1, angle: 0, label: 'joy' },
    trust: { color: '#00C853', intensity: 1, angle: 45, label: 'trust' },
    fear: { color: '#1B5E20', intensity: 1, angle: 90, label: 'fear' },
    surprise: { color: '#2196F3', intensity: 1, angle: 135, label: 'surprise' },
    sadness: { color: '#0D47A1', intensity: 1, angle: 180, label: 'sadness' },
    disgust: { color: '#9C27B0', intensity: 1, angle: 225, label: 'disgust' },
    anger: { color: '#D32F2F', intensity: 1, angle: 270, label: 'anger' },
    anticipation: { color: '#FF6F00', intensity: 1, angle: 315, label: 'anticipation' }
};

// Primary Dyads - Adjacent emotions on the wheel
export const PRIMARY_DYADS = [
    {
        name: 'love',
        emotions: ['joy', 'trust'],
        description: 'Love emerges from the combination of joy and trust. This powerful emotional blend represents deep affection, connection, and positive bonding with others. When we experience joy in someone\'s presence and trust them completely, we feel love.',
        explanation: 'This is a Primary Dyad formed by two adjacent emotions on Plutchik\'s wheel. Joy brings the positive emotional energy and happiness, while trust provides the security and reliability needed for deep emotional bonds.',
        intensity: 'strong'
    },
    {
        name: 'submission',
        emotions: ['trust', 'fear'],
        description: 'Submission arises from the blend of trust and fear. This dyad represents yielding to authority or accepting a subordinate position, often stemming from both respect and apprehension of consequences.',
        explanation: 'As a Primary Dyad, submission combines the security-seeking nature of trust with the cautious awareness of fear. This creates a state where one accepts guidance or authority while maintaining alertness.',
        intensity: 'strong'
    },
    {
        name: 'alarm',
        emotions: ['fear', 'surprise'],
        description: 'Alarm is the intense combination of fear and surprise. This emotional state occurs when unexpected danger presents itself, triggering both the shock of the unexpected and the protective response of fear.',
        explanation: 'This Primary Dyad represents the immediate reaction to sudden threats. The surprise element amplifies the fear response, creating a heightened state of alertness and readiness to respond.',
        intensity: 'strong'
    },
    {
        name: 'disappointment',
        emotions: ['surprise', 'sadness'],
        description: 'Disappointment blends surprise with sadness. This emotion occurs when reality fails to meet expectations, combining the shock of unmet hopes with the sorrow of loss or failure.',
        explanation: 'As a Primary Dyad, disappointment captures the emotional journey from unexpected outcomes (surprise) to the accompanying grief (sadness). It\'s the emotional signature of dashed hopes.',
        intensity: 'strong'
    },
    {
        name: 'remorse',
        emotions: ['sadness', 'disgust'],
        description: 'Remorse combines sadness with disgust, typically directed at oneself. This powerful emotion involves both grief over past actions and self-directed revulsion, creating deep regret.',
        explanation: 'This Primary Dyad represents a complex self-reflective state where sadness about consequences meets disgust with one\'s own behavior. It\'s essential for moral development and learning from mistakes.',
        intensity: 'strong'
    },
    {
        name: 'contempt',
        emotions: ['disgust', 'anger'],
        description: 'Contempt emerges from disgust combined with anger. This emotion involves both repulsion toward something or someone and the hostile energy to reject or devalue them.',
        explanation: 'As a Primary Dyad, contempt is particularly powerful. It combines the rejection impulse of disgust with anger\'s assertive energy, often directed at violations of social or moral standards.',
        intensity: 'strong'
    },
    {
        name: 'aggression',
        emotions: ['anger', 'anticipation'],
        description: 'Aggression blends anger with anticipation. This dyad combines hostile feelings with forward-looking intent, creating proactive confrontation or attack behavior.',
        explanation: 'This Primary Dyad represents action-oriented hostility. The anger provides the emotional fuel while anticipation adds planning and intentionality, making aggression purposeful rather than reactive.',
        intensity: 'strong'
    },
    {
        name: 'optimism',
        emotions: ['anticipation', 'joy'],
        description: 'Optimism combines anticipation with joy. This uplifting emotional state involves both positive expectations about the future and present happiness, creating hopefulness and confidence.',
        explanation: 'As a Primary Dyad, optimism represents forward-looking positivity. Anticipation focuses on future possibilities while joy provides the positive emotional coloring, creating an expectation of good outcomes.',
        intensity: 'strong'
    }
];

// Secondary Dyads - Emotions with one emotion between them
export const SECONDARY_DYADS = [
    {
        name: 'guilt',
        emotions: ['joy', 'fear'],
        description: 'Guilt emerges from the tension between joy and fear. This complex emotion involves pleasure or satisfaction conflicting with anxiety about consequences or moral implications.',
        explanation: 'This is a Secondary Dyad where two emotions are separated by one position on the wheel. The conflict between joy\'s positive energy and fear\'s caution creates the characteristic discomfort of guilt.',
        intensity: 'moderate'
    },
    {
        name: 'curiosity',
        emotions: ['trust', 'surprise'],
        description: 'Curiosity blends trust with surprise. This emotion drives exploration and learning, combining the safety of trust with the stimulation of the unexpected.',
        explanation: 'As a Secondary Dyad, curiosity represents a safe way to engage with the new and unknown. Trust provides security while surprise brings interest, creating the drive to explore.',
        intensity: 'moderate'
    },
    {
        name: 'despair',
        emotions: ['fear', 'sadness'],
        description: 'Despair combines fear with sadness. This heavy emotional state involves both anxiety about the future and grief about present circumstances, creating feelings of hopelessness.',
        explanation: 'This Secondary Dyad captures a particularly difficult emotional state. Fear of what\'s to come combines with sadness about what is, creating a sense of being trapped without hope.',
        intensity: 'moderate'
    },
    {
        name: 'unbelief',
        emotions: ['surprise', 'disgust'],
        description: 'Unbelief emerges from surprise combined with disgust. This reaction involves both shock at something unexpected and repulsion at its nature or content.',
        explanation: 'As a Secondary Dyad, unbelief represents incredulous rejection. The surprise element shows the unexpected nature of something, while disgust drives the refusal to accept it.',
        intensity: 'moderate'
    },
    {
        name: 'envy',
        emotions: ['sadness', 'anger'],
        description: 'Envy blends sadness with anger. This emotion involves grief over what one lacks combined with resentment toward those who possess it.',
        explanation: 'This Secondary Dyad captures the complex nature of envy. Sadness reflects the pain of not having something desired, while anger provides the hostile edge directed at others\' success.',
        intensity: 'moderate'
    },
    {
        name: 'cynicism',
        emotions: ['disgust', 'anticipation'],
        description: 'Cynicism combines disgust with anticipation. This attitude involves both contempt for human nature or motives and expectation of negative outcomes.',
        explanation: 'As a Secondary Dyad, cynicism represents a defensive worldview. Disgust colors perceptions negatively while anticipation projects these negative expectations into the future.',
        intensity: 'moderate'
    },
    {
        name: 'pride',
        emotions: ['anger', 'joy'],
        description: 'Pride emerges from anger combined with joy. This emotion involves satisfaction in one\'s achievements mixed with assertive self-regard and defensive self-esteem.',
        explanation: 'This Secondary Dyad captures pride\'s complex nature. Joy provides the positive feeling about oneself, while anger\'s assertiveness defends against threats to self-worth.',
        intensity: 'moderate'
    },
    {
        name: 'hope',
        emotions: ['anticipation', 'trust'],
        description: 'Hope blends anticipation with trust. This uplifting emotion involves positive expectations about the future combined with confidence that things will work out.',
        explanation: 'As a Secondary Dyad, hope represents confident expectation. Anticipation looks forward to future possibilities while trust provides the confidence that positive outcomes are reliable.',
        intensity: 'moderate'
    }
];

// Tertiary Dyads - Emotions with two emotions between them
export const TERTIARY_DYADS = [
    {
        name: 'delight',
        emotions: ['joy', 'surprise'],
        description: 'Delight combines joy with surprise. This pleasant emotion occurs when unexpected positive experiences bring both happiness and the thrill of the unexpected.',
        explanation: 'This is a Tertiary Dyad where emotions are separated by two positions. The joy provides positive feelings while surprise adds excitement, creating the sparkle of delight.',
        intensity: 'mild'
    },
    {
        name: 'sentimentality',
        emotions: ['trust', 'sadness'],
        description: 'Sentimentality blends trust with sadness. This emotion involves nostalgic affection tinged with melancholy, often for past relationships or experiences.',
        explanation: 'As a Tertiary Dyad, sentimentality captures bittersweet emotional states. Trust reflects the positive bonds while sadness acknowledges loss or distance, creating tender nostalgia.',
        intensity: 'mild'
    },
    {
        name: 'shame',
        emotions: ['fear', 'disgust'],
        description: 'Shame emerges from fear combined with disgust. This painful emotion involves both anxiety about social judgment and self-directed revulsion.',
        explanation: 'This Tertiary Dyad represents self-conscious distress. Fear focuses on others\' perceptions while disgust turns inward, creating the characteristic pain of shame.',
        intensity: 'mild'
    },
    {
        name: 'outrage',
        emotions: ['surprise', 'anger'],
        description: 'Outrage blends surprise with anger. This intense reaction combines shock at something unexpected with hostile indignation at its perceived wrongness.',
        explanation: 'As a Tertiary Dyad, outrage represents shocked hostility. Surprise shows the unexpected violation of norms while anger provides the emotional energy for protest.',
        intensity: 'mild'
    },
    {
        name: 'pessimism',
        emotions: ['sadness', 'anticipation'],
        description: 'Pessimism combines sadness with anticipation. This outlook involves current sorrow projected into the future, expecting negative outcomes.',
        explanation: 'This Tertiary Dyad captures negative future orientation. Sadness colors the present while anticipation projects these negative feelings forward, creating expectation of bad outcomes.',
        intensity: 'mild'
    },
    {
        name: 'morbidness',
        emotions: ['disgust', 'joy'],
        description: 'Morbidness emerges from disgust combined with joy. This unusual blend involves fascination or pleasure in things typically considered disturbing or repulsive.',
        explanation: 'As a Tertiary Dyad, morbidness represents complex and socially taboo emotional states. Joy provides attraction while disgust acknowledges the disturbing nature, creating dark fascination.',
        intensity: 'mild'
    },
    {
        name: 'dominance',
        emotions: ['anger', 'trust'],
        description: 'Dominance blends anger with trust. This emotion involves assertive control combined with confident expectation of compliance or success.',
        explanation: 'This Tertiary Dyad represents confident aggression. Anger provides assertive energy while trust adds the confidence that one\'s dominance will be accepted.',
        intensity: 'mild'
    },
    {
        name: 'anxiety',
        emotions: ['anticipation', 'fear'],
        description: 'Anxiety combines anticipation with fear. This uncomfortable state involves future-focused worry, where expectation is colored by apprehension and dread.',
        explanation: 'As a Tertiary Dyad, anxiety represents fearful anticipation. Both emotions are future-oriented, but anticipation\'s forward focus meets fear\'s protective alarm, creating persistent worry.',
        intensity: 'mild'
    }
];

// Opposite Dyads - Emotions directly across from each other
export const OPPOSITE_DYADS = [
    {
        name: 'bittersweetness',
        emotions: ['joy', 'sadness'],
        description: 'Bittersweetness combines joy with sadness. This poignant emotion captures simultaneous happiness and sorrow, often felt during meaningful endings or precious moments.',
        explanation: 'This is an Opposite Dyad, combining emotions from across the wheel. The contradiction between joy\'s positivity and sadness\'s grief creates the characteristic complexity of bittersweet experiences.',
        intensity: 'complex'
    },
    {
        name: 'ambivalence',
        emotions: ['trust', 'disgust'],
        description: 'Ambivalence blends trust with disgust. This conflicted state involves simultaneous attraction and repulsion, creating uncertainty and mixed feelings.',
        explanation: 'As an Opposite Dyad, ambivalence represents direct emotional conflict. Trust pulls toward something while disgust pushes away, creating the stuck feeling of being torn.',
        intensity: 'complex'
    },
    {
        name: 'frozenness',
        emotions: ['fear', 'anger'],
        description: 'Frozenness emerges from fear combined with anger. This paralyzed state involves both the impulse to flee and the urge to fight, resulting in immobilization.',
        explanation: 'This Opposite Dyad captures conflicting survival impulses. Fear drives withdrawal while anger drives approach, and when equal in strength, they create paralysis.',
        intensity: 'complex'
    },
    {
        name: 'confusion',
        emotions: ['surprise', 'anticipation'],
        description: 'Confusion combines surprise with anticipation. This disoriented state involves both unexpected disruption and forward-looking expectation meeting uncertainty.',
        explanation: 'As an Opposite Dyad, confusion represents temporal disorientation. Surprise focuses on the unexpected present while anticipation looks to the future, creating uncertainty about what comes next.',
        intensity: 'complex'
    }
];

// Combine all dyads
export const ALL_DYADS = {
    primary: PRIMARY_DYADS,
    secondary: SECONDARY_DYADS,
    tertiary: TERTIARY_DYADS,
    opposite: OPPOSITE_DYADS
};

// Helper function to get emotion color
export function getEmotionColor(emotion) {
    return EMOTIONS[emotion]?.color || '#808080';
}

// Helper function to blend two colors
export function blendColors(color1, color2) {
    const hex = (color) => parseInt(color.slice(1), 16);
    const r1 = (hex(color1) >> 16) & 0xff;
    const g1 = (hex(color1) >> 8) & 0xff;
    const b1 = hex(color1) & 0xff;
    
    const r2 = (hex(color2) >> 16) & 0xff;
    const g2 = (hex(color2) >> 8) & 0xff;
    const b2 = hex(color2) & 0xff;
    
    const r = Math.round((r1 + r2) / 2);
    const g = Math.round((g1 + g2) / 2);
    const b = Math.round((b1 + b2) / 2);
    
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Helper function to create gradient from two colors
export function createGradient(color1, color2) {
    return `linear-gradient(135deg, ${color1} 0%, ${blendColors(color1, color2)} 50%, ${color2} 100%)`;
}
