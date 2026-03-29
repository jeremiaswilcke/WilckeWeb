import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Webdesign, Next.js & SEO",
  description:
    "Praxiswissen rund um Webdesign, Next.js, Headless WordPress, SEO und AEO. Verständlich erklärt von WilckeWeb aus Österreich.",
  alternates: {
    canonical: "https://wilckeweb.org/blog",
  },
  openGraph: {
    title: "Blog — WilckeWeb",
    description:
      "Praxiswissen zu Webdesign, Kosten, Technik und Suchmaschinenoptimierung.",
    url: "https://wilckeweb.org/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-[140px] max-md:pt-[100px] pb-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
                Blog
              </span>
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
                Wissen rund um Webdesign
              </h1>
              <p className="text-muted text-[1.05rem] leading-relaxed mt-4 max-w-[600px] mx-auto">
                Praxisnahe Artikel zu Kosten, Technik und Strategie —
                verständlich geschrieben, ohne Fachjargon.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-8 rounded-2xl bg-white border border-line hover:shadow-[0_8px_32px_rgba(63,63,63,0.08)] hover:border-transparent hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 text-[0.82rem] text-muted mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("de-AT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="text-line-strong">·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-[1.25rem] font-bold text-text group-hover:text-teal transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-muted text-[0.95rem] leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.75rem] font-medium px-2.5 py-1 rounded-full bg-bg-soft text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
