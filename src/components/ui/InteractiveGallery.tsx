'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { MediaAssetItem } from '@/types';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: MediaAssetItem[];
  title: string;
}

export default function InteractiveGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Primary Display */}
      <div className="relative h-[420px] sm:h-[500px] w-full rounded-sm overflow-hidden bg-navy-950 shadow-luxury group">
        <Image
          src={activeImage.url}
          alt={activeImage.altText || title}
          fill
          priority
          className="object-cover transition-all duration-700 ease-out"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Image Caption & Index */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs text-white z-10">
          <div className="max-w-md">
            <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-400 block mb-0.5">
              Architectural View {activeIndex + 1} of {images.length}
            </span>
            <span className="font-medium text-stone-200">
              {activeImage.caption || activeImage.altText}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="p-2 rounded bg-navy-950/80 hover:bg-gold-500 hover:text-navy-950 border border-white/20 backdrop-blur-md transition-colors"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded bg-navy-950/80 hover:bg-gold-500 hover:text-navy-950 border border-white/20 backdrop-blur-md transition-colors"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-24 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                activeIndex === idx
                  ? 'border-gold-500 ring-2 ring-gold-500/30 scale-[1.02]'
                  : 'border-stone-200 hover:border-gold-400/50 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 15vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

