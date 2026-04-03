import Link from "next/link";
import type { ReactNode } from "react";
import {
  type TechWalkthroughSegment,
  technicalWalkthroughPath,
} from "@/lib/technicalWalkthrough";

type Props = {
  segment: TechWalkthroughSegment;
  className?: string;
  children?: ReactNode;
};

/** In-app link to the technical walkthrough route for this section. */
export function TechWalkthroughLink({ segment, className, children }: Props) {
  const href = technicalWalkthroughPath(segment);

  return (
    <Link href={href} className={className}>
      {children ?? "Technical walkthrough"}
    </Link>
  );
}
