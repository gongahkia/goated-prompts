const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;
const tabContainer = document.getElementById('tab-container');
const contentContainer = document.getElementById('content-container');

// Mock Data
const data = {
    "General": [
        {
            "Topic": "Grammar Checker",
            "Prompt": "Please act as an English teacher/editor. I will provide you with a text and you will correct the grammar and spelling. Do not make the text more formal, but rather keep the tone and style of the original text. Break the text into paragraphs if necessary. Do not provide any commentary, just the corrected text.",
            "References": "Grammarly substitute"
        },
        {
            "Topic": "Summarizer",
            "Prompt": "Please summarize the following text. The summary should be concise and capture the main points of the text. Do not leave out any important details.",
            "References": ""
        }
    ],
    "Studying": [
        {
            "Topic": "Flashcard Generator",
            "Prompt": "Create a set of flashcards for the following notes. Format them as Question;Answer pairs, one per line.",
            "References": "Anki, Quizlet"
        },
        {
            "Topic": "Concept Explainer",
            "Prompt": "Explain the following concept to me like I am 5 years old. Use analogies and simple language.",
            "References": "Feynman Technique"
        }
    ],
    "Stocks": [
        {
            "Topic": "Earnings Call Analysis",
            "Prompt": "Analyze the following earnings call transcript. Highlight key metrics, guidance changes, and sentiment.",
            "References": "Seeking Alpha"
        },
        {
            "Topic": "DCF Model Assistant",
            "Prompt": "Help me build a DCF model. What are the key inputs I need for [Company Name]?",
            "References": ""
        }
    ]
};

// Theme Logic
function setTheme(theme) {
    body.className = theme;
    localStorage.setItem('dossier-theme', theme);
}

themeSwitcher.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('dossier-theme') || 'light-mode';
    const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
    setTheme(newTheme);
});

const savedTheme = localStorage.getItem('dossier-theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('light-mode');
}

// Rendering Logic
function renderTabs() {
    tabContainer.innerHTML = '';
    const categories = Object.keys(data);
    
    categories.forEach((cat, index) => {
        const tab = document.createElement('div');
        tab.className = `tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = cat;
        tab.onclick = () => switchTab(cat);
        tabContainer.appendChild(tab);
    });
    
    // Render initial content
    renderContent(categories[0]);
}

function switchTab(category) {
    // Update tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    renderContent(category);
}

function renderContent(category) {
    contentContainer.innerHTML = '';
    const prompts = data[category];
    
    if (!prompts) return;

    prompts.forEach(item => {
        const subDossier = document.createElement('div');
        subDossier.className = 'sub-dossier';
        
        const header = document.createElement('div');
        header.className = 'sub-dossier-header';
        header.innerHTML = `
            <span class="sub-dossier-title">
                <span class="folder-icon">📁</span> ${item.Topic}
            </span>
            <span class="toggle-icon">▶</span>
        `;
        
        const content = document.createElement('div');
        content.className = 'sub-dossier-content';
        
        let referencesHtml = '';
        if (item.References) {
            referencesHtml = `<div class="tags"><strong>Refs:</strong> ${item.References}</div>`;
        }

        content.innerHTML = `
            <pre>${item.Prompt}</pre>
            ${referencesHtml}
        `;
        
        header.onclick = () => {
            const isOpen = subDossier.classList.contains('open');
            // Close all others? Optional. Let's keep multiple openable.
            subDossier.classList.toggle('open');
        };

        subDossier.appendChild(header);
        subDossier.appendChild(content);
        contentContainer.appendChild(subDossier);
    });
}

// Init
renderTabs();
