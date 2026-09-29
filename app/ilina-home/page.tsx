import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ILINA",
  description: "ILINA 서비스",
};

const SKIN_SERVICE_URL = "https://skin.ilina.kr";
const PRIVACY_URL = `${SKIN_SERVICE_URL}/privacy`;
const CONTACT_EMAIL = "do.il2na@gmail.com";

export default function IlinaHomePage() {
  return (
    <>
      <style>{`footer[data-skin-site-footer] { display: none; }`}</style>

      <main className="flex min-h-screen bg-[#f7fbf8] px-5 text-slate-900">
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="flex flex-1 flex-col justify-center py-16">
            <h1 className="text-sm font-black tracking-[0.22em] text-emerald-700">
              ILINA
            </h1>

            <a
              href={SKIN_SERVICE_URL}
              className="mt-8 block rounded-[24px] border border-emerald-100 bg-white px-5 py-5 shadow-[0_12px_30px_rgba(15,118,110,0.07)] transition hover:border-emerald-200 hover:shadow-[0_14px_34px_rgba(15,118,110,0.10)]"
            >
              <p className="text-lg font-black tracking-tight text-slate-950">
                피부타입
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-600">
                나의 피부 특성 알아보기
                <span aria-hidden="true" className="ml-1 text-emerald-600">
                  →
                </span>
              </p>
              <p className="mt-4 text-xs font-semibold text-emerald-700">
                {SKIN_SERVICE_URL}
              </p>
            </a>
          </div>

          <footer className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-emerald-100/70 py-5 text-[0.68rem] font-semibold text-slate-400">
            <a
              href={PRIVACY_URL}
              className="transition hover:text-emerald-700"
            >
              개인정보처리방침
            </a>
            <span aria-hidden="true" className="text-emerald-200">
              ·
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition hover:text-emerald-700"
            >
              문의
            </a>
            <span aria-hidden="true" className="text-emerald-200">
              ·
            </span>
            <span>© 2026 ILINA</span>
          </footer>
        </div>
      </main>
    </>
  );
}
