const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;
const tabContainer = document.getElementById('tab-container');
const contentContainer = document.getElementById('content-container');

// Real Data from Cache (Rich)
const data = __DATA_PLACEHOLDER__;

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
    
    if (categories.length === 0) return;

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
        referencesHtml = `<div class="tags"><h3>References</h3><p>${item.References}</p></div>`;
    }
    
    let remarksHtml = '';
    if (item.Remarks) {
        remarksHtml = `<div><h3>Remarks</h3><p>${String(item.Remarks).replace(/\n/g, '<br>')}</p></div>`;
    }

    container.innerHTML = `
        <div class="metadata">
            <span class="meta-item tier"><strong>Tier:</strong> ${item.Tier || 'N/A'}</span>
            <span class="meta-item model"><strong>Model:</strong> ${item.Model || 'N/A'}</span>
        </div>
        
        <h2 style="margin-top:0.5rem; margin-bottom: 1rem;">${item.Purpose || item.Topic}</h2>
        
        <div class="code-container">
            <button class="copy-btn" title="Copy to clipboard">Copy</button>
            <pre><code>${item.Prompt}</code></pre>
        </div>
        
        ${remarksHtml}

        ${referencesHtml}
    `;

    // Add Copy Logic
    const copyBtn = container.querySelector('.copy-btn');
    const codeBlock = container.querySelector('code');
    
    if (copyBtn && codeBlock) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.innerText);
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied!';
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        });
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
});
