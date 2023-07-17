import React from "react";
import TrandingItem from "./TrendingItem";
import QuickAccess from "./QuickAccess";
import RecentItem from "./RecentItem";

function Dashboard() {
  return (
    <div className="inset-0 p-4">
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="rounded-lg bg-gray-200 h-80">Card 1</div>
        <div className="rounded-lg bg-gray-200 h-80">Card 2</div>
      </div>
      <div className="mt-8 mb-2 font-bold text-xl text-gray-600">
        Quick access
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <QuickAccess />
        <QuickAccess />
        <QuickAccess />
        <QuickAccess />
      </div>
      <div className="grid sm:grid-cols-2">
        <div>
          <div className="mt-8 mb-2 font-bold text-xl text-gray-600">
            Recently viewed
          </div>
          <div className="flex flex-col gap-1">
            <RecentItem>188. Endocardite infectieuse</RecentItem>
            <RecentItem>336. Méningites virales</RecentItem>
            <RecentItem>188. Endocardite infectieuse</RecentItem>
            <RecentItem>336. Méningites virales</RecentItem>
            <RecentItem>188. Endocardite infectieuse</RecentItem>
            <RecentItem>336. Méningites virales</RecentItem>
            <RecentItem>188. Endocardite infectieuse</RecentItem>
            <RecentItem>336. Méningites virales</RecentItem>
          </div>
        </div>
        <div>
          <div className="mt-8 mb-2 font-bold text-xl text-gray-600">
            Your day plan
          </div>
        </div>
      </div>
      <div>
        <div className="mt-8 mb-2 font-bold text-xl text-gray-600">
          Trending items
        </div>
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
      <div>
        <div className="mt-8 mb-2 font-bold text-xl text-gray-600">Library</div>
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <RecentItem>188. Endocardite infectieuse</RecentItem>
          <RecentItem>336. Méningites virales</RecentItem>
          <RecentItem>336. Méningites virales</RecentItem>
          <RecentItem>188. Endocardite infectieuse</RecentItem>
          <RecentItem>336. Méningites virales</RecentItem>
          <RecentItem>188. Endocardite infectieuse</RecentItem>
          <RecentItem>336. Méningites virales</RecentItem>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
