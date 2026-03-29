import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { getPost, getAllPosts } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://wilckeweb.org/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} — WilckeWeb`,
      description: post.description,
      url: `https://wilckeweb.org/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Jeremias Wilcke"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  function flushTable() {
    if (tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
          <table className="w-full text-[0.9rem] border-collapse">
            <thead>
              <tr>
                {tableHeaders.map((h, i) => (
                  <th
                    key={i}
                    className="text-left font-bold text-text px-4 py-3 border-b-2 border-line-strong bg-bg-soft"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri} className="border-b border-line">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-muted">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
        continue;
      }

      // Skip separator row
      if (cells.every((c) => /^[-:]+$/.test(c))) continue;

      tableRows.push(cells);
      continue;
    }

    if (inTable) flushTable();

    if (!line.trim()) continue;

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-[1.4rem] font-bold text-text mt-10 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-[1.1rem] font-bold text-text mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      // Collect list items
      const items: string[] = [line.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].startsWith("- ")) {
        i++;
        items.push(lines[i].slice(2));
      }
      elements.push(
        <ul key={i} className="list-disc pl-6 space-y-1.5 my-4 text-muted text-[0.95rem] leading-relaxed">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
          ))}
        </ul>
      );
    } else {
      elements.push(
        <p
          key={i}
          className="text-muted text-[0.95rem] leading-[1.8] mb-4"
          dangerouslySetInnerHTML={{ __html: inlineMd(line) }}
        />
      );
    }
  }

  if (inTable) flushTable();

  return elements;
}

function inlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-bg-soft px-1.5 py-0.5 rounded text-[0.88em] font-mono">$1</code>');
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      "@id": "https://wilckeweb.org/#person",
      name: "Jeremias Wilcke",
    },
    publisher: {
      "@id": "https://wilckeweb.org/#business",
    },
    mainEntityOfPage: `https://wilckeweb.org/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    inLanguage: "de-AT",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="pt-[140px] max-md:pt-[100px] pb-20">
        <article className="max-w-[720px] mx-auto px-6">
          <FadeIn>
            <div className="mb-10">
              <Link
                href="/blog"
                className="text-[0.85rem] text-teal font-medium hover:underline mb-4 inline-block"
              >
                &larr; Alle Artikel
              </Link>
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
              <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
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
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="border-t border-line pt-8">
              {renderMarkdown(post.content)}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={2}>
            <div className="mt-16 p-8 rounded-2xl bg-bg-soft border border-line text-center">
              <h3 className="font-bold text-[1.1rem] mb-2">
                Website-Projekt besprechen?
              </h3>
              <p className="text-muted text-[0.92rem] mb-5">
                Persönliche Beratung, transparente Preise, moderne Technik.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 font-semibold text-[0.92rem] px-7 py-3 rounded-full
                  bg-teal text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(86,160,168,0.3)]
                  transition-all duration-300"
              >
                Jetzt Kontakt aufnehmen
              </a>
            </div>
          </FadeIn>

          {/* Prev/Next navigation */}
          {(prevPost || nextPost) && (
            <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-line">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group p-4 rounded-xl bg-white border border-line hover:border-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all"
                >
                  <span className="text-[0.78rem] text-muted">Voriger Artikel</span>
                  <p className="text-[0.88rem] font-semibold text-text group-hover:text-teal transition-colors mt-1 line-clamp-2">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group p-4 rounded-xl bg-white border border-line hover:border-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all text-right"
                >
                  <span className="text-[0.78rem] text-muted">Nächster Artikel</span>
                  <p className="text-[0.88rem] font-semibold text-text group-hover:text-teal transition-colors mt-1 line-clamp-2">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
