import Link from "next/link";

export function EditorialShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7fbf8] text-slate-900">
      <header className="border-b border-emerald-100 bg-white/80">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-3 sm:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center text-base font-black tracking-[0.2em] text-emerald-800">ILINA</Link>
          <nav aria-label="피부 정보 메뉴" className="flex flex-wrap gap-x-5 text-sm font-bold">
            <Link href="/learn" className="inline-flex min-h-11 items-center text-emerald-800">피부 관리 노트</Link>
            <Link href="/guide" className="inline-flex min-h-11 items-center text-slate-600">16가지 유형</Link>
            <Link href="/survey" className="inline-flex min-h-11 items-center text-slate-600">검사하기</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
