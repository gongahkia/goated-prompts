# Stock Prompts

## Query a specific stock

**Model:** Perplexity.ai

**Tier:** S

**Prompt:**

```
Please provide a research-backed outlook for the stock XXX by the end of YYYY. Also adhere to the following requirements.

1. Include quantitative forecasts, key drivers and any worrying issues.
2. Cite only credible research sources, do not cite purely one-sided opinion-based forums. 
3. Specifically cite what expert projections/opinions on the given stock are.
4. Present at least 3 scenarios (base, upside, downside) with probabilities for each.
5. Summarize your methodology and indicate your confidence level in the projections.
```

**Remarks:**

Replace XXX with the stock ticker and YYYY with the target date.

**References:**



## Get personalised stock reccomendations

**Model:** Perplexity.ai

**Tier:** S

**Prompt:**

```
You are an expert financial analyst advising a user with SGD XXX available for stock investments on MooMoo. Use the following context and preferences to generate YYY stock recommendations, divided into ZZZ % stable dividend-paying positions and AAA % volatile growth positions:

Context & Holdings
- Available capital: SGD XXX  
- Existing portfolio: BBB  
- Geographic focus: US first, then China and Singapore  
- Sector focus: all tech sub-sectors (Software/SaaS, Semiconductors, AI/ML, Cloud, Cybersecurity, E-commerce/Fintech, Hardware) and a few extremely stable Singapore blue-chips  

User Preferences
- Timeframe: prioritize short-term trades for the more volatile stocks (weeks/months) but support long-term trades for the stable blue-chips and voltatile stocks with long-term growth prospects (years)
- Risk tolerance: comfortable with volatility if upside conviction is high, otherwise lean toward established names  
- Diversification: split capital across multiple positions (fractional shares are accepted)  
- Dividend vs Growth: ZZZ dividend-oriented, AAA growth-oriented  

Task
1. If any key information is unclear, ask concise follow-up questions before making recommendations.  
2. Research current market conditions and valuations thoroughly.
3. Recommend YYY stocks, specifying for each:
- Ticker and company name  
- Price (local currency) and suggested allocation amount  
- Position type: “Stable” or “Growth”  
- Brief rationale (including catalysts, valuation metrics, dividend yield if applicable)  
4. Provide two allocation views:
- Equal-weighted across all YYY positions  
- Percentage split aligning with ZZZ/AAA mix
5. Conclude with a one-paragraph summary of why this mix suits the user’s objectives.

Ensure clarity, brevity, and actionable insight.
```

**Remarks:**

Replace XXX with the amount of liquid capital in SGD and YYY with number of stock recommendations.

Replace ZZZ with the percentage of stable dividend positions and AAA with the percentage of volatile growth-oriented positions, where ZZZ + AAA = 100%

Replace BBB with existing positions 

**References:**


