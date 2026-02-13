// Final test with correct model
const apiKey = "AIzaSyCgbgYJ6JtDfj6B4RkWfb55U_sIrwqioeA";

async function testCorrectModel() {
    console.log("Testing Gemini 2.5 Flash...\n");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Say 'Hello! The chatbot is working perfectly!'"
                        }]
                    }]
                }),
            }
        );

        console.log("Status:", response.status);

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            console.log("\n✅ SUCCESS! API is working!");
            console.log("\nAI Response:");
            console.log(data.candidates[0].content.parts[0].text);
        } else if (data.error) {
            console.log("\n❌ ERROR:");
            console.log(JSON.stringify(data.error, null, 2));
        }
    } catch (error) {
        console.error("\n❌ ERROR:", error.message);
    }
}

testCorrectModel();
