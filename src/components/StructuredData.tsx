export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ndc2021a.vercel.app/#website",
        url: "https://ndc2021a.vercel.app",
        name: "Notre Dame College Batch 2021 Group A Student Directory",
        description:
          "Official public directory of Notre Dame College Batch 2021 Group A students.",
        inLanguage: "en",

        publisher: {
          "@id": "https://ndc2021a.vercel.app/#organization",
        },

        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://ndc2021a.vercel.app/?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },

      {
        "@type": "Organization",
        "@id": "https://ndc2021a.vercel.app/#organization",
        name: "NDC 2021 Group A Community",
        url: "https://ndc2021a.vercel.app",

        logo: {
          "@type": "ImageObject",
          url: "https://ndc2021a.vercel.app/badge.png",
        },

        sameAs: [
          "https://github.com/zaifears/NDC2021A",
          "https://shahoriar.bd",
        ],
      },

      {
        "@type": "CollegeOrUniversity",
        "@id": "https://ndc2021a.vercel.app/#college",
        name: "Notre Dame College, Dhaka",
      },

      {
        "@type": "CollectionPage",
        "@id": "https://ndc2021a.vercel.app/#directory",

        url: "https://ndc2021a.vercel.app",

        name: "Notre Dame College Batch 2021 Group A Directory",

        description:
          "Browse public student profiles of Notre Dame College Batch 2021 Group A.",

        isPartOf: {
          "@id": "https://ndc2021a.vercel.app/#website",
        },

        about: {
          "@id": "https://ndc2021a.vercel.app/#college",
        },

        publisher: {
          "@id": "https://ndc2021a.vercel.app/#organization",
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