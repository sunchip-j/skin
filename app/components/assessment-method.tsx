import { skinDimensions } from "@/features/skin-type/calculate";

/** Keep the public scoring explanation tied to the actual questionnaire. */
export function AssessmentMethod() {
  return (
    <div className="space-y-5 text-sm leading-7 text-slate-600">
      <p>각 응답에 배정된 점수를 축별로 더합니다. 아래는 현재 서비스에서 사용하는 분류 구간이며, 의학적으로 검증된 진단 기준이나 위험도 기준을 뜻하지 않습니다. 점수의 단위가 서로 달라 네 축의 숫자를 직접 비교할 수 없습니다.</p>
      <div className="overflow-x-auto rounded-xl border border-emerald-100">
        <table className="w-full min-w-[360px] text-left">
          <caption className="p-3 text-left font-bold text-slate-900">문항 수, 가능한 점수와 유형 구간</caption>
          <thead className="bg-emerald-50"><tr><th scope="col" className="p-3">축 / 문항</th><th scope="col" className="p-3">가능 점수</th><th scope="col" className="p-3">분류 구간</th></tr></thead>
          <tbody>{skinDimensions.map((dimension) => {
            const min = dimension.questions.reduce((sum, q) => sum + Math.min(...q.choices.map(c => c.score)), 0);
            const max = dimension.questions.reduce((sum, q) => sum + Math.max(...q.choices.map(c => c.score)), 0);
            return <tr key={dimension.id} className="border-t border-emerald-100"><th scope="row" className="p-3 font-semibold">{dimension.title} / {dimension.questions.length}개</th><td className="p-3">{min}~{max}</td><td className="p-3">{dimension.thresholds.map(t => <div key={t.result}>{t.result}: {Math.max(min, t.min)}~{Math.min(max, t.max)}</div>)}</td></tr>;
          })}</tbody>
        </table>
      </div>
      <p><strong className="text-slate-900">경계값 예시:</strong> 유수분 합계 15.5점은 D, 16점은 O로 표시됩니다. 0.5점 차이로 글자가 바뀌어도 피부 상태가 갑자기 달라졌다는 뜻은 아닙니다. 경계 근처에서는 두 유형의 설명을 함께 읽고 실제 경험과 맞는 부분을 참고하세요.</p>
      <p><strong className="text-slate-900">검증 범위:</strong> 문항과 구간을 공개하는 것은 계산 방식의 설명입니다. 임상 타당성, 의료 전문가의 검토, 원본 바우만 검사와의 동등성을 입증하는 자료로 제공하지 않습니다. 설문은 피부 장벽, 멜라닌 양, 탄력 또는 알레르기를 직접 측정하지 않습니다.</p>
      <details className="rounded-xl border border-emerald-100 p-4">
        <summary className="cursor-pointer font-bold text-emerald-800">전체 문항과 선택지별 배점 확인하기</summary>
        <div className="mt-4 space-y-6">{skinDimensions.map(d => <section key={d.id}><h3 className="font-bold text-slate-900">{d.title}</h3><ol className="mt-3 list-decimal space-y-4 pl-5">{d.questions.map(q => <li key={q.id}><p>{q.text}</p><ul className="mt-1 space-y-1">{q.choices.map((c, i) => <li key={i}>{c.text} · {c.score}점</li>)}</ul></li>)}</ol></section>)}</div>
      </details>
    </div>
  );
}
