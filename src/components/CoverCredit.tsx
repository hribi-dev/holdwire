import { COVER_LICENSES, coverCreditText, type Cover } from "@/lib/cover";

/** Photo credit line under an article's cover. Always shown, even where the licence doesn't require it. */
export function CoverCredit({ cover }: { cover: Cover }) {
  const lic = COVER_LICENSES[cover.license];
  const licenseHref = cover.licenseUrl ?? lic.url;
  if (cover.license === "own") return <figcaption className="cover-credit">{coverCreditText(cover)}</figcaption>;
  return (
    <figcaption className="cover-credit">
      <a href={cover.sourceUrl} target="_blank" rel="noopener">
        {coverCreditText(cover)}
      </a>
      {licenseHref && (
        <>
          {" · "}
          <a href={licenseHref} target="_blank" rel="noopener">
            {lic.label}
          </a>
        </>
      )}
    </figcaption>
  );
}
