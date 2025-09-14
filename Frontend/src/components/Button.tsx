import React from 'react';


type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'outline' };


export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
    const base = 'px-3 py-2 rounded-lg font-semibold';
    const styles = variant === 'primary' ? 'btn' : variant === 'ghost' ? 'btn-ghost' : 'btn-outline';
    return (
        <button className={`${base} ${styles} ${className}`} {...rest}>
            {children}
        </button>
    );
}