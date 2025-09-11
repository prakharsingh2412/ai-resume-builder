import React, { useRef, useEffect, useState } from 'react';


export default function Editor({ onOpenDownload }: { onOpenDownload?: () => void }) {
const [contentHtml, setContentHtml] = useState<string>(() => defaultResumeHtml());
const ref = useRef<HTMLDivElement | null>(null);


useEffect(() => {
if (ref.current) ref.current.innerHTML = contentHtml;
}, [contentHtml]);


function onInput() {
setContentHtml(ref.current?.innerHTML ?? '');
}


return (
<div>
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-semibold">WYSIWYG Editor</h3>
<div className="flex items-center gap-2">
<select className="input">
<option>Modern</option>
<option>Classic</option>
<option>Minimal</option>
</select>
<input className="input" placeholder="Role title" />
</div>
</div>


<div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg min-h-[360px]">
<div className="editor-toolbar mb-2 flex gap-2">
<button className="btn-sm" onClick={() => document.execCommand('bold')}>Bold</button>
<button className="btn-sm" onClick={() => document.execCommand('italic')}>Italic</button>
<button className="btn-sm" onClick={() => document.execCommand('insertUnorderedList')}>• List</button>
</div>
<div
ref={ref}
contentEditable
suppressContentEditableWarning
onInput={onInput}
className="prose prose-invert max-w-full focus:outline-none p-4 bg-gradient-to-b from-white/3 to-transparent rounded-lg min-h-[240px]"
aria-label="Resume editor"
/>
</div>


<div className="mt-4 flex gap-2">
<button className="btn" onClick={() => onOpenDownload?.()}>Export</button>
<button className="btn-ghost" onClick={() => alert('Run ATS check')}>Re-check</button>
</div>
</div>
);
}


function defaultResumeHtml() {
return `
<section>
<h1>John Doe</h1>
<p><strong>Senior Software Engineer</strong></p>
<h2>Summary</h2>
<p>Product-minded engineer with 8+ years building scalable web apps.</p>
</section>
`;
}