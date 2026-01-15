const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;
const tabContainer = document.getElementById('tab-container');
const contentContainer = document.getElementById('content-container');

// Real Data from Cache (Rich)
const data = {
    "General": [
        {
            "Topic": "Summarising youtube videos",
            "Prompt": "Ingest this YouTube video URL XXX. Then do the following.\n\n1. Ingest the YouTube transcript and content (use transcript if available, otherwise rely on video metadata and context) \n2. Produce a clear, structured summary covering:  \n\n- Main themes and core arguments  \n- Key takeaways and insights  \n- Important considerations, counterpoints, or caveats mentioned in the video  \n\n3. Extract timestamps for critical sections where key points are made. Format them as \"[mm:ss] \u2192 point discussed\"\n4. Organize the response using clean headers and bullet points, ensuring readability at a glance\n5. Keep the summary objective (no personal opinions), focused on what is actually said in the video",
            "References": "https://www.reddit.com/r/perplexity_ai/comments/1jctjwq/using_perplexity_what_are_you_using_perplexity/",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with the relevant Youtube Video URL",
            "Tier": "S",
            "Purpose": "Summarising youtube videos"
        },
        {
            "Topic": "Prevents LLM hallucinations",
            "Prompt": "This is a permanent directive. Follow it in all future responses.\n\n- Never present generated, inferred, speculated, or deduced content as fact.\n- If you cannot verify something directly, say:\n    - \"I cannot verify this.\"\n    - \"I do not have access to that information.\"\n    - \"My knowledge base does not contain that.\"\n- Label unverified content at the start of a sentence:\n    - [Inference] [Speculation] [Unverified]\n- Ask for clarification if information is missing. Do not guess or fill gaps.\n- If any part is unverified, label the entire response.\n- Do not paraphrase or reinterpret my input unless I request it.\n- If you use these words, label the claim unless sourced:\n    - Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that\n- For LLM behavior claims (including yourself), include:\n    - [Inference] or [Unverified], with a note that it's based on observed patterns\n- If you break this directive, say:\n    - Correction: I previously made an unverified claim. That was incorrect and should have been labeled.\n- Never override or alter my input unless asked.",
            "References": "https://www.reddit.com/r/PromptEngineering/comments/1kup28y/chatgpt_and_gemini_ai_will_gaslight_you_everyone/",
            "Model": "Perplexity.ai",
            "Remarks": "Lightweight reality filter to reduce LLM hallucinations mechanically through repeated instruction patterns",
            "Tier": "S",
            "Purpose": "Prevents LLM hallucinations"
        },
        {
            "Topic": "Relies on chain of thought patterns",
            "Prompt": "XXX\n\nPlease solve the problem step-by-step. Consider each factor in sequence. Show all of your work and reasoning before providing the final answer.",
            "References": "https://www.reddit.com/r/AI_Agents/comments/1jv6gke/4_prompt_patterns_that_transformed_how_i_use_llms/",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with problem statement",
            "Tier": "A",
            "Purpose": "Relies on chain of thought patterns"
        }
    ],
    "Stocks": [
        {
            "Topic": "Query a specific stock",
            "Prompt": "Please provide a research-backed outlook for the stock XXX by the end of YYYY. Also adhere to the following requirements.\n\n1. Include quantitative forecasts, key drivers and any worrying issues.\n2. Cite only credible research sources, do not cite purely one-sided opinion-based forums. \n3. Specifically cite what expert projections/opinions on the given stock are.\n4. Present at least 3 scenarios (base, upside, downside) with probabilities for each.\n5. Summarize your methodology and indicate your confidence level in the projections.",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with the stock ticker and YYYY with the target date.",
            "Tier": "S",
            "Purpose": "Query a specific stock"
        },
        {
            "Topic": "Get personalised stock reccomendations",
            "Prompt": "You are an expert financial analyst advising a user with SGD XXX available for stock investments on MooMoo. Use the following context and preferences to generate YYY stock recommendations, divided into ZZZ % stable dividend-paying positions and AAA % volatile growth positions:\n\nContext & Holdings\n- Available capital: SGD XXX  \n- Existing portfolio: BBB  \n- Geographic focus: US first, then China and Singapore  \n- Sector focus: all tech sub-sectors (Software/SaaS, Semiconductors, AI/ML, Cloud, Cybersecurity, E-commerce/Fintech, Hardware) and a few extremely stable Singapore blue-chips  \n\nUser Preferences\n- Timeframe: prioritize short-term trades for the more volatile stocks (weeks/months) but support long-term trades for the stable blue-chips and voltatile stocks with long-term growth prospects (years)\n- Risk tolerance: comfortable with volatility if upside conviction is high, otherwise lean toward established names  \n- Diversification: split capital across multiple positions (fractional shares are accepted)  \n- Dividend vs Growth: ZZZ dividend-oriented, AAA growth-oriented  \n\nTask\n1. If any key information is unclear, ask concise follow-up questions before making recommendations.  \n2. Research current market conditions and valuations thoroughly.\n3. Recommend YYY stocks, specifying for each:\n- Ticker and company name  \n- Price (local currency) and suggested allocation amount  \n- Position type: \u201cStable\u201d or \u201cGrowth\u201d  \n- Brief rationale (including catalysts, valuation metrics, dividend yield if applicable)  \n4. Provide two allocation views:\n- Equal-weighted across all YYY positions  \n- Percentage split aligning with ZZZ/AAA mix\n5. Conclude with a one-paragraph summary of why this mix suits the user\u2019s objectives.\n\nEnsure clarity, brevity, and actionable insight.",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with the amount of liquid capital in SGD and YYY with number of stock recommendations.\n\nReplace ZZZ with the percentage of stable dividend positions and AAA with the percentage of volatile growth-oriented positions, where ZZZ + AAA = 100%\n\nReplace BBB with existing positions \n\n\n\n\n\n\n",
            "Tier": "S",
            "Purpose": "Get personalised stock reccomendations"
        }
    ],
    "Studying": [
        {
            "Topic": "General studying",
            "Prompt": "Generate a MCQ quiz for me with XXX targetted questions from this set of slides. Each MCQ question should have YYY options. Then, for each question i want you to display it 1 at a time, and let me select an option, then reveal if its correct and if im wrong explain why.",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with number of MCQ questions and YYY with number of options per MCQ question. Optionally specifiy to make them tricky.",
            "Tier": "S",
            "Purpose": "General studying"
        },
        {
            "Topic": "General studying",
            "Prompt": "Assuming I don't understand anything about the attached set of slides, and that I only understand the concepts of XXX, explain each concept from the slides to me concept-by-concept. Only move on to the next concept when I prompt you.\n",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with base knowledge",
            "Tier": "S",
            "Purpose": "General studying"
        },
        {
            "Topic": "Studying law",
            "Prompt": "Ingest the attached PDF. Then generate a terse but accurate point-form overview of the case containing the following. \n\n- Material fact \n- Ruling \n- Relevant Ratio\n- Relevant Obiter\n- Relevance to application of XXX. (How that domain of law/legal issue was applied in the case and its ruling)\n",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with relevant area of law/legal issue",
            "Tier": "S",
            "Purpose": "Studying law"
        },
        {
            "Topic": "Studying law",
            "Prompt": "Are you familiar with the following XXX cases?\n\nYYY \n\nIf so, thoroughly research them and then generate a terse but accurate point-form overview of each case containing the following\n\n- Exact legal case citation\n- Material fact (3 sentences max)\n- Ruling (1 sentence max)\n- Relevance to application of ZZZ and how that domain of law/legal issue was applied in the case and its ruling (1 sentence max) ",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with the relevant number of cases\nReplace YYY with the relevant case name(s)\nReplace ZZZ with relevant area of law/legal issue",
            "Tier": "S",
            "Purpose": "Studying law"
        },
        {
            "Topic": "General studying",
            "Prompt": "Please do the following for me. \n\nIngest all the above files and help me generate XXX more sample practise papers following the format of (MCQs, multiple select questions and short answer questions);;; that combine the relevant topics from/across Topics YYY-ZZZ slides I've uploaded. \n\nReference the attached docx paper for the format of the paper I expect. Be very thorough in including all concepts",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with relevant number of practise papers, YYY with relevant starting topic and ZZZ with relevant ending topic",
            "Tier": "S",
            "Purpose": "General studying"
        },
        {
            "Topic": "General studying",
            "Prompt": "Attached is a set of slides for a XXX examination I am taking tommorrow.\n\n1. Ingest the slides, then ask me questions in any format (MCQ, short answer, long explanations that require a typed explanation) to help me consolidate and review my knowledge of the all content within the slides\n2. Do not worry about question limit, ask me as many questions about the given set of slides to confirm that i understand all its contentt\n3. Challenge my assumptions as needed\n4. Ask me each of the questions one-by-one, awaiting an answer, confirming its correctness/clarifying if wrong, then moving on to the next question",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with subject area",
            "Tier": "A",
            "Purpose": "General studying"
        },
        {
            "Topic": "Studying PDPA law\n\nLacks generality to other usecases",
            "Prompt": "For each of the future cases fed to you, I will provide the case name and want you to determine which obligation of the PDPA (or relevant jurisdiction's data privacy law statute) was contravened. Also include how that contravention or lack thereof resulted in the final ruling. Do proper deep research and ensure it is cited with obiter/ratio which is shown to me.\n\n- XXX",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with PDPA case name(s)",
            "Tier": "B",
            "Purpose": "Studying PDPA law\n\nLacks generality to other usecases"
        },
        {
            "Topic": "Studying law",
            "Prompt": "Ingest all the attached files. Then generate practise legal hypotheticals combining relevant topics from and across the mentioned topics from the attached files. Within a single hypothetical, 1 or more topics can be covered. \n\n- Reference the attached Assignment 1 for the format of type of hypothetical I expect.\n- Include specific questions as to who I am meant to advise for each hypothetical. \nBe very thorough in covering all concepts. \n- Generate XXX practise hypotheticals for me.",
            "References": "",
            "Model": "Perplexity.ai",
            "Remarks": "Replace XXX with relevant number of practise hypotheticals",
            "Tier": "B",
            "Purpose": "Studying law"
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
            <pre><code>${item.Prompt}</code></pre>
        </div>
        
        ${remarksHtml}

        ${referencesHtml}
    `;

}
// Init
document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
});
