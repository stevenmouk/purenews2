import Image from "next/image";
import Link from "next/link";

export default function Bottom({ articles }) {
  return (
    <section
      data-testid="homepage-latest"
      data-event-module="latest"
      className="snipcss-Y1qyP"
    >
      <div className="SectionHeading_root__JTxgB SectionHeading_grid__q2NPO">
        <h3 className="SectionHeading_heading__WZS7g">More News</h3>
        {/* <a
          className="SectionHeading_secondaryLink___28AW"
          href="https://www.theatlantic.com/latest/"
          data-action="click link - latest - see all"
        >
          see all
        </a> */}
      </div>
      <div className="Latest_ol__DrsDK">
        {articles?.map((article) => {
          // console.log(article);
          return (
            <Link
              href={`/articles/${article?.slug}`}
              className="cursor-pointer"
              key={article?._id}
            >
              <div
                className="Latest_li__5pluN"
                key={article?.frontmatter?.header_title}
              >
                <article className="Latest_article__j7aws">
                  <div className="relative w-[150px]  sm:w-[200px] h-[100px] sm:h-[130px] mr-3">
                    {article?.frontmatter?.page_image_src_rel ? (
                      <Image
                        src={article?.frontmatter?.page_image_src_rel}
                        fill
                        className="object-cover"
                        alt="Main content Image"
                        priority
                        sizes="100vw"
                      />
                    ) : null}
                  </div>

                  <div className="Latest_articleInfo__8fUE8 w-[250px] sm:w-[350px] md:w-[450px] ">
                    <h3
                      className="Latest_title__HB7uF"
                      data-event-element="title"
                    >
                      {article?.frontmatter?.header_title}
                    </h3>

                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_datePublished__R8QSw">
                        {article?.frontmatter?.page_date}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
