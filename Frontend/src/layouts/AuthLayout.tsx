import type { ReactNode } from "react";


interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
