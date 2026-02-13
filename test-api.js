// Test script to verify Gemini API
const apiKey = "AIzaSyCgbgYJ6JtDfj6B4RkWfb55U_sIrwqioeA";

async function testGeminiAPI() {
    console.log("Testing Gemini API...\n");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Hello, please respond with 'API is working!'"
                        }]
                    }]
                }),
            }
        );

        console.log("Status:", response.status);
        console.log("Status Text:", response.statusText);

        const data = await response.json();
        console.log("\nFull Response:");
        console.log(JSON.stringify(data, null, 2));

        if (data.candidates && data.candidates.length > 0) {
            console.log("\n✅ SUCCESS! API Response:");
            console.log(data.candidates[0].content.parts[0].text);
        } else if (data.error) {
            console.log("\n❌ ERROR from API:");
            console.log(data.error);
        }
    } catch (error) {
        console.error("\n❌ ERROR:", error.message);
    }
}

testGeminiAPI();
