"use client";

import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#E5EEFF]">

      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <main className="flex-1 ml-64">

        <AdminHeader title="Tableau de bord" />

        <div className="p-8">

          {/* Les statistiques viendront ici */}

          {/* Les activités Portfolio */}

          {/* Les témoignages */}

          {/* Les actions rapides */}

        </div>

      </main>

    </div>
  );
}