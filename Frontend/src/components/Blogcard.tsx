import { Link } from "react-router-dom";

interface BlogcardInterface {
  Author: string;
  title: string;
  BlogContent: string;
  PublishedDate: string;
  id: number;
}

export const Blogcard = ({
  Author,
  title,
  BlogContent,
  PublishedDate,
  id,
}: BlogcardInterface) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={Author} size="big" />

          <div className="pt-2">{Author}</div>
          <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
            <Circle />
          </div>
          <div className="pl-2 font-thin  text-slate-500 text-sm flex justify-center flex-col">
            {PublishedDate}
          </div>
        </div>
        <div className="font-bold text-xl pt-2">{title}</div>
        <div className="text-md font-thin">
          {BlogContent.slice(0, 100) + "..."}
        </div>
      </div>
      <div className="text-slate-500 text-sm font-thin pt-4">
        {`${Math.ceil(BlogContent.length / 100)} minute(s) read`}
      </div>
    </Link>
  );
};

export function Circle() {
  return (
    <div
      className="w-2 h-2 bg-slate-300 rounded-full"
      style={{ backgroundColor: "green" }}
    ></div>
  );
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`"relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600"`}
    >
      <span className="text-xs font-extralight text-gray-600 dark:text-gray-500">
        {name[0]}
      </span>
    </div>
  );
}
