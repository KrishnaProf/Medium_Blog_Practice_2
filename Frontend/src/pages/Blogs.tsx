import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Blogcard } from "../components/Blogcard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog: any) => (
            <Blogcard
              id={blog.id}
              title={blog.title}
              BlogContent={blog.BlogContent}
              Author={blog.author}
              PublishedDate={blog.publishedDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
