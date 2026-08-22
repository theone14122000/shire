import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import type { BlogSection } from "@/lib/blog-types";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  const seoTitle = post.seoTitle || `${post.title} | The Himalayan Shire Blog`;
  const seoDescription = post.seoDescription || post.excerpt;
  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [post.image],
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [post.image],
    },
  };
}

function transformMonthText(text: string): string {
  if (!text) return text;
  // Wrap specific labels: The Best Part:, Crowd & Traffic:, Overall Weather:
  return text
    .replace(/The Best Part:/gi, '<b><i>The Best Part:</i></b>')
    .replace(/Crowd & Traffic:/gi, '<b><i>Crowd & Traffic:</i></b>')
    .replace(/Overall Weather:/gi, '<b><i>Overall Weather:</i></b>');
}

function SectionBlock({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "paragraph":
      return (
        <p className="text-base leading-[1.9] text-emerald-950/80 sm:text-lg" dangerouslySetInnerHTML={{ __html: transformMonthText(section.text as string) }} />
      );

    case "heading":
      if (section.level === 3) {
        return (
          <h3 className="mt-10 font-display text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
            {section.text}
          </h3>
        );
      }
      return (
        <h2 className="mt-14 font-display text-2xl font-black tracking-tight text-emerald-950 sm:text-3xl">
          {section.text}
        </h2>
      );

    case "image":
      return (
        <figure className="mt-8 overflow-hidden rounded-2xl border border-emerald-200/50 shadow-sm">
          <div className="relative aspect-video">
            <Image
              src={section.src || ""}
              alt={section.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {section.alt && (
            <figcaption className="bg-cream-50 px-6 py-3.5 text-center text-xs font-medium text-emerald-700/60">
              {section.alt}
            </figcaption>
          )}
        </figure>
      );

    case "youtube":
      return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm">
          <div className="relative aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${section.videoId}`}
              title={section.text || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post || post.status !== "published") notFound();

  return (
    <main className="min-h-screen font-sans selection:bg-gold-200/30">
      <SiteNav />

      <section className="relative">
        <div className="relative h-[50vh] min-h-[360px] overflow-hidden sm:h-[56vh] lg:h-[62vh]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-emerald-900/30 to-emerald-900/10" />
        </div>
      </section>

      <article className="relative z-10 -mt-20 mx-auto max-w-4xl px-6 pb-20 sm:-mt-28 sm:px-8 lg:px-12 lg:pb-28">
        <div className="rounded-[2rem] border border-emerald-200/50 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-950/70 transition-colors hover:text-emerald-950"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              {post.tag}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-emerald-950/60">
            <span className="font-bold text-emerald-950/80">{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="mt-10 space-y-5 border-t border-emerald-100 pt-8">
            {post.content.map((section) => (
              <SectionBlock key={section.id} section={section} />
            ))}
          </div>

          <div className="mt-14 border-t border-emerald-100 pt-10 text-center">
<p className="text-sm font-medium text-emerald-950/70">
              Enjoyed this story? <a href="https://letsbook.me/booking/thehimalayanshire" className="font-medium text-gold-600 underline">plan your stay at Fagu</a>.
            </p>
            <Link
              href="https://letsbook.me/booking/thehimalayanshire"
              className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-emerald-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl"
              >
              Book Your Stay
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
