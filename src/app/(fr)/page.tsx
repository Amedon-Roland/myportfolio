import { Frame } from "@/components/Frame";
import { HomePage } from "@/components/HomePage";

export default function Page() {
  return (
    <Frame lang="fr" altHref="/en">
      <HomePage lang="fr" />
    </Frame>
  );
}
