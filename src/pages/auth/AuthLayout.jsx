import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <main className="flex-1 flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}
