import { Frame } from "@/components/Frame";
import { ProjectSkeleton } from "@/components/ProjectSkeleton";

/** Same frame as the page, so the header stays put while the project streams in. */
export default function Loading() {
  return (
    <Frame lang="en" altHref="/">
      <ProjectSkeleton label="Loading project…" />
    </Frame>
  );
}
