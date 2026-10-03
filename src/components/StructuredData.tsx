export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ndc2021a.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Notre Dame College Batch 2021 Group A Student Directory",
        description:
          "Official public directory of Notre Dame College Batch 2021 Group A students.",
        inLanguage: "en",

        publisher: {
          "@id": `${baseUrl}/#organization`,
        },

        potentialAction: {
          "@type": "SearchAction",
          target:
            `${baseUrl}/?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },

      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "NDC 2021 Group A Community",
        url: baseUrl,

        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/badge.png`,
        },

        sameAs: [
          "https://github.com/zaifears/NDC2021A",
          "https://shahoriar.bd",
        ],
      },

      {
        "@type": "CollegeOrUniversity",
        "@id": `${baseUrl}/#college`,
        name: "Notre Dame College, Dhaka",
      },

      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/#directory`,

        url: baseUrl,

        name: "Notre Dame College Batch 2021 Group A Directory",

        description:
          "Browse public student profiles of Notre Dame College Batch 2021 Group A.",

        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },

        about: {
          "@id": `${baseUrl}/#college`,
        },

        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}