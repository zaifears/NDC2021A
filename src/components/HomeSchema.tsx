export default function HomeSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",
        name: "Who can appear in this directory?",

        acceptedAnswer: {
          "@type": "Answer",
          text: "Students of Notre Dame College Batch 2021 Group A.",
        },
      },

      {
        "@type": "Question",
        name: "How can I update my profile?",

        acceptedAnswer: {
          "@type": "Answer",
          text: "Students can submit updated information through the official profile update form.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}