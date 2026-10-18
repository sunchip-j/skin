import { SkinTypeStartScreen } from "@/features/skin-type/components/skin-type-start-screen";
import { ServiceResources } from "@/app/components/service-resources";

export { metadata } from "@/app/page";

export default function RootServiceHome() {
  return <div className="[&_.text-slate-400]:text-slate-600 [&_.bg-emerald-600]:bg-emerald-700 [&_.text-emerald-100]:text-white"><SkinTypeStartScreen accessibleDialog /><ServiceResources /></div>;
}
