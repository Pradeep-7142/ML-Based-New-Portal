from groq import Groq

def summarize_text(text):
    client = Groq(api_key="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")

    # Step 1: Extract the main context of the text
    context_prompt = f"""
    "Analyze the given text and generate a concise summary that retains the core message and essence of the original content. 
    The summary should be approximately one-fourth of the original text in length.
    Prioritize key themes, important facts, and relevant details while omitting unrelated or less significant information.
    Ensure coherence, readability, and logical flow in the summarized output."
    Don't write sentences like-"Here is a concise summary of the given text, focusing on the core message and key themes:"
    Only give the main summary of the text.
    Text:
    "{text}"
    
    Return the brief summary of the whole text.
    """

    context_response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "system", "content": context_prompt}],
        temperature=0.5,
        max_completion_tokens=200,  # Increased token limit for better summary output
        top_p=1
    )

    detected_context = context_response.choices[0].message.content.strip()

    return {"detected_context": detected_context, "summary": detected_context}  # Using detected context as the summary



