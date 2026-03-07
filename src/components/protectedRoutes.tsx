"use client";

import { useEffect, useState } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("meu_token");

      if (!token) {
        window.location.replace("/login");
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="animate-pulse text-slate-500 font-medium">
          Verificando acesso...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
