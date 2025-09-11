import React from 'react';

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
return (
<div className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute inset-0 bg-black/50" onClick={onClose} />
<div className="relative w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent glassmorphism shadow-xl">{children}</div>
</div>
);
}