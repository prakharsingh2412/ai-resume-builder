import Modal from '../components/Modal';


export default function AuthModal({ onClose }: { onClose?: () => void }) {
return (
<Modal onClose={onClose}>
<h3 className="text-lg font-semibold mb-3">Sign in / Sign up</h3>
<p className="text-sm text-slate-300 mb-4">Secure login — Email + Password, Google, LinkedIn.</p>
<div className="grid gap-3">
<button className="btn-outline">Continue with Google</button>
<button className="btn-outline">Continue with LinkedIn</button>
<div className="flex items-center gap-2">
<input placeholder="Email" className="input flex-1" />
<input placeholder="Password" type="password" className="input flex-1" />
</div>
<div className="flex justify-between items-center">
<button className="btn-primary" onClick={onClose}>Sign in</button>
<button className="btn-ghost" onClick={() => alert('Password reset flow — trigger email from backend')}>Forgot password?</button>
</div>
</div>
</Modal>
);
}