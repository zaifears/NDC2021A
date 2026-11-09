import { SITE_URL } from "@/lib/site";

/**
 * Site-wide JSON-LD. One @graph, every node linked by @id, so a crawler can read
 * "this website is published by this organisation and is about this college".
 */
export default function StructuredData() {
  const baseUrl = SITE_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Notre Dame College Batch 2021 Group A Student Directory",
        alternateName: "NDC 2021 Group A",
        description: "Public directory of Notre Dame College Batch 2021 Group A students.",
        inLanguage: "en",
        publisher: { "@id": `${baseUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/?search={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "NDC 2021 Group A Community",
        url: `${baseUrl}/`,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo-512.png`,
          width: 512,
          height: 512,
        },
        sameAs: ["https://github.com/zaifears/NDC2021A", "https://shahoriar.bd"],
      },
      {
        "@type": "CollegeOrUniversity",
        "@id": `${baseUrl}/#college`,
        name: "Notre Dame College, Dhaka",
        alternateName: "NDC",
        url: "https://ndc.edu.bd/",
        foundingDate: "1949",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Toyenbee Circular Road, Arambagh, Motijheel",
          addressLocality: "Dhaka",
          postalCode: "1000",
          addressCountry: "BD",
        },
        sameAs: ["https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka"],
      },
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/#directory`,
        url: `${baseUrl}/`,
        name: "Notre Dame College Batch 2021 Group A Directory",
        description: "Browse public student profiles of Notre Dame College Batch 2021 Group A.",
        inLanguage: "en",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#college` },
        publisher: { "@id": `${baseUrl}/#organization` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${baseUrl}/images/campus/father-timm-bhaban.jpg` },
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
