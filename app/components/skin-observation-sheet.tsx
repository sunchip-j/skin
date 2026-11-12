export function SkinObservationSheet() {
  return <aside id="observation-sheet" aria-labelledby="observation-title" className="mt-10 rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8">
    <p className="text-xs font-black tracking-widest text-emerald-700">직접 써보는 기록지</p>
    <h2 id="observation-title" className="mt-3 text-2xl font-black tracking-tight">이마는 번들거리고, 볼은 당긴다면</h2>
    <p className="mt-4 text-base leading-8 text-slate-700">두 느낌을 하나의 타입으로 정리하기 전에 부위와 시점을 나눠 적어보세요. “오늘 피부가 나빴다”보다 “아침 세안 뒤 볼이 당겼고, 오후에는 이마에 유분감이 있었다”가 다음에 비교할 수 있는 기록입니다. 사용한 제품이나 외출 일정도 함께 적습니다.</p>
    <div className="mt-5 grid gap-4 text-sm leading-7 sm:grid-cols-3">
      {[
        ["01 · 관찰", "어느 부위에서 언제 느꼈나요?", "이마·코·볼·턱을 나누고 당김, 유분감, 따가움 등 실제로 느낀 것을 적습니다."],
        ["02 · 조건", "그날 무엇이 달랐나요?", "사용 제품과 바꾼 순서, 외출·운동·실내 환경처럼 함께 달라진 조건을 남깁니다."],
        ["03 · 비교", "같은 조건끼리 읽고 있나요?", "아침과 오후의 기록을 바로 비교하거나, 하루의 차이를 제품 효과로 단정하지 않습니다."],
      ].map(([step, title, body]) => <div key={step} className="rounded-xl bg-emerald-50/70 p-4"><p className="text-xs font-bold text-emerald-700">{step}</p><h3 className="mt-2 font-black text-slate-950">{title}</h3><p className="mt-2 text-slate-600">{body}</p></div>)}
    </div>
    <p className="mt-5 text-sm leading-7 text-slate-600">7일 분량은 생활의 차이를 적기 위한 편의상 구성입니다. 진단 기간이나 점수표가 아니며, 확인하려고 보습을 미루거나 세안을 반복할 필요는 없습니다. 증상이 지속되거나 심하면 기록을 끝내기 전에 진료를 받으세요.</p>
    <a href="/skin-observation-note.txt" download className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800">7일 피부 관찰 기록지 받기 · TXT</a>
    <p className="mt-2 text-xs leading-6 text-slate-500">메모 앱에서 열어 작성할 수 있는 빈 기록지입니다. 파일에 쓴 내용은 이 사이트로 전송되지 않습니다.</p>
  </aside>;
}
