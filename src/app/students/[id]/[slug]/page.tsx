import ProfileImage from "@/components/ProfileImage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getProfileById, getProfiles } from "@/lib/sheets";
import { isProfileFilled, toIsoDate } from "@/lib/profile";
import Link from "next/link";
// @ts-ignore: Bypass strict module resolution mismatch for Next.js imports
import { notFound, permanentRedirect } from "next/navigation";
import { createSlug } from "@/lib/slug";

// Enable Incremental Static Regeneration (ISR) and static pre-rendering
export const revalidate = 60;
export const dynamicParams = true;

const SITE = "https://ndc2021a.vercel.app";

export async function generateStaticParams() {
  const profiles = await getProfiles();
  return profiles.map((p) => ({
    id: p.id,
    slug: createSlug(p.name),
  }));
}

export async function generateMetadata(props: any): Promise<any> {
  const { id } = await props.params;
  const profile = await getProfileById(id);
  if (!profile) {
    return { title: "Profile not found", robots: { index: false, follow: false } };
  }

  const correctSlug = createSlug(profile.name);
  const image = profile.image
    ? `/api/image?u=${Buffer.from(profile.image).toString("base64")}`
    : "/opengraph-image";

  const isFilled = isProfileFilled(profile);
  const title = `${profile.name} | Notre Dame College Batch 2021 Group A`;
  const description =
    profile.description ||
    `${profile.name} is a student of Notre Dame College Dhaka Batch 2021 Group A. View profile, contact information, and public social links.`;

  return {
    // absolute: the profile title already names the batch, so the site template is not appended
    title: { absolute: title },
    description,
    alternates: { canonical: `/students/${profile.id}/${correctSlug}` },
    robots: isFilled
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: true,
        },
    openGraph: {
      type: "profile",
      url: `/students/${profile.id}/${correctSlug}`,
      title,
      description,
      images: [{ url: image, alt: profile.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: profile.name,
      description,
      images: [image],
    },
  };
}

function formatDate(raw: string) {
  return toIsoDate(raw) || (raw ? raw.split(" ")[0] : "");
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default async function ProfilePage(props: any) {
  const { id, slug } = await props.params;
  const profile = await getProfileById(id);

  if (!profile) {
    notFound();
  }

  const correctSlug = createSlug(profile.name);
  if (slug !== correctSlug) {
    // Only execute permanent 308 redirect if we have updated live data from Google Sheets.
    // If the data is an unupdated fallback record, avoid redirect loops when the API blips.
    if (profile.lastUpdated) {
      permanentRedirect(`/students/${id}/${correctSlug}`);
    }
  }

  const proxiedImage = profile.image
    ? `/api/image?u=${Buffer.from(profile.image).toString("base64")}`
    : null;

  const personNode = {
    "@type": "Person",
    "@id": `${SITE}/students/${profile.id}/${correctSlug}`,
    name: profile.name,
    identifier: profile.id,
    description: profile.description || `${profile.name} - Notre Dame College Batch 2021 Group A`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Notre Dame College, Dhaka" },
    memberOf: { "@type": "Organization", name: "Notre Dame College Batch 2021 Group A" },
    url: `${SITE}/students/${profile.id}/${correctSlug}`,
    image: proxiedImage ? `${SITE}${proxiedImage}` : `${SITE}/opengraph-image`,
    sameAs: [profile.facebook, profile.linkedin].filter(Boolean),
  };

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE}/students/${profile.id}/${correctSlug}`,
    name: `${profile.name} | Notre Dame College Batch 2021 Group A`,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE}/#website` },
    ...(toIsoDate(profile.lastUpdated) ? { dateModified: toIsoDate(profile.lastUpdated) } : {}),
    mainEntity: personNode,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: profile.name,
        item: `${SITE}/students/${profile.id}/${correctSlug}`,
      },
    ],
  };

  const updated = formatDate(profile.lastUpdated);

  return (
    <>
      <SiteHeader />
      <main id="main" className="profile">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([profileSchema, breadcrumbSchema]) }}
        />
        <div className="container">
          <Link href="/#directory" className="profile__back">
            Back to the directory
          </Link>

          <article className="profile__grid">
            {proxiedImage ? (
              <ProfileImage src={proxiedImage} alt={profile.name} />
            ) : (
              <div className="profile__photo" aria-hidden="true">
                <div className="profile__mono">{initialsOf(profile.name)}</div>
              </div>
            )}

            <div className="profile__main">
              <div className="profile__title">
                <h1>{profile.name}</h1>
                <p className="profile__meta">
                  <span>
                    ID <span className="num">{profile.id}</span>
                  </span>
                  {updated && (
                    <span>
                      Updated <time dateTime={updated}>{updated}</time>
                    </span>
                  )}
                </p>
              </div>

              <section className="profile__section" aria-labelledby="about-title">
                <h2 id="about-title">About</h2>
                {profile.description ? (
                  <p className="profile__bio">{profile.description}</p>
                ) : (
                  <p className="profile__bio profile__bio--empty">
                    Notre Dame College Batch 2021 Group A classmate. Profile details have not been submitted yet.
                  </p>
                )}
              </section>

              <section className="profile__section" aria-labelledby="contact-title">
                <h2 id="contact-title">Contact and links</h2>
                <dl className="facts">
                  <div>
                    <dt>Email</dt>
                    <dd>
                      {profile.email ? (
                        <a href={`mailto:${profile.email}`}>{profile.email}</a>
                      ) : (
                        <span className="muted">Not provided</span>
                      )}
                    </dd>
                  </div>
                  {profile.phone && (
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        <a href={`tel:${profile.phone}`} className="num">
                          {profile.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>LinkedIn</dt>
                    <dd>
                      {profile.linkedin ? (
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                          View LinkedIn profile
                        </a>
                      ) : (
                        <span className="muted">No LinkedIn</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Facebook</dt>
                    <dd>
                      {profile.facebook ? (
                        <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                          View Facebook profile
                        </a>
                      ) : (
                        <span className="muted">No Facebook</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
