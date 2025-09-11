import React from 'react';
import Modal from '../components/Modal';


export default function DownloadModal({ onClose }: { onClose?: () => void }) {
async function handleExport(format: 'pdf' | 'docx' | 'txt') {
onClose?.();
alert(`Exporting as ${format} (mock)`);
}


return (
<Modal onClose={onClose}>
<h4 className="font-semibold mb-3">Export resume</h4>
<p className="text-sm text-slate-300 mb-4">Choose a format. For pixel-perfect PDFs use server-side rendering or a headless browser.</p>
<div className="flex gap-2">
<button className="btn" onClick={() => handleExport('pdf')}>Download PDF</button>
<button className="btn-ghost" onClick={() => handleExport('docx')}>Download DOCX</button>
<button className="btn-ghost" onClick={() => handleExport('txt')}>Download TXT</button>
</div>
</Modal>
);
}