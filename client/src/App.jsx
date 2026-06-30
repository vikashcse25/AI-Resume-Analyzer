/*import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";*/
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import {
  Brain,
  Briefcase,
  BarChart3,
  Wrench,
  TrendingUp,
  Rocket,
} from "lucide-react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);
  const [atsScore, setAtsScore] = useState(0);
  const [missingSkills, setMissingSkills] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [domain, setDomain] = useState("");
const [role, setRole] = useState("");
const [experienceLevel, setExperienceLevel] = useState("");
const [domainConfidence, setDomainConfidence] = useState(0);
const [roleConfidence, setRoleConfidence] = useState(0);
const [experienceConfidence, setExperienceConfidence] = useState(0);
const [benchmarkPercentile, setBenchmarkPercentile] =
  useState(0);
  const [improvedText, setImprovedText] = useState("");

  useEffect(() => {
  fetch("http://localhost:5000")
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    });
}, []);

  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  setFile(selectedFile);

  if (selectedFile) {
    setPdfUrl(URL.createObjectURL(selectedFile));
  }
};
const downloadReport = () => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("AI Resume Analysis Report", 20, y);

  y += 20;

  doc.setFontSize(14);
  doc.text(`ATS Score: ${atsScore}/100`, 20, y);

  y += 15;

  doc.text("Detected Skills:", 20, y);

  y += 10;

  skills.forEach((skill) => {
    doc.text(`• ${skill}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.text("Missing Skills:", 20, y);

  y += 10;

  missingSkills.forEach((skill) => {
    doc.text(`• ${skill}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.text("Strengths:", 20, y);

  y += 10;

  aiAnalysis?.strengths?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.text("Weaknesses:", 20, y);

  y += 10;

  aiAnalysis?.weaknesses?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.text("Suggestions:", 20, y);

  y += 10;

  aiAnalysis?.suggestions?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  doc.save("AI-Resume-Report.pdf");
};

const improveText = async (text) => {
  const response = await fetch(
    "http://localhost:5000/rewrite",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  const data = await response.json();

  setImprovedText(data.improvedText);
};


const handleUpload = async () => {
  try {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Server Error");
}

    console.log("BACKEND RESPONSE:", data);
   console.log("AI ANALYSIS:", data.aiAnalysis);

    if (!response.ok) {
      alert(data.message || "Server Error");
      return;
    }

    setMessage(data.message || "");
    setResumeText(data.text || "");
    setSkills(data.skills || []);
    setAtsScore(data.atsScore || 0);
    setMissingSkills(data.missingSkills || []);
    setAiAnalysis(data.aiAnalysis || null);
    setDomain(data.aiAnalysis?.domain || "");
setRole(data.aiAnalysis?.role || "");
setExperienceLevel(
  data.aiAnalysis?.experienceLevel || ""
);
setDomainConfidence(data.aiAnalysis?.domainConfidence || 0);
setDomainConfidence(
  data.aiAnalysis?.domainConfidence || 0
);

setRoleConfidence(
  data.aiAnalysis?.roleConfidence || 0
);

setExperienceConfidence(
  data.aiAnalysis?.experienceConfidence || 0
);
setBenchmarkPercentile(
  data.benchmarkPercentile || 0
);




  } catch (error) {
    console.error("UPLOAD ERROR:", error);
  } finally {
    setLoading(false);
  }
};
console.log("STATE CHECK");
console.log(aiAnalysis);

 return (
  <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[150px]" />

<div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="text-center mb-12">

  
   <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-md">

  <span className="text-green-400">🚀</span>

  <span className="text-sm text-zinc-300 font-medium">
    AI Powered Resume Intelligence
  </span>

</div>
  <h1
    className="
      text-6xl
      md:text-7xl
      font-extrabold
      bg-gradient-to-r
      from-green-400
      via-blue-500
      to-purple-500
      bg-clip-text
      text-transparent
      leading-tight
    "
  >
    AI Resume
    <br />
    Analyzer
  </h1>
<p
  className="
    mt-8
    max-w-3xl
    mx-auto
    text-lg
    leading-8
    text-zinc-400
  "
>
  Analyze resumes with AI in seconds. Get an ATS Score, detect skills,
  identify missing keywords, predict the best job role, discover career
  opportunities, and receive personalized improvement suggestions—all in
  one place.
</p>
  <div className="mt-10 flex flex-wrap justify-center gap-4">

  <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-green-500 transition-all">
    🎯 ATS Score
  </div>

  <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-all">
    🤖 AI Analysis
  </div>

  <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500 transition-all">
    💼 Role Detection
  </div>

  <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-yellow-500 transition-all">
    🚀 Career Insights
  </div>

</div>
</div>

      <div className="
mt-12
bg-gradient-to-br
from-zinc-900
to-zinc-950
border
border-zinc-800
rounded-3xl
p-8
shadow-2xl
">

        <div
  className="
    border-2
    border-dashed
    border-zinc-700
    rounded-3xl
    p-12
    text-center
    hover:border-green-500
    transition-all
    duration-300
    bg-zinc-950
  "
>
  
<div className="text-center mb-8">

  <h2 className="text-3xl font-bold">
    Upload Your Resume
  </h2>

  <p className="mt-3 text-zinc-400 max-w-xl mx-auto">
    Upload your PDF resume and let AI analyze your skills,
    ATS compatibility, career opportunities and personalized
    recommendations in seconds.
  </p>

</div>
  <label
  htmlFor="resume-upload"
  className="
    group
    block
    border-2
    border-dashed
    border-zinc-700
    rounded-3xl
    p-12
    text-center
    cursor-pointer
    transition-all
    duration-300
    hover:border-green-500
    hover:bg-zinc-900/60
  "
>

  <div className="text-6xl mb-5 group-hover:scale-110 transition-all">
    📄
  </div>

  <h3 className="text-2xl font-bold">
    Drag & Drop Your Resume
  </h3>

  <p className="mt-3 text-zinc-400">
    PDF only • Max Size 10 MB
  </p>

  <div
    className="
      mt-8
      inline-flex
      px-6
      py-3
      rounded-xl
      bg-green-500
      text-black
      font-semibold
      group-hover:scale-105
      transition-all
    "
  >
    Browse Resume
  </div>

  <input
    id="resume-upload"
    type="file"
    accept=".pdf"
    onChange={handleFileChange}
    className="hidden"
  />

</label>
</div>

        {file && (
          <div
  className="
    mt-4
    p-4
    rounded-xl
    bg-green-950
    border
    border-green-800
    text-green-300
  "
>
  📄 {file.name}
</div>
        )}

        <button
  onClick={handleUpload}
  disabled={loading}
  className="
mt-6
px-8
py-4
rounded-xl
bg-gradient-to-r
from-green-500
to-blue-500
text-white
font-bold
hover:scale-105
hover:shadow-xl
hover:shadow-green-500/30
transition-all
duration-300
disabled:opacity-50
"
>
  {loading ? (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>Analyzing Resume...</span>
  </div>
) : (
  "Analyze Resume"
)}
</button>
<div className="mt-8 flex flex-wrap justify-center gap-4">

  <div className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700">
    🔒 100% Secure
  </div>

  <div className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700">
    ⚡ AI Powered
  </div>

  <div className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700">
    📄 PDF Only
  </div>

  <div className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700">
    🚀 Instant Analysis
  </div>

</div>

      </div>

{/* Platform Stats */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 mb-14">

  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center hover:border-green-500 transition-all">
    <h2 className="text-4xl font-bold text-green-400">
      25K+
    </h2>

    <p className="mt-2 text-zinc-400">
      Resumes Analyzed
    </p>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center hover:border-blue-500 transition-all">
    <h2 className="text-4xl font-bold text-blue-400">
      96%
    </h2>

    <p className="mt-2 text-zinc-400">
      ATS Accuracy
    </p>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center hover:border-purple-500 transition-all">
    <h2 className="text-4xl font-bold text-purple-400">
      150+
    </h2>

    <p className="mt-2 text-zinc-400">
      Skills Supported
    </p>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center hover:border-yellow-500 transition-all">
    <h2 className="text-4xl font-bold text-yellow-400">
      24/7
    </h2>

    <p className="mt-2 text-zinc-400">
      AI Available
    </p>
  </div>

</div>

{/* Features Section */}

<div className="mt-20">

  <div className="text-center">

    <h2 className="text-4xl font-bold">
      Why Choose AI Resume Analyzer?
    </h2>

    <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
      Everything you need to analyze, optimize and improve your resume using AI.
    </p>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

    {/* Card 1 */}

    <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-green-500 hover:-translate-y-2 transition-all duration-300">

      <BarChart3 size={42} className="text-green-400 mb-5 group-hover:scale-110 transition-all"/>

      <h3 className="text-2xl font-bold">
        ATS Score
      </h3>

      <p className="mt-3 text-zinc-400">
        Instantly evaluate how ATS-friendly your resume is with an AI-generated score.
      </p>

    </div>

    {/* Card 2 */}

    <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">

      <Brain size={42} className="text-blue-400 mb-5 group-hover:scale-110 transition-all"/>

      <h3 className="text-2xl font-bold">
        AI Resume Review
      </h3>

      <p className="mt-3 text-zinc-400">
        Discover strengths, weaknesses and personalized suggestions powered by AI.
      </p>

    </div>

    {/* Card 3 */}

    <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-purple-500 hover:-translate-y-2 transition-all duration-300">

      <Briefcase size={42} className="text-purple-400 mb-5 group-hover:scale-110 transition-all"/>

      <h3 className="text-2xl font-bold">
        Career Detection
      </h3>

      <p className="mt-3 text-zinc-400">
        AI automatically predicts your domain, role and experience level.
      </p>

    </div>

    {/* Card 4 */}

    <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 hover:-translate-y-2 transition-all duration-300">

      <Wrench size={42} className="text-yellow-400 mb-5 group-hover:scale-110 transition-all"/>

      <h3 className="text-2xl font-bold">
        Skill Extraction
      </h3>

      <p className="mt-3 text-zinc-400">
        Detect technologies, tools and professional skills from any resume.
      </p>

    </div>

    {/* Card 5 */}

    <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-pink-500 hover:-translate-y-2 transition-all duration-300">

      <TrendingUp size={42} className="text-pink-400 mb-5 group-hover:scale-110 transition-all"/>

      <h3 className="text-2xl font-bold">
        Skill Gap Analysis
      </h3>

      <p className="mt-3 text-zinc-400">
        Find missing skills and improve your resume for better opportunities.
      </p>

    </div>

    {/* Card 6 */}

    <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">

      <Rocket size={42} className="text-cyan-400 mb-5 group-hover:scale-110 transition-all"/>

      <h3 className="text-2xl font-bold">
        Career Growth
      </h3>

      <p className="mt-3 text-zinc-400">
        Receive actionable recommendations to improve your resume and boost hiring chances.
      </p>

    </div>

  </div>

</div>
{/* ================= HOW IT WORKS ================= */}

<div className="mt-24">

  <div className="text-center">

    <h2 className="text-4xl font-bold">
      How It Works
    </h2>

    <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
      Analyze your resume in four simple AI-powered steps.
    </p>

  </div>

  <div className="grid md:grid-cols-4 gap-8 mt-14">

    {/* Step 1 */}

    <div className="text-center">

      <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center text-3xl font-bold text-black">
        1
      </div>

      <h3 className="mt-6 text-xl font-bold">
        Upload Resume
      </h3>

      <p className="mt-3 text-zinc-400">
        Upload your PDF resume securely.
      </p>

    </div>

    {/* Step 2 */}

    <div className="text-center">

      <div className="w-20 h-20 mx-auto rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold text-white">
        2
      </div>

      <h3 className="mt-6 text-xl font-bold">
        AI Processing
      </h3>

      <p className="mt-3 text-zinc-400">
        Our AI extracts skills, experience and career information.
      </p>

    </div>

    {/* Step 3 */}

    <div className="text-center">

      <div className="w-20 h-20 mx-auto rounded-full bg-purple-500 flex items-center justify-center text-3xl font-bold text-white">
        3
      </div>

      <h3 className="mt-6 text-xl font-bold">
        Smart Analysis
      </h3>

      <p className="mt-3 text-zinc-400">
        Receive ATS score, strengths, weaknesses and missing skills.
      </p>

    </div>

    {/* Step 4 */}

    <div className="text-center">

      <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500 flex items-center justify-center text-3xl font-bold text-black">
        4
      </div>

      <h3 className="mt-6 text-xl font-bold">
        Improve Resume
      </h3>

      <p className="mt-3 text-zinc-400">
        Apply AI suggestions and increase your interview chances.
      </p>

    </div>

  </div>

</div>
{/* ================= POWERED BY ================= */}

<div className="mt-24">

  <div className="text-center">

    <h2 className="text-4xl font-bold">
      Built With Modern Technologies
    </h2>

    <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
      Powered by cutting-edge AI and modern web technologies for fast,
      secure and intelligent resume analysis.
    </p>

  </div>

  <div className="flex flex-wrap justify-center gap-5 mt-12">

    {[
      "⚛ React",
      "🟢 Node.js",
      "☁ Express",
      "🍃 MongoDB",
      "🤖 Ollama",
      "🧠 AI",
      "📄 PDF Parser",
      "🎨 TailwindCSS",
      "⚡ JavaScript",
      "🔐 Secure Upload"
    ].map((tech, index) => (

      <div
        key={index}
        className="
          px-6
          py-4
          rounded-2xl
          bg-zinc-900
          border
          border-zinc-800
          hover:border-green-500
          hover:-translate-y-2
          hover:shadow-xl
          hover:shadow-green-500/20
          transition-all
          duration-300
          text-lg
          font-medium
        "
      >
        {tech}
      </div>

    ))}

  </div>

</div>
{/* ================= WHY USERS LOVE US ================= */}

<div className="mt-24">

  <div className="text-center">

    <h2 className="text-4xl font-bold">
      Why Users Love AI Resume Analyzer
    </h2>

    <p className="mt-4 text-zinc-400 max-w-3xl mx-auto">
      Built for students, professionals and recruiters to simplify resume
      analysis with AI-powered insights.
    </p>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 hover:border-green-500 transition-all hover:-translate-y-2">
      <div className="text-5xl mb-5">⚡</div>

      <h3 className="text-2xl font-bold">
        Instant Analysis
      </h3>

      <p className="mt-3 text-zinc-400">
        Upload your resume and receive detailed AI insights within seconds.
      </p>
    </div>

    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 hover:border-blue-500 transition-all hover:-translate-y-2">
      <div className="text-5xl mb-5">🎯</div>

      <h3 className="text-2xl font-bold">
        High ATS Accuracy
      </h3>

      <p className="mt-3 text-zinc-400">
        Analyze resume quality and optimize it for Applicant Tracking Systems.
      </p>
    </div>

    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 hover:border-purple-500 transition-all hover:-translate-y-2">
      <div className="text-5xl mb-5">🌍</div>

      <h3 className="text-2xl font-bold">
        Any Industry
      </h3>

      <p className="mt-3 text-zinc-400">
        Engineering, Finance, Healthcare, Marketing, Design, Law, Education and many more.
      </p>
    </div>

    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 hover:border-yellow-500 transition-all hover:-translate-y-2">
      <div className="text-5xl mb-5">🧠</div>

      <h3 className="text-2xl font-bold">
        AI Career Insights
      </h3>

      <p className="mt-3 text-zinc-400">
        Discover suitable job roles, experience level and personalized career recommendations.
      </p>
    </div>

    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 hover:border-pink-500 transition-all hover:-translate-y-2">
      <div className="text-5xl mb-5">🔒</div>

      <h3 className="text-2xl font-bold">
        Privacy First
      </h3>

      <p className="mt-3 text-zinc-400">
        Your uploaded resumes stay secure and are processed with privacy in mind.
      </p>
    </div>

    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 hover:border-cyan-500 transition-all hover:-translate-y-2">
      <div className="text-5xl mb-5">🚀</div>

      <h3 className="text-2xl font-bold">
        Career Growth
      </h3>

      <p className="mt-3 text-zinc-400">
        Improve your resume continuously with AI suggestions and skill gap analysis.
      </p>
    </div>

  </div>

</div>
{atsScore > 0 && (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

    {/* ATS */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:scale-105 transition-all">
      <p className="text-zinc-400 text-sm">
        ATS Score
      </p>

      <h3 className="text-4xl font-bold text-green-400 mt-2">
        {atsScore}
      </h3>
    </div>

    {/* Skills */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:scale-105 transition-all">
      <p className="text-zinc-400 text-sm">
        Skills Found
      </p>

      <h3 className="text-4xl font-bold text-blue-400 mt-2">
        {skills.length}
      </h3>
    </div>

    {/* Missing */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:scale-105 transition-all">
      <p className="text-zinc-400 text-sm">
        Missing Skills
      </p>

      <h3 className="text-4xl font-bold text-red-400 mt-2">
        {missingSkills.length}
      </h3>
    </div>

    {/* AI */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:scale-105 transition-all">
      <p className="text-zinc-400 text-sm">
        AI Score
      </p>

      <h3 className="text-4xl font-bold text-purple-400 mt-2">
        {aiAnalysis?.score || 0}
      </h3>
    </div>

  </div>
)}

{domain && (
  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

    <h2 className="text-2xl font-bold mb-6">
      Candidate Profile
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

  <h2 className="text-2xl font-bold mb-6">
    AI Confidence Analysis
  </h2>

  <div className="space-y-6">

    {/* Domain */}

    <div>
      <div className="flex justify-between mb-2">
        <span>Domain Detection</span>
        <span>{domainConfidence}%</span>
      </div>

      <div className="w-full bg-zinc-800 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${domainConfidence}%` }}
        />
      </div>
    </div>

    {/* Role */}

    <div>
      <div className="flex justify-between mb-2">
        <span>Role Detection</span>
        <span>{roleConfidence}%</span>
      </div>

      <div className="w-full bg-zinc-800 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${roleConfidence}%` }}
        />
      </div>
    </div>

    {/* Experience */}

    <div>
      <div className="flex justify-between mb-2">
        <span>Experience Detection</span>
        <span>{experienceConfidence}%</span>
      </div>

      <div className="w-full bg-zinc-800 rounded-full h-3">
        <div
          className="bg-yellow-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${experienceConfidence}%` }}
        />
      </div>
    </div>

  </div>

</div>
    </h2>

    <div className="grid md:grid-cols-3 gap-4">

      <div className="bg-zinc-950 p-5 rounded-2xl">
        <p className="text-zinc-400 text-sm">
          Domain
        </p>

        <p className="text-xl font-bold text-green-400 mt-2">
          {domain}
        </p>
      </div>

      <div className="bg-zinc-950 p-5 rounded-2xl">
        <p className="text-zinc-400 text-sm">
          Role
        </p>

        <p className="text-xl font-bold text-blue-400 mt-2">
          {role}
        </p>
      </div>

      <div className="bg-zinc-950 p-5 rounded-2xl">
        <p className="text-zinc-400 text-sm">
          Experience
        </p>

        <p className="text-xl font-bold text-yellow-400 mt-2">
          {experienceLevel}
        </p>
      </div>

    </div>

  </div>
)}


 {atsScore > 0 && (
  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

    <h2 className="text-3xl font-bold mb-8 text-center">
      📊 ATS Resume Score
    </h2>

    <div className="flex flex-col items-center">

      <div className="relative w-56 h-56">

        {/* Background Circle */}

        <svg
          className="w-56 h-56 rotate-[-90deg]"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="#27272a"
            strokeWidth="15"
            fill="none"
          />

          <circle
            cx="100"
            cy="100"
            r="85"
            stroke={
              atsScore >= 80
                ? "#22c55e"
                : atsScore >= 60
                ? "#eab308"
                : "#ef4444"
            }
            strokeWidth="15"
            fill="none"
            strokeDasharray={534}
            strokeDashoffset={
              534 - (534 * atsScore) / 100
            }
            strokeLinecap="round"
          />
        </svg>

        {/* Center Score */}

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <p className="text-5xl font-extrabold">
            {atsScore}
          </p>

          <p className="text-zinc-400">
            /100
          </p>

        </div>

      </div>

      {/* Status */}

      <div className="mt-6">

        {atsScore >= 80 && (
          <div className="px-5 py-3 rounded-xl bg-green-900 text-green-300 font-semibold">
            🚀 Excellent Resume
          </div>
        )}

        {atsScore >= 60 && atsScore < 80 && (
          <div className="px-5 py-3 rounded-xl bg-yellow-900 text-yellow-300 font-semibold">
            👍 Good Resume
          </div>
        )}

        {atsScore < 60 && (
          <div className="px-5 py-3 rounded-xl bg-red-900 text-red-300 font-semibold">
            ⚠️ Needs Improvement
          </div>
        )}

      </div>

    </div>

  </div>
)}

{benchmarkPercentile > 0 && (
  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

    <h2 className="text-2xl font-bold mb-4">
      Resume Benchmark
    </h2>

    <div className="flex items-center justify-between">

      <div>
        <p className="text-zinc-400">
          Your resume performs better than
        </p>

        <h1 className="text-5xl font-bold text-green-400 mt-2">
          {benchmarkPercentile}%
        </h1>

        <p className="text-zinc-400 mt-2">
          of resumes analyzed
        </p>
      </div>

      <div className="text-6xl">
        🏆
      </div>

    </div>

  </div>
)}





{skills.length > 0 && (
  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">
        🚀 Detected Skills
      </h2>

      <span className="px-4 py-2 bg-green-900 text-green-300 rounded-xl text-sm font-semibold">
        {skills.length} Skills Found
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

      {skills.map((skill, index) => (
        <div
          key={index}
          className="
            bg-zinc-800
            border
            border-zinc-700
            rounded-2xl
            p-4
            hover:border-green-500
            hover:-translate-y-1
            hover:shadow-xl
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <div className="text-center">

            <div className="text-2xl mb-2">
              ⚡
            </div>

            <p className="font-semibold text-zinc-100">
              {skill.toUpperCase()}
            </p>

          </div>
        </div>
      ))}

    </div>

  </div>
)}

{missingSkills.length > 0 && (
  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

    <div className="flex items-center justify-between mb-6">

      <h2 className="text-2xl font-bold">
        🎯 Recommended Skills
      </h2>

      <span className="px-4 py-2 bg-red-900 text-red-300 rounded-xl text-sm font-semibold">
        {missingSkills.length} Skills Missing
      </span>

    </div>

    <p className="text-zinc-400 mb-6">
      Adding these skills can improve your ATS score and make your resume
      more competitive for modern software engineering roles.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">

      {missingSkills.map((missingSkill, index) => (
        <div
          key={index}
          className="
            bg-red-950/40
            border
            border-red-800
            rounded-2xl
            p-4
            hover:border-red-500
            hover:-translate-y-1
            hover:shadow-lg
            hover:shadow-red-900/20
            transition-all
            duration-300
            cursor-pointer
          "
        >

          <div className="flex flex-col items-center">

            <div className="text-3xl mb-3">
              🔥
            </div>

            <p className="font-semibold text-red-200 text-center">
              {missingSkill.toUpperCase()}
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>
)}

{pdfUrl && (
  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

    <h2 className="text-2xl font-bold mb-6">
      Resume Preview
    </h2>

    <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800">

      <iframe
        src={pdfUrl}
        title="Resume Preview"
        className="w-full h-[600px]"
      />

    </div>

  </div>
)}

{aiAnalysis && (
  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

    <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold">
        🤖 AI Resume Analysis
      </h2>

      <div className="px-5 py-3 rounded-2xl bg-green-900 border border-green-700">
        <p className="text-sm text-green-300">
          AI Score
        </p>

        <p className="text-2xl font-bold text-white">
          {aiAnalysis.score}/100
        </p>
      </div>

    </div>

    <div className="grid md:grid-cols-3 gap-6">

      {/* Strengths */}

      <div
        className="
          bg-zinc-950
          border-l-4
          border-green-500
          rounded-2xl
          p-6
          hover:scale-105
          transition-all
          duration-300
        "
      >
        <h3 className="text-green-400 text-xl font-bold mb-4">
          ✅ Strengths
        </h3>

        <div className="space-y-3">

          {aiAnalysis?.strengths?.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-3 rounded-xl"
            >
              {item}
            </div>
          ))}

        </div>

      </div>

      {/* Weaknesses */}

      <div
        className="
          bg-zinc-950
          border-l-4
          border-red-500
          rounded-2xl
          p-6
          hover:scale-105
          transition-all
          duration-300
        "
      >
        <h3 className="text-red-400 text-xl font-bold mb-4">
          ⚠️ Weaknesses
        </h3>
        <button
  onClick={() => improveText(item)}
  className="
    mt-3
    px-4
    py-2
    bg-red-500
    rounded-lg
  "
>
  Improve With AI
</button>
        <div className="space-y-3">

          {aiAnalysis?.weaknesses?.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-3 rounded-xl"
            >
              {item}
            </div>
          ))}

        </div>

      </div>

      {/* Suggestions */}

      <div
        className="
          bg-zinc-950
          border-l-4
          border-blue-500
          rounded-2xl
          p-6
          hover:scale-105
          transition-all
          duration-300
        "
      >
        <h3 className="text-blue-400 text-xl font-bold mb-4">
          🚀 Suggestions
        </h3>

        <div className="space-y-3">

          {aiAnalysis?.suggestions?.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-3 rounded-xl"
            >
              {item}
            </div>
          ))}

        </div>

      </div>

    </div>

  </div>
)}

{improvedText && (
  <div className="mt-8 bg-zinc-900 p-6 rounded-2xl">

    <h2 className="text-xl font-bold mb-4">
      AI Improved Version
    </h2>

    <p className="text-zinc-300">
      {improvedText}
    </p>

  </div>
)}


{aiAnalysis && (
  <div className="flex justify-between items-center mb-6">

  <h2 className="text-3xl font-bold">
    AI Resume Analysis
  </h2>

  <button
    onClick={downloadReport}
    className="
      px-5
      py-3
      rounded-xl
      bg-green-500
      text-black
      font-semibold
      hover:scale-105
      transition-all
      shadow-lg
    "
  >
    📥 Download AI Report
  </button>

</div>
)}

    </div>
    <footer className="mt-20 border-t border-zinc-800 py-8">

  <div className="text-center">

    <h3 className="text-lg font-semibold text-white">
      AI Resume Analyzer
    </h3>

    <p className="text-zinc-500 mt-2">
      Built with React, Node.js, Ollama & AI 🚀
    </p>

    <p className="text-zinc-600 text-sm mt-4">
      © 2026 All Rights Reserved
    </p>

  </div>

</footer>
  </div>
);

}

export default App;