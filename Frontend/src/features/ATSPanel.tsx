import React, { useState, useEffect, JSX } from 'react';


export default function ATSPanel(): JSX.Element {
const [keywords, setKeywords] = useState('React, TypeScript, Node.js');
const [atsScore, setAtsScore] = useState<number | null>(null);
const [feedback, setFeedback] = useState<string[]>([]);


useEffect(() => {
const timer = setTimeout(() => runAts(), 600);
return () => clearTimeout(timer);
}, [keywords]);


function runAts() {
const kws = keywords.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
// simple mock: random score for demo
const score = Math.min(100, Math.round(kws.length * 20));
setAtsScore(score);
setFeedback(kws.length ? kws.map(k => `Check: ${k}`) : ['Add keywords']);
}


return (
<div>
<h3 className="font-semibold mb-3">ATS Score</h3>
<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-3">
<div style={{ width: `${atsScore ?? 0}%` }} className="h-3 bg-gradient-to-r from-[#00ffd5] to-[#00a3ff] transition-width" />
</div>
<div className="text-xs text-slate-300 mb-2">{atsScore ?? '--'}</div>
<label className="text-xs">Edit keywords</label>
<input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="input mt-2" />
<ul className="text-sm mt-2 text-slate-200">{feedback.map((f, i) => <li key={i}>• {f}</li>)}</ul>
</div>
);
}