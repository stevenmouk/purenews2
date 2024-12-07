import Head from "next/head";

export default function Seohead({
  title,
  des,
  blogURL,
  imgURL,
  imgAlt,
  twitterTittle,
  twitterDes,
}) {
  return (
    <Head>
      <title>{title}</title>

      <link rel="canonical" href={blogURL} />

      <meta name="description" content={des} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={des} />

      <meta property="og:url" content={blogURL} />
      <meta property="og:site_name" content="ArchiveButtons" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta property="og:image:alt" content={imgAlt} />
      <meta property="og:image" content={imgURL} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTittle} />
      <meta name="twitter:description" content={twitterDes} />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="720" />
      <meta name="twitter:image:alt" content={imgAlt} />
      <meta name="twitter:image" content={imgURL} />
    </Head>
  );
}
