import React from "react";
import TrandingItem from "./TrendingItem"
import QuickAccess from "./QuickAccess";

function Dashboard() {
  return (
    <div className="inset-0 p-4">
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="rounded-lg bg-gray-200 h-80">Card 1</div>
        <div className="rounded-lg bg-gray-200 h-80">Card 2</div>
      </div>
      <div className="mt-8 mb-4">Quick access</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <QuickAccess />
        <QuickAccess />
        <QuickAccess />
        <QuickAccess />
      </div>
      <div className="grid sm:grid-cols-2">
        <div>
            Recently viewed
        </div>
        <div>Your day plan</div>
      </div>
      <div>Trending items
        <div className="flex flex-wrap gap-x-2 gap-y-1">
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Coqueluche</TrandingItem>
        <TrandingItem>Méningites infectieuse</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        </div>
      </div>
      <div>Library
        <div className="flex flex-wrap gap-x-2 gap-y-1">
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Coqueluche</TrandingItem>
        <TrandingItem>Méningites infectieuse</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        <TrandingItem>Tuberculose</TrandingItem>
        </div></div>
    </div>
  );
}

export default Dashboard;
