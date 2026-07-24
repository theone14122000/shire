import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import type { BlogSection } from "@/lib/blog-types";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Static params for ISR                                              */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | The Himalayan Shire Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Render a single content section                                    */
/* ------------------------------------------------------------------ */
function SectionBlock({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "paragraph":
      return (
        <p className="text-base leading-8 text-neutral-800 sm:text-lg">
          {section.text?.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      );

    case "heading":
      if (section.level === 3) {
        return (
          <h3 className="mt-10 font-display text-xl font-black text-black sm:text-2xl">
            {section.text}
          </h3>
        );
      }
      return (
        <h2 className="mt-14 font-display text-2xl font-black tracking-tight text-black sm:text-3xl">
          {section.text}
        </h2>
      );

    case "image":
      return (
        <figure className="mt-8 overflow-hidden rounded-2xl border border-emerald-200/70">
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
            <figcaption className="bg-emerald-50/60 px-6 py-3 text-center text-xs font-medium text-emerald-800/70">
              {section.alt}
            </figcaption>
          )}
        </figure>
      );

    case "youtube":
      return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-100/50 shadow-lg">
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

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post || post.status !== "published") notFound();

  return (
    <main className="min-h-screen bg-[#f4faf5] font-sans text-black">
      <SiteNav />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-black"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path
              d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Meta */}
        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            {post.tag}
          </span>
          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="font-bold text-emerald-800">{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-200/70 shadow-md">
          <div className="relative aspect-[16/9]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>

        {/* Content sections */}
        <div className="prose-custom mt-10 space-y-5">
          {post.content.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 border-t border-emerald-200 pt-10 text-center">
          <p className="mb-6 text-sm font-medium text-neutral-600">
            Enjoyed this story? Plan your stay at Fagu.
          </p>
          <Link
            href="/#book"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl"
          >
            Book Your Stay
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" />
            </svg>
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
