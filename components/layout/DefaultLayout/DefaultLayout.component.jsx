"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar.componenet";
import Header from "@/components/header/Header.component";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb.component";

export default function DefaultLayout({ children, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Breadcrumb
                title={pageProps?.title}
                breadcrumbs={pageProps?.breadcrumbs}
              />
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
