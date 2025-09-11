import React, { JSX, useState } from 'react';
import AuthModal from '../features/AuthModal';


export default function Header(): JSX.Element {
const [authOpen, setAuthOpen] = useState(false);
return (
<header className="px-6 py-5 flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-blue to-[#00d4ff] shadow-md flex items-center justify-center glassmorphism">AI</div>
<h1 className="text-xl font-semibold">Aurora Résumé — AI Resume Builder</h1>
</div>
<div className="flex items-center gap-3">
<button className="btn-ghost" onClick={() => setAuthOpen(true)}>Login</button>
<button className="btn-primary" onClick={() => setAuthOpen(true)}>Get Started</button>
</div>
{authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
</header>
);
}