"use client";

import { Suspense, lazy } from "react";
import { ArrowRight, BookOpen, Check, ExternalLink, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

// Tools Grid 卡片 → 模块 section 锚点（与下方 8 个 <section id> 一一对应）
const TOOL_SECTION_IDS = [
  "vf-release",
  "vf-trailers",
  "vf-story",
  "vf-characters",
  "vf-combat",
  "vf-beginner",
  "vf-battle",
  "vf-links",
];

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://virtuafightercrossroads.wiki";
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Virtua Fighter Crossroads Wiki",
        description:
          "Guide to Virtua Fighter Crossroads release info, trailers, characters, story, Vilasapara, combat, modes, and official updates for new and returning players.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          caption: "Virtua Fighter Crossroads - Narrative 3D Fighting Adventure",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Virtua Fighter Crossroads Wiki",
        alternateName: "Virtua Fighter Crossroads",
        url: siteUrl,
        description:
          "Virtua Fighter Crossroads Wiki resource hub for release info, trailers, characters, story, Vilasapara city lore, combat, and game modes.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          caption: "Virtua Fighter Crossroads Wiki - Narrative 3D Fighting Adventure",
        },
        sameAs: [
          "https://crossroads.virtua-fighter.com/en",
          "https://x.com/VFCROSSROADS",
          "https://www.instagram.com/vfcrossroads",
          "https://www.youtube.com/@virtuafighter_official_jp",
          "https://discord.gg/virtuafighter-official",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Virtua Fighter Crossroads",
        gamePlatform: ["TBA"],
        applicationCategory: "Game",
        genre: ["Fighting", "Adventure", "Narrative"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
      },
      {
        "@type": "VideoObject",
        name: "VIRTUA FIGHTER CROSSROADS SHOWCASE",
        description:
          "Official Virtua Fighter Crossroads Showcase from SEGA and RGG Studio, featuring the 2027 narrative 3D fighting adventure.",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/dwjNGD6hpfc",
        url: "https://www.youtube.com/watch?v=dwjNGD6hpfc",
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("trailer")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://crossroads.virtua-fighter.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 之后（前半屏：Hero → 视频 → 模块导航） */}
      <section id="trailer" className="scroll-mt-24 px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="dwjNGD6hpfc"
              title="VIRTUA FIGHTER CROSSROADS SHOWCASE"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 模块导航区（位于视频之后、Latest Updates 之前） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = TOOL_SECTION_IDS[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* Module 1: Release Date and Platforms (info-cards) */}
      <section id="vf-release" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsRelease.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsRelease.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.vfCrossroadsRelease.facts.map((fact: any, index: number) => {
              const confirmed = fact.status === "Confirmed";
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <DynamicIcon
                        name={fact.icon}
                        className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                      />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        confirmed
                          ? "bg-[hsl(var(--nav-theme)/0.15)] border-[hsl(var(--nav-theme)/0.4)] text-[hsl(var(--nav-theme-light))]"
                          : "bg-white/5 border-border text-muted-foreground"
                      }`}
                    >
                      {fact.status}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    {fact.label}
                  </p>
                  <p className="text-lg md:text-xl font-bold mb-2">{fact.value}</p>
                  <p className="text-sm text-muted-foreground">{fact.details}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Trailers and Showcase (video-gallery) */}
      <section id="vf-trailers" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsTrailers.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsTrailers.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.vfCrossroadsTrailers.videos.map((video: any, index: number) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    <DynamicIcon
                      name={video.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                    {video.type}
                  </span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-[hsl(var(--nav-theme-light))] transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{video.focus}</p>
                <ul className="space-y-1.5">
                  {video.confirms.map((c: string, ci: number) => (
                    <li key={ci} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                  Watch on YouTube <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Story Mode and Vilasapara (story-map) */}
      <section id="vf-story" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsStory.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsStory.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-4">
            {t.modules.vfCrossroadsStory.chapters.map((chapter: any, index: number) => (
              <div
                key={index}
                className="flex gap-4 p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                  <DynamicIcon
                    name={chapter.icon}
                    className="h-6 w-6 text-[hsl(var(--nav-theme-light))]"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                      {chapter.section}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{chapter.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{chapter.summary}</p>
                  <ul className="space-y-1.5">
                    {chapter.details.map((d: string, di: number) => (
                      <li key={di} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Characters and Roster (character-cards) */}
      <section id="vf-characters" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsCharacters.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsCharacters.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.vfCrossroadsCharacters.fighters.map((fighter: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.3)]">
                    <DynamicIcon
                      name={fighter.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg leading-tight">
                      {fighter.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {fighter.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                    {fighter.status}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
                    {fighter.style}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{fighter.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 5: Combat Mechanics (mechanics-table) */}
      <section id="vf-combat" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsCombat.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsCombat.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.vfCrossroadsCombat.mechanics.map((m: any, index: number) => (
              <div
                key={index}
                className="flex flex-col p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <DynamicIcon
                      name={m.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                    {m.category}
                  </span>
                </div>
                <h3 className="font-bold mb-3 text-[hsl(var(--nav-theme-light))]">
                  {m.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  How it works
                </p>
                <p className="text-sm text-muted-foreground mb-3">{m.howItWorks}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Player impact
                </p>
                <p className="text-sm text-muted-foreground mb-3">{m.playerImpact}</p>
                <ul className="mt-auto space-y-1.5 border-t border-border pt-3">
                  {m.trackedDetails.map((detail: string, di: number) => (
                    <li key={di} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 6: Beginner Guide (step-by-step) */}
      <section id="vf-beginner" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsBeginner.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsBeginner.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.vfCrossroadsBeginner.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-5 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <DynamicIcon
                    name={step.icon}
                    className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                    {step.focus}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold mb-2 mt-1">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-3">
                    {step.whatToLearn}
                  </p>
                  <ul className="space-y-1.5 mb-3">
                    {step.practiceActions.map((action: string, ai: number) => (
                      <li key={ai} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{action}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm rounded-lg bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.25)] px-3 py-2">
                    <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                      Crossroads:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      {step.crossroadsCarryover}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.vfCrossroadsBeginner.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 7: Battle Mode and Online Play (mode-comparison) */}
      <section id="vf-battle" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsBattleMode.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsBattleMode.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.vfCrossroadsBattleMode.modes.map((mode: any, index: number) => (
              <div
                key={index}
                className="flex flex-col p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <DynamicIcon
                      name={mode.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                    {mode.format}
                  </span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2">{mode.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {mode.playerExperience}
                </p>
                <ul className="space-y-1.5 mb-3 mt-auto">
                  {mode.confirmedFeatures.map((feature: string, fi: number) => (
                    <li key={fi} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs rounded-lg bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.25)] px-3 py-2">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                    Best for:{" "}
                  </span>
                  <span className="text-muted-foreground">{mode.bestFor}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Official Links and Updates (link-hub) */}
      <section id="vf-links" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.vfCrossroadsOfficialLinks.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.vfCrossroadsOfficialLinks.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.vfCrossroadsOfficialLinks.links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    <DynamicIcon
                      name={link.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                    {link.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-[hsl(var(--nav-theme-light))] transition-colors" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-[hsl(var(--nav-theme-light))] transition-colors">
                  {link.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{link.description}</p>
                <p className="text-xs mt-auto">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                    Best for:{" "}
                  </span>
                  <span className="text-muted-foreground">{link.bestFor}</span>
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner before footer */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.gg/virtuafighter-official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/VFCROSSROADS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@virtuafighter_official_jp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/vfcrossroads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
