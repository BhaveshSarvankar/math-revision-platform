// frontend/src/components/TopicIcons.js
// Purpose: Exports topic names, per-topic accent colours, and inline SVG icon components for the 14 MBA-CET quant topics.
import React from 'react';

export const TOPICS = [
    'Percentages',
    'Profit, Loss & Discount',
    'Simple & Compound Interest',
    'Time, Speed & Distance',
    'Time & Work',
    'Ratio, Proportion & Variation',
    'Averages',
    'Number System',
    'Permutations & Combinations',
    'Probability',
    'Mensuration',
    'Algebra',
    'Data Interpretation',
    'Data Sufficiency'
];

export const TOPIC_COLORS = {
    'Percentages':                  '#6366f1', // indigo
    'Profit, Loss & Discount':      '#f59e0b', // amber
    'Simple & Compound Interest':   '#10b981', // emerald
    'Time, Speed & Distance':       '#ef4444', // red
    'Time & Work':                  '#8b5cf6', // violet
    'Ratio, Proportion & Variation':'#0ea5e9', // sky
    'Averages':                     '#f97316', // orange
    'Number System':                '#14b8a6', // teal
    'Permutations & Combinations':  '#ec4899', // pink
    'Probability':                  '#a855f7', // purple
    'Mensuration':                  '#22c55e', // green
    'Algebra':                      '#3b82f6', // blue
    'Data Interpretation':          '#d97706', // amber-dark
    'Data Sufficiency':             '#06b6d4', // cyan
};

// All icons draw in a 48×48 viewBox using stroke="currentColor", fill="none"
const iconProps = {
    width: '48',
    height: '48',
    viewBox: '0 0 48 48',
    fill: 'none',
    strokeWidth: '2.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    stroke: 'currentColor',
};

const icons = {
    'Percentages': (
        <svg {...iconProps}>
            <circle cx="15" cy="15" r="6" />
            <circle cx="33" cy="33" r="6" />
            <line x1="10" y1="38" x2="38" y2="10" />
            <text x="22" y="26" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle">%</text>
        </svg>
    ),
    'Profit, Loss & Discount': (
        <svg {...iconProps}>
            {/* price tag */}
            <path d="M8 8 h18 l14 16 -14 16 H8 z" />
            <circle cx="16" cy="20" r="3" />
            <line x1="20" y1="24" x2="28" y2="16" />
        </svg>
    ),
    'Simple & Compound Interest': (
        <svg {...iconProps}>
            {/* stack of coins */}
            <ellipse cx="24" cy="36" rx="14" ry="5" />
            <line x1="10" y1="36" x2="10" y2="30" />
            <line x1="38" y1="36" x2="38" y2="30" />
            <ellipse cx="24" cy="30" rx="14" ry="5" />
            <line x1="10" y1="30" x2="10" y2="24" />
            <line x1="38" y1="30" x2="38" y2="24" />
            <ellipse cx="24" cy="24" rx="14" ry="5" />
        </svg>
    ),
    'Time, Speed & Distance': (
        <svg {...iconProps}>
            {/* speedometer */}
            <path d="M8 32 A16 16 0 0 1 40 32" />
            <line x1="24" y1="32" x2="16" y2="18" strokeWidth="3" />
            <circle cx="24" cy="32" r="3" fill="currentColor" stroke="none" />
            <line x1="8" y1="34" x2="12" y2="34" />
            <line x1="36" y1="34" x2="40" y2="34" />
            <line x1="24" y1="16" x2="24" y2="20" />
        </svg>
    ),
    'Time & Work': (
        <svg {...iconProps}>
            {/* clock */}
            <circle cx="24" cy="24" r="16" />
            <line x1="24" y1="24" x2="24" y2="14" strokeWidth="3" />
            <line x1="24" y1="24" x2="32" y2="28" strokeWidth="3" />
            <line x1="24" y1="10" x2="24" y2="12" />
            <line x1="24" y1="36" x2="24" y2="38" />
            <line x1="10" y1="24" x2="12" y2="24" />
            <line x1="36" y1="24" x2="38" y2="24" />
        </svg>
    ),
    'Ratio, Proportion & Variation': (
        <svg {...iconProps}>
            {/* balance scale */}
            <line x1="24" y1="8" x2="24" y2="40" />
            <line x1="12" y1="8" x2="36" y2="8" />
            <line x1="12" y1="8" x2="8" y2="20" />
            <line x1="36" y1="8" x2="40" y2="20" />
            <ellipse cx="8" cy="23" rx="6" ry="3" />
            <ellipse cx="40" cy="23" rx="6" ry="3" />
            <line x1="18" y1="40" x2="30" y2="40" />
        </svg>
    ),
    'Averages': (
        <svg {...iconProps}>
            {/* bar chart */}
            <rect x="8"  y="28" width="8" height="12" rx="1" />
            <rect x="20" y="16" width="8" height="24" rx="1" />
            <rect x="32" y="22" width="8" height="18" rx="1" />
            <line x1="6" y1="42" x2="42" y2="42" />
            {/* average line */}
            <line x1="6" y1="22" x2="42" y2="22" strokeDasharray="3 2" />
        </svg>
    ),
    'Number System': (
        <svg {...iconProps}>
            {/* "123" text */}
            <text x="24" y="30" fontSize="18" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle">123</text>
            <rect x="6" y="10" width="36" height="28" rx="4" strokeWidth="2" />
        </svg>
    ),
    'Permutations & Combinations': (
        <svg {...iconProps}>
            {/* two boxes with curved arrow */}
            <rect x="6"  y="14" width="14" height="14" rx="3" />
            <rect x="28" y="20" width="14" height="14" rx="3" />
            <path d="M20 21 Q24 14 28 23" markerEnd="url(#arr)" />
            <polyline points="26,19 28,23 24,23" />
        </svg>
    ),
    'Probability': (
        <svg {...iconProps}>
            {/* dice */}
            <rect x="8" y="8" width="32" height="32" rx="6" />
            <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="32" cy="16" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="16" cy="32" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="32" cy="32" r="2.5" fill="currentColor" stroke="none" />
        </svg>
    ),
    'Mensuration': (
        <svg {...iconProps}>
            {/* 3D cube */}
            <polygon points="24,6 40,16 40,32 24,42 8,32 8,16" />
            <line x1="24" y1="6" x2="24" y2="42" />
            <line x1="8" y1="16" x2="40" y2="16" />
            <line x1="8" y1="32" x2="40" y2="32" />
        </svg>
    ),
    'Algebra': (
        <svg {...iconProps}>
            {/* x² */}
            <text x="20" y="34" fontSize="20" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle">x</text>
            <text x="33" y="22" fontSize="13" fontWeight="bold" fill="currentColor" stroke="none" textAnchor="middle">2</text>
            <rect x="6" y="10" width="36" height="28" rx="4" strokeWidth="2" />
        </svg>
    ),
    'Data Interpretation': (
        <svg {...iconProps}>
            {/* pie chart */}
            <circle cx="24" cy="24" r="16" />
            <line x1="24" y1="24" x2="24" y2="8" />
            <line x1="24" y1="24" x2="40" y2="24" />
            <path d="M24 8 A16 16 0 0 1 40 24" fill="currentColor" opacity="0.25" stroke="none" />
            <line x1="24" y1="24" x2="13" y2="37" />
            <path d="M13 37 A16 16 0 0 1 24 40" fill="currentColor" opacity="0.15" stroke="none" />
        </svg>
    ),
    'Data Sufficiency': (
        <svg {...iconProps}>
            {/* magnifier with tick */}
            <circle cx="20" cy="20" r="12" />
            <line x1="28" y1="28" x2="40" y2="40" strokeWidth="3.5" />
            <polyline points="14,20 18,25 26,14" strokeWidth="2.5" />
        </svg>
    ),
};

/**
 * TopicIcon component – renders the inline SVG for a given topic.
 * @param {string} topic  - one of the 14 TOPICS
 * @param {number} size   - pixel size (width & height), default 32
 * @param {string} color  - CSS color string; defaults to the topic color
 */
export function TopicIcon({ topic, size = 32, color }) {
    const svgEl = icons[topic];
    if (!svgEl) return null;
    const fill = color || TOPIC_COLORS[topic] || 'var(--accent)';
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: fill,
                width: size,
                height: size,
                flexShrink: 0,
            }}
            aria-label={topic}
        >
            {React.cloneElement(svgEl, {
                width: size,
                height: size,
            })}
        </span>
    );
}
