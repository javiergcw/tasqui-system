'use client';
import React from 'react';
import { PostedByCard } from './PostedByCard';
import { LocationCard } from './LocationCard';
import { KeywordsCard } from './KeywordsCard';
import { ShareInCard } from './ShareInCard';

export const JobDetailSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-1">
      <PostedByCard />
      <LocationCard />
      <KeywordsCard />
      <ShareInCard />
    </div>
  );
};
