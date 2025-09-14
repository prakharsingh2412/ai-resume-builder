import React, { useState, useRef, JSX } from 'react';
import AuthModal from '../features/AuthModal';
import DownloadModal from '../features/DownloadModal';

import Editor from '../features/Editor';
import AtsPanel from '../features/ATSPanel';

export default function HomePage(): JSX.Element {
    const [authOpen, setAuthOpen] = useState(false);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [resumeContent, setResumeContent] = useState('');

    // Add file upload handler
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setResumeContent(content);
            };
            reader.readAsText(file);
        }
    };

    return (
        <section>
            {/* Hero + quick actions (kept short) */}
            <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="col-span-2 bg-gradient-to-br from-white/3 to-transparent p-6 rounded-2xl glassmorphism shadow-lg">
                    <h2 className="text-3xl font-bold mb-2">Build a premium, ATS-friendly resume — fast.</h2>
                    <div className="flex gap-3">
                        <button className="btn" onClick={() => setAuthOpen(true)}>Create resume</button>
                        <button className="btn-ghost" onClick={() => alert('Load template')}>Try template</button>
                    </div>


                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-white/5">
                            <label className="block text-sm text-slate-300 mb-2">Upload resume (PDF/DOC)</label>
                            <input 
                                type="file" 
                                accept=".pdf,.doc,.docx" 
                                className="w-full"
                                onChange={handleFileUpload}
                            />
                        </div>


                        <div className="p-4 rounded-xl bg-white/5">
                            <label className="block text-sm text-slate-300 mb-2">Import from LinkedIn</label>
                            <div className="flex gap-2">
                                <input placeholder="https://www.linkedin.com/in/your-profile" className="input" />
                                <button className="btn-sm">Import</button>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5">
                            <label className="block text-sm text-slate-300 mb-2">Job Description</label>
                            <textarea
                                className="w-full p-2 bg-white/10 rounded"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste job description here..."
                            />
                        </div>
                    </div>
                </div>


                <aside className="p-6 rounded-2xl bg-gradient-to-b from-white/3 to-transparent glassmorphism shadow-lg">
                    <AtsPanel 
                        jobDescription={jobDescription}
                        resumeContent={resumeContent}
                    />
                </aside>
            </div>


            {/* Editor + right preview */}
            <section className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Editor onOpenDownload={() => setDownloadOpen(true)} />
                </div>
                <aside>
                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md">
                        <h4 className="font-semibold mb-2">Live Preview</h4>
                        <div className="p-3 rounded-lg bg-gradient-to-b from-white/6 to-transparent min-h-[220px]">Preview pane</div>
                    </div>
                </aside>
            </section>


            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
            {downloadOpen && <DownloadModal onClose={() => setDownloadOpen(false)} />}
        </section>
    );
}