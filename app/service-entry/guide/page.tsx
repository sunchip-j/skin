import GuidePage from "@/app/guide/page";
import { ServiceResources } from "@/app/components/service-resources";

export { metadata } from "@/app/guide/page";

export default function RootServiceGuide() {
  return <><GuidePage /><ServiceResources products /></>;
}
