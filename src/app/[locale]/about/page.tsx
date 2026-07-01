import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://virtuafightercrossroads.wiki'
  const path = '/about'

  return {
    title: 'About Virtua Fighter Crossroads Wiki - 2027 Fighting Adventure Resource',
    description: 'Learn about Virtua Fighter Crossroads Wiki, a community-driven resource hub providing release info, story guides, character details, combat breakdowns, and trailer coverage for the 2027 SEGA fighting adventure.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Virtua Fighter Crossroads Wiki',
      title: 'About Virtua Fighter Crossroads Wiki',
      description: 'Learn about our mission to provide the best Virtua Fighter Crossroads game resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          alt: 'Virtua Fighter Crossroads Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Virtua Fighter Crossroads Wiki',
      description: 'Learn about our mission to provide the best Virtua Fighter Crossroads resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Virtua Fighter Crossroads Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Virtua Fighter Crossroads
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Virtua Fighter Crossroads Wiki</h2>
            <p>
              Virtua Fighter Crossroads Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              follow the 2027 SEGA / RGG Studio fighting adventure &ldquo;Virtua Fighter Crossroads&rdquo;. We are a community-driven platform that provides release tracking, story and character guides,
              combat breakdowns, trailer coverage, and Vilasapara city lore to keep you ready for launch.
            </p>
            <p>
              Whether you&apos;re a longtime Virtua Fighter fan returning to the series or a newcomer drawn in by the new narrative direction,
              Virtua Fighter Crossroads Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower Virtua Fighter Crossroads players with accurate, up-to-date information
              and useful resources</strong> that help them understand the game before and after release. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Track official reveals, trailers, and announcements and keep our content updated as SEGA shares more</li>
              <li><strong>Explain the game:</strong> Break down the branching story, four protagonists, combat system, and Vilasapara setting in clear guides</li>
              <li><strong>Foster community:</strong> Create a welcoming space where fans can discuss, theorize, and share their excitement</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Virtua Fighter Crossroads Wiki as the <strong>go-to destination</strong> for every player seeking
              to understand the 2027 revival. We want to be the resource that players trust and rely on, whether they need
              release and platform updates, want to explore the story and characters, or are looking for deep combat analysis.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release &amp; Platforms</h3>
              <p className="text-slate-300">
                Clear tracking of the 2027 release window, official platform announcements, and pre-order availability
                as SEGA confirms them. No rumors stated as fact.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Story &amp; Characters</h3>
              <p className="text-slate-300">
                Guides on the four protagonists, branching narrative, and key events like the Bakunawa Killer storyline
                unfolding across the city of Vilasapara.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">⚔️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Combat System</h3>
              <p className="text-slate-300">
                Breakdowns of the traditional 3D head-to-head combat, multi-enemy battles, boss fights, and the
                strategy depth the Virtua Fighter series is known for.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Trailers &amp; Showcase</h3>
              <p className="text-slate-300">
                Organized coverage of official trailers &mdash; Reveal, Showcase, Cielo Story, and Bakunawa Killer &mdash;
                with the key details players actually care about.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌆</div>
              <h3 className="text-xl font-semibold text-white mb-2">Vilasapara Lore</h3>
              <p className="text-slate-300">
                World-building content on the fictional Southeast Asian city of Vilasapara, its districts, and the
                Vila Fight Fest event at the heart of the story.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages including English, Japanese, Spanish, and more,
                reflecting the game&apos;s global official pages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Virtua Fighter Crossroads Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from fans of all kinds. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> Lore details, theories, and observations shared by fans</li>
              <li><strong>Official updates:</strong> We track SEGA and RGG Studio announcements and adjust our content accordingly</li>
              <li><strong>Reveal cycles:</strong> As new trailers and character reveals drop, we update guides to match</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you&apos;ve spotted a lore detail, have a theory on the story,
              or have suggestions for new guides, we&apos;d love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Virtua Fighter Crossroads Wiki is maintained by a dedicated team of passionate fighting-game fans and developers
              who love the Virtua Fighter series as much as you do. We&apos;re players first, constantly following official news,
              dissecting trailers, and staying updated with the latest reveals.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Game analysis:</strong> Deep understanding of fighting game mechanics and the Virtua Fighter legacy</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and lore breakdowns</li>
              <li><strong>Community management:</strong> Listening to fan feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: &ldquo;Crossroads&rdquo; &ndash; Charting every path through Vilasapara.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Virtua Fighter Crossroads Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with SEGA, RGG Studio, or the developers of Virtua Fighter Crossroads.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Virtua Fighter Crossroads Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you! Whether you have questions, suggestions, found an error, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@virtuafightercrossroads.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@virtuafightercrossroads.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@virtuafightercrossroads.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@virtuafightercrossroads.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@virtuafightercrossroads.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@virtuafightercrossroads.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@virtuafightercrossroads.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@virtuafightercrossroads.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest release news, story breakdowns, and Virtua Fighter Crossroads reveals.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
