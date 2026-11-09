import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import HeroSlides from "@/components/HeroSlides";
import ProfileDirectory from "@/components/ProfileDirectory";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getProfiles } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";
import { isProfileFilled } from "@/lib/profile";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

// The batch photograph is the primary slide; the building follows after 5 seconds.
const heroSlides = [
  {
    src: "/images/batch-21-hero.webp",
    alt: "Students of the batch standing in the shape of an A on the college lawn, with NDC-21 spelled out in bags below them, seen from above",
    caption: "The batch on the college lawn, with NDC-21 spelled in bags.",
    width: 1080,
    height: 1444,
    position: "50% 52%",
  },
  {
    src: "/images/campus/father-timm-bhaban.jpg",
    alt: "The brick and white Father Timm Bhaban at Notre Dame College, Dhaka, seen across the lawn",
    caption: "Father Timm Bhaban, where Group A met in Room 153.",
    width: 1440,
    height: 1080,
    position: "50% 60%",
  },
];

const faq = [
  {
    q: "Who can appear in this directory?",
    a: "Students of Notre Dame College Batch 2021 Group A.",
  },
  {
    q: "Where does the information come from?",
    a: "Profile information is submitted voluntarily by students using the official update form.",
  },
  {
    q: "How can I update my profile?",
    a: "You can submit updated information using the official profile update form.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function Home() {
  const profiles = await getProfiles();

  // Only profiles that are indexable are listed as items
  const listed = profiles.filter(isProfileFilled);
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Notre Dame College Batch 2021 Group A student profiles",
    numberOfItems: listed.length,
    itemListElement: listed.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/students/${p.id}/${createSlug(p.name)}`,
      name: p.name,
    })),
  };

  return (
    <>
      <SiteHeader current="home" />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, listSchema]) }} />

        {/* Hero: the name of the batch, one line, and the search */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__text">
              <h1 id="hero-title">Notre Dame College, Batch 2021 Group A</h1>
              <p className="lead">
                {profiles.length} classmates, with the photos, contacts and links they chose to share.
              </p>
              <HeroSearch />
            </div>
            <HeroSlides slides={heroSlides} />
          </div>
        </section>

        {/* The register */}
        <section id="directory" className="section band" aria-labelledby="directory-title">
          <div className="container">
            <ProfileDirectory profiles={profiles} />
          </div>
        </section>

        {/* The college, set as a statement on the ink band */}
        <section className="section band band--ink" aria-labelledby="heritage-title">
          <div className="container statement-wrap">
            <h2 id="heritage-title" className="statement">
              Our classes met on the ground floor of the Father Tim Building, Room 153.
            </h2>
            <div className="statement-wrap__row">
              <p>The college history, the 8 digit roll number explained and the campus map are on one page.</p>
              <Link className="btn btn--sheet" href="/about-ndc">
                Read the college guide
              </Link>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section" aria-labelledby="about-title">
          <div className="container split">
            <h2 id="about-title">About this directory</h2>
            <div className="prose">
              <p>
                The public directory for students of <strong>Notre Dame College (NDC), Dhaka</strong>, Batch{" "}
                <strong>2021</strong>, Group <strong>A</strong>. A community project that helps classmates reconnect and
                keeps a digital archive of the batch.
              </p>
              <p>
                Every student has a profile page with the name, photograph, bio, email, phone and social links they
                chose to share. Everyone is listed, even before a profile has been filled in.
              </p>
              <p>
                Updates sent through the official form are synced from Google Sheets, so the sheet stays the single
                source of truth.
              </p>
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="section band" aria-labelledby="faq-title">
          <div className="container split">
            <h2 id="faq-title">Common questions</h2>
            <div className="rows">
              {faq.map((item) => (
                <div key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
