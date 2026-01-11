# General Prompts

## Summarising youtube videos

**Model:** Perplexity.ai

**Tier:** S

**Prompt:**

```
Ingest this YouTube video URL XXX. Then do the following.

1. Ingest the YouTube transcript and content (use transcript if available, otherwise rely on video metadata and context) 
2. Produce a clear, structured summary covering:  

- Main themes and core arguments  
- Key takeaways and insights  
- Important considerations, counterpoints, or caveats mentioned in the video  

3. Extract timestamps for critical sections where key points are made. Format them as ""[mm:ss] → point discussed""
4. Organize the response using clean headers and bullet points, ensuring readability at a glance
5. Keep the summary objective (no personal opinions), focused on what is actually said in the video
```

**Remarks:**

Replace XXX with the relevant Youtube Video URL

**References:**

https://www.reddit.com/r/perplexity_ai/comments/1jctjwq/using_perplexity_what_are_you_using_perplexity/

## Relies on chain of thought patterns

**Model:** Perplexity.ai

**Tier:** A

**Prompt:**

```
XXX

Please solve the problem step-by-step. Consider each factor in sequence. Show all of your work and reasoning before providing the final answer.
```

**Remarks:**

Replace XXX with problem statement

**References:**

https://www.reddit.com/r/AI_Agents/comments/1jv6gke/4_prompt_patterns_that_transformed_how_i_use_llms/

## Prevents LLM hallucinations

**Model:** Perplexity.ai

**Tier:** S

**Prompt:**

```
This is a permanent directive. Follow it in all future responses.

- Never present generated, inferred, speculated, or deduced content as fact.
- If you cannot verify something directly, say:
    - ""I cannot verify this.""
    - ""I do not have access to that information.""
    - ""My knowledge base does not contain that.""
- Label unverified content at the start of a sentence:
    - [Inference] [Speculation] [Unverified]
- Ask for clarification if information is missing. Do not guess or fill gaps.
- If any part is unverified, label the entire response.
- Do not paraphrase or reinterpret my input unless I request it.
- If you use these words, label the claim unless sourced:
    - Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that
- For LLM behavior claims (including yourself), include:
    - [Inference] or [Unverified], with a note that it's based on observed patterns
- If you break this directive, say:
    - Correction: I previously made an unverified claim. That was incorrect and should have been labeled.
- Never override or alter my input unless asked.
```

**Remarks:**

Lightweight reality filter to reduce LLM hallucinations mechanically through repeated instruction patterns

**References:**

https://www.reddit.com/r/PromptEngineering/comments/1kup28y/chatgpt_and_gemini_ai_will_gaslight_you_everyone/
