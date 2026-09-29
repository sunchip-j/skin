import Link from "next/link";

export function ContentShell({
  eyebrow,
  title,
  description,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-5 py-8 text-slate-900">
      <article className="mx-auto w-full max-w-3xl">
        <nav className="mb-8 flex flex-wrap items-center gap-3 text-sm font-bold text-emerald-700" aria-label="주요 메뉴">
          <Link href="/">피부 타입 검사</Link>
          <span aria-hidden="true" className="text-emerald-200">/</span>
          <Link href="/guide">피부 가이드</Link>
          <span aria-hidden="true" className="text-emerald-200">/</span>
          <Link href="/about">서비스 소개</Link>
        </nav>

        <header className="rounded-[30px] border border-emerald-100 bg-white px-6 py-8 shadow-[0_18px_44px_rgba(15,118,110,0.08)] sm:px-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">{description}</p>
        </header>

        <div className="mt-6 space-y-6">{children}</div>
      </article>
    </main>
  );
}

export function ContentSection({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="rounded-[26px] border border-emerald-100 bg-white px-6 py-7 shadow-[0_14px_36px_rgba(15,118,110,0.06)] sm:px-8">
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[0.95rem] font-medium leading-7 text-slate-600">{children}</div>
    </section>
  );
}
