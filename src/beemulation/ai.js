
class Ai {
    constructor() {
        this.apiKey = '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';
        this.model = 'gpt-4o-mini';
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    }

    async makeAnalyzation(ingredients) {
        if (!Array.isArray(ingredients)) {
            throw new Error("Ingredients should be an array.");
        }

        const messages = [
            {
                role: "system",
                content: "You are an expert in cosmetic chemistry. Analyze the ingredients provided and give a detailed assessment of their benefits and potential issues."
            },
            {
                role: "user",
                content: `Analyze the following cosmetic ingredients: ${ingredients.join(', ')}.`
            }
        ];

        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4", // Updated to use GPT-4
                messages: messages,
                max_tokens: 800,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content?.trim() || "No analysis available.";
    }
}

export default Ai;