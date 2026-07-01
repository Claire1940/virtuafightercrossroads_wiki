"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

/**
 * 视频特性区
 * - 进入视口时自动播放（静音 + 循环，作为背景氛围）
 * - 保留点击播放按钮作为后备（有声音、单次播放）
 * - 尊重 prefers-reduced-motion：直接展示播放封面，不自动播放
 */
export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [userStarted, setUserStarted] = useState(false);

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  // 视口内自动播放：静音 + 循环（loop 必须配合 playlist=videoId 才生效）
  const autoplayEmbed = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`;
  // 点击播放：有声音、单次播放
  const clickEmbed = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // 尊重减少动效偏好：不自动播放，等用户点击
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showIframe = visible || userStarted;
  const embedUrl = userStarted ? clickEmbed : autoplayEmbed;

  return (
    <div className="space-y-4" ref={containerRef}>
      <div
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        {showIframe ? (
          <iframe
            key={userStarted ? "click" : "auto"}
            className="absolute top-0 left-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setUserStarted(true)}
            aria-label={`Play ${title}`}
            className="group absolute top-0 left-0 h-full w-full"
          >
            {/* 封面缩略图 */}
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            {/* 播放按钮后备 */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-white shadow-lg transition-transform group-hover:scale-110">
                <Play className="ml-1 h-7 w-7" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
