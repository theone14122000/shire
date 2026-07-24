import { getPublishedBlogs } from "@/lib/blogs";
import BlogListingClient from "../components/BlogListingClient";

export default async function BlogListingPage() {
  const blogs = await getPublishedBlogs();
  return <BlogListingClient blogs={blogs} />;
}
