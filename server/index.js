const { default: ollama } = require("ollama");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const cors = require("cors");
const multer = require("multer");


const app = express();

app.use(cors());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
res.send("Server Running");
});

app.post("/upload", upload.single("resume"), async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({
message: "No PDF uploaded",
});
}


const pdfBuffer = fs.readFileSync(req.file.path);

const pdfData = await pdfParse(pdfBuffer);

const text = pdfData.text;

const aiResponse = await ollama.chat({
  model: "qwen2.5:3b",
  messages: [
    {
      role: "user",
      content: `


Analyze this resume carefully.

Tasks:

1. Detect the candidate's Domain.
2. Detect the most suitable Job Role.
3. Detect Experience Level (Fresher, Entry Level, Mid Level, Senior Level, etc.).
4. Give an ATS Score out of 100.
5. List top strengths.
6. List weaknesses or missing areas.
7. Give improvement suggestions.

IMPORTANT:

* Return ONLY valid JSON.
* Do NOT add explanations.
* Do NOT add markdown.
* Do NOT add text before or after JSON.

Format:

{
  "domain": "",
  "domainConfidence": 0,

  "role": "",
  "roleConfidence": 0,

  "experienceLevel": "",
  "experienceConfidence": 0,

  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}
Resume:

${text}
`,
    
    },
  ],
}); 
console.log("RAW AI RESPONSE:");
console.log(aiResponse.message.content);

let aiAnalysis;

try {
  aiAnalysis = JSON.parse(aiResponse.message.content);
} catch (error) {
  console.log("JSON Parse Error");

  aiAnalysis = {
    domain: "Unknown",
    role: "Unknown",
    experienceLevel: "Unknown",
    score: 0,
    strengths: [],
    weaknesses: [],
    suggestions: [],
  };
}

console.log("AI ANALYSIS =", aiAnalysis);

const skills = [];

const skillKeywords = [
  "react",
  "node.js",
  "express",
  "mongodb",
  "javascript",
  "typescript",
  "python",
  "java",
  "aws",
  "docker",
  "kafka",
  "nestjs",
  "postgresql",
  "mysql",
  "graphql",
  "langgraph",
  "openai",
  "git",
  "github",
];

skillKeywords.forEach((skill) => {
  if (text.toLowerCase().includes(skill.toLowerCase())) {
    skills.push(skill);
  }
});

const atsScore = Math.min(skills.length * 5, 100);
const benchmarkPercentile = Math.min(
  atsScore + Math.floor(Math.random() * 15),
  99
);

const recommendedSkills = [
  "react",
  "mongodb",
  "redis",
  "docker",
  "kubernetes",
  "aws",
  "system design",
  "microservices",
];

const missingSkills = recommendedSkills.filter(
  (skill) =>
    !text.toLowerCase().includes(skill.toLowerCase())
);

console.log("SENDING RESPONSE");

res.json({
  message: "PDF text extracted successfully",
  text,
  skills,
  atsScore,
  benchmarkPercentile,
  missingSkills,
  aiAnalysis,
  
});



} catch (error) {
console.error("FULL ERROR:", error);


res.status(500).json({
  message: error.message,
});


}
});

app.get("/test", (req, res) => {
res.send("TEST ROUTE WORKING");
});

app.get("/ai-test", async (req, res) => {
try {
const response = await ollama.chat({
model: "qwen2.5:3b",
messages: [
{
role: "user",
content: "Say hello in one sentence",
},
],
});


res.json(response);


} catch (error) {
console.error(error);

res.status(500).json({
  message: error.message,
});


}
});

app.listen(5000, () => {
console.log("Server running on port 5000");
});
app.post("/rewrite", express.json(), async (req, res) => {
  try {
    const { text } = req.body;

    const response = await ollama.chat({
      model: "qwen2.5:3b",
      messages: [
        {
          role: "user",
          content: `
Rewrite the following resume point professionally.

Return only the improved sentence.

Text:
${text}
          `,
        },
      ],
    });

    res.json({
      improvedText: response.message.content,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});