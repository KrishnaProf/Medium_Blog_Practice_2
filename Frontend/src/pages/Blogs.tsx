import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";

export const Blogs = () => {
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
