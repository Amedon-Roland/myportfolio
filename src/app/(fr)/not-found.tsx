import { Frame } from "@/components/Frame";
import { NotFoundPage } from "@/components/NotFoundPage";

export default function NotFound() {
  return (
    <Frame lang="fr" altHref="/en">
      <NotFoundPage lang="fr" />
    </Frame>
  );
}
