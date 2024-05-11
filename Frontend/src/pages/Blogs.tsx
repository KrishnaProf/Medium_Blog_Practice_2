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
          <Blogcard
            Author="Krishna"
            title="New react feature"
            BlogContent="React new feature details"
            PublishedDate="feb 12th 2024"
            id={21}
          />

          <Blogcard
            Author="Vani"
            title="About React"
            BlogContent="React is a library for building user interfaces"
            PublishedDate="feb 18th 2024"
            id={22}
          />
        </div>
      </div>
    </div>
  );
};
