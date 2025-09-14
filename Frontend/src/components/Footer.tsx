import React, { JSX } from 'react';


export default function Footer(): JSX.Element {
    return (
        <footer className="p-6 text-center text-slate-400">
            © {new Date().getFullYear()} Aurora Résumé — Premium AI Resume Builder
        </footer>
    );
}