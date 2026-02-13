// Script to list available Gemini models
const apiKey = "AIzaSyCgbgYJ6JtDfj6B4RkWfb55U_sIrwqioeA";

async function listModels() {
    console.log("Fetching available Gemini models...\n");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        console.log("Status:", response.status);

        const data = await response.json();

        if (data.models) {
            console.log("\n✅ Available Models:\n");
            data.models.forEach(model => {
                console.log(`Name: ${model.name}`);
                console.log(`Display Name: ${model.displayName}`);
                console.log(`Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
                console.log("---");
            });
        } else if (data.error) {
            console.log("\n❌ ERROR:");
            console.log(JSON.stringify(data.error, null, 2));
        }
    } catch (error) {
        console.error("\n❌ ERROR:", error.message);
    }
}

listModels();
