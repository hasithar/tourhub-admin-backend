import Link from "next/link";

const Breadcrumb = ({ title = "", breadcrumbs }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {title}
      </h2>

      <nav>
        {breadcrumbs?.length > 0 && (
          <ol className="flex items-center gap-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index}>
                <Link
                  href={breadcrumb.link}
                  className={`font-medium ${index !== breadcrumbs?.length - 1 ? "text-black dark:text-white" : "text-primary"}`}
                >
                  {index !== 0 && "/ "}
                  {breadcrumb?.name?.slice(0, 20) +
                    (breadcrumb?.name?.length > 20 ? "..." : "")}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </nav>
    </div>
  );
};

export default Breadcrumb;
