document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.getElementById('outputSection');
    const resultsGrid = document.getElementById('resultsGrid');
    const toast = document.getElementById('toast');

    // Event Listener
    generateBtn.addEventListener('click', generateSummaries);

    function generateSummaries() {
        // Get Inputs
        const data = {
            title: document.getElementById('jobTitle').value.trim(),
            xp: document.getElementById('experience').value.trim(),
            skills: document.getElementById('skills').value.trim(),
            achievement: document.getElementById('achievement').value.trim()
        };

        // Validation - Simple check
        if (!data.title) {
            alert('Please enter at least a Job Title to generate a summary.');
            return;
        }

        // Show Output Section with Animation
        outputSection.classList.remove('hidden');
        outputSection.style.animation = 'fadeIn 0.5s forwards';
        
        // Generate Content
        renderResults(data);

        // Scroll to results
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function renderResults(data) {
        // Prepare data variations
        const skillsList = data.skills ? data.skills : "industry-standard tools";
        const years = data.xp ? `${data.xp}+ years of` : "extensive";
        const achievementText = data.achievement ? ` Proven track record of ${lowerFirst(data.achievement)}.` : "";

        // Templates
        const templates = [
            {
                type: "Professional & Direct",
                text: `Results-oriented ${data.title} with ${years} experience in ${skillsList}.${achievementText} Adept at leveraging technical expertise to drive project success and organizational growth.`
            },
            {
                type: "Achievement Focused",
                text: `Accomplished ${data.title} recognized for ${lowerFirst(skillsList)} proficiency.${achievementText} Dedicated to optimizing workflows and delivering high-quality solutions in fast-paced environments.`
            },
            {
                type: "Modern & Energetic",
                text: `Passionate ${data.title} specializing in ${skillsList}. Bringing ${years} experience transforming ideas into reality.${achievementText} Committed to continuous learning and excellence in execution.`
            }
        ];

        // Clear previous
        resultsGrid.innerHTML = '';

        // Create Cards
        templates.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.style.animation = `slideUp 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0'; // Initial state for animation

            card.innerHTML = `
                <div class="card-header">
                    <span class="card-badge">${item.type}</span>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy
                    </button>
                </div>
                <p class="summary-text">${item.text}</p>
            `;
            resultsGrid.appendChild(card);
        });
    }

    // Helper: Lowercase first letter if not acronym (roughly)
    function lowerFirst(string) {
        if (!string) return "";
        // Don't lowercase if it looks like an acronym (e.g., 'API')
        if (string.length > 1 && string[0] === string[0].toUpperCase() && string[1] === string[1].toUpperCase()) {
            return string;
        }
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
});

// Global Copy Function
window.copyToClipboard = function(btn) {
    const text = btn.closest('.result-card').querySelector('.summary-text').innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast();
        
        // Visual feedback on button
        const originalContent = btn.innerHTML;
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="color: #10b981">Copied!</span>
        `;
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 2000);
    });
};

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add keyframes for JS animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { 
        from { opacity: 0; transform: translateY(20px); } 
        to { opacity: 1; transform: translateY(0); } 
    }
`;
document.head.appendChild(styleSheet);
