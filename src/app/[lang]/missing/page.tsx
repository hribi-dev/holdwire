import { notFound } from "next/navigation";

/**
 * Target of the proxy's rewrite for unknown URLs. Calls notFound() before anything streams,
 * so the response keeps a real 404 status (see Next docs: loading → Status codes).
 */
export default function Missing() {
  notFound();
}
