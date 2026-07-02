require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

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

const prompt = `
Analyze this resume carefully.

Tasks:

1. Detect the candidate's Domain.
2. Detect the most suitable Job Role.
3. Detect Experience Level.
4. Give an ATS Score out of 100.
5. List top strengths.
6. List weaknesses.
7. Give improvement suggestions.

Return ONLY valid JSON.

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
`;

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

let raw = response.text;

raw = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let aiAnalysis;

try {
  aiAnalysis = JSON.parse(raw);
} catch (error) {
  console.log("Gemini JSON Parse Error");

  aiAnalysis = {
    domain: "Unknown",
    role: "Unknown",
    experienceLevel: "Unknown",
    domainConfidence: 0,
    roleConfidence: 0,
    experienceConfidence: 0,
    score: 0,
    strengths: [],
    weaknesses: [],
    suggestions: [],
  };
}

console.log(aiAnalysis);

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

app.get("/ai-test", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello in one sentence",
    });

    res.json({
      message: response.text,
    });
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

    const prompt = `
Rewrite the following resume point professionally.

Return only the improved sentence.

Text:
${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      improvedText: response.text.trim(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});