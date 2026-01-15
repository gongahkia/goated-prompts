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
    
    if (!prompts || prompts.length === 0) return;

    // 1. Create Layout Structure
    const wrapper = document.createElement('div');
    wrapper.className = 'sub-dossier-wrapper';

    const subTabsContainer = document.createElement('div');
    subTabsContainer.className = 'sub-dossier-tabs';

    const subBody = document.createElement('div');
    subBody.className = 'sub-dossier-body';

    // 2. Render Sub-Tabs
    prompts.forEach((item, index) => {
        const subTab = document.createElement('div');
        subTab.className = `sub-tab ${index === 0 ? 'active' : ''}`;
        subTab.textContent = item.Topic;
        
        subTab.onclick = () => {
            // Update UI state
            Array.from(subTabsContainer.children).forEach(t => t.classList.remove('active'));
            subTab.classList.add('active');
            
            // Render specific content
            renderPromptContent(subBody, item);
        };

        subTabsContainer.appendChild(subTab);
    });

    // 3. Render Initial Content (First Item)
    renderPromptContent(subBody, prompts[0]);

    // 4. Assemble
    wrapper.appendChild(subTabsContainer);
    wrapper.appendChild(subBody);
    contentContainer.appendChild(wrapper);
}

function renderPromptContent(container, item) {
    let referencesHtml = '';
    if (item.References) {
        referencesHtml = `<div class="tags"><strong>Refs:</strong> ${item.References}</div>`;
    }

    container.innerHTML = `
        <h2 style="margin-top:0;">${item.Topic}</h2>
        <pre>${item.Prompt}</pre>
        ${referencesHtml}
    `;
}

// Init
renderTabs();
