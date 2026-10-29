import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  RotateCcw, 
  Sparkles, 
  Check, 
  X, 
  Award,
  ChevronRight,
  HelpCircle,
  FileText,
  Lightbulb,
  PenTool,
  CheckCircle2,
  Clock,
  Save,
  BookmarkCheck,
  Trophy,
  Trash2,
  AlertTriangle,
  Download
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answer: boolean; // true = O, false = X
  explanation: string;
  praise: string;
  encouragement: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "체했을 때 탄산음료를 마시면 소화가 잘된다.",
    answer: false,
    explanation: "트림은 삼킨 가스가 나올 뿐이며, 탄산이 위벽을 자극해 오히려 소화 불량을 악화시킬 수 있습니다.",
    praise: "탄산음료의 착각을 꿰뚫어 본 예리한 통찰력! 훌륭해요!",
    encouragement: "아쉽게 틀렸지만 괜찮아요! 트림은 단순 가스 배출일 뿐이라는 점, 이번 기회에 확실히 알아두면 큰 도움이 될 거예요!"
  },
  {
    id: 2,
    question: "감기에 걸렸을 때는 항생제를 먹어야 빨리 낫는다.",
    answer: false,
    explanation: "감기는 바이러스 감염 질환이며, 항생제는 세균(박테리아)을 치료하는 약이라 일반 감기 치료에는 효과가 없습니다.",
    praise: "약물의 원리를 정확히 알고 있네요! 건강 상식 모범생 인정!",
    encouragement: "많은 친구들이 헷갈려하는 문제예요! 감기에는 항생제가 듣지 않는다는 과학적 사실, 이번 기회에 꼭 기억해두세요!"
  },
  {
    id: 3,
    question: "스마트폰의 블루라이트는 수면 유도 호르몬인 멜라토닌 분비를 방해한다.",
    answer: true,
    explanation: "밤에 쐬는 청색광은 뇌를 낮으로 착각하게 만들어 깊은 수면을 돕는 멜라토닌 분비를 억제합니다.",
    praise: "수면 과학 지식까지 완벽! 오늘 밤 꿀잠 잘 자격이 있어요!",
    encouragement: "조금 아쉽네요! 블루라이트가 멜라토닌을 억제한다는 원리를 이번 기회에 잘 알아두면 앞으로 꿀잠 자는 데 큰 힘이 될 거예요!"
  },
  {
    id: 4,
    question: "격렬한 운동 직후 바로 차가운 물로 샤워하는 것이 심장 건강에 가장 좋다.",
    answer: false,
    explanation: "운동 후 갑작스러운 찬물 샤워는 혈관을 급격히 수축시켜 혈압 상승과 심장 부담을 유발하므로 미온수가 안전합니다.",
    praise: "신체 반응의 위험성을 짚어낸 꼼꼼한 판단력, 아주 멋져요!",
    encouragement: "틀렸다고 낙담하지 마세요! 운동 후엔 심장 보호를 위해 미온수가 최고라는 점, 이번 기회에 꼭 머릿속에 쏙 넣어두세요!"
  },
  {
    id: 5,
    question: "초콜릿이나 사탕의 당분은 뇌의 순간 집중력 향상에 도움을 줄 수 있다.",
    answer: true,
    explanation: "포도당은 뇌의 주요 에너지원이므로 일시적 집중력에 도움을 줍니다. 단, 과하면 혈당 급락이 올 수 있습니다.",
    praise: "뇌 활동 메커니즘을 꿰뚫은 정답! 두뇌 풀가동 중이시군요!",
    encouragement: "괜찮아요! 포도당이 뇌의 순간 에너지원이 된다는 사실을 이번 기회에 똑똑하게 알아두면 시험기간 간식 선택에 꿀팁이 돼요!"
  },
  {
    id: 6,
    question: "물은 무조건 하루 3L 이상 많이 마실수록 체내 건강에 항상 이롭다.",
    answer: false,
    explanation: "과도하게 급히 많은 물을 마시면 체내 나트륨 농도가 급격히 떨어지는 '저나트륨혈증(물 중독)'에 이를 수 있습니다.",
    praise: "'과유불급'의 건강 원칙을 완벽하게 이해하고 있네요!",
    encouragement: "아쉬워요! 물도 한꺼번에 너무 많이 마시면 위험할 수 있다는 '물 중독' 상식, 이번 기회에 똑똑하게 알아두면 안심이에요!"
  },
  {
    id: 7,
    question: "공부할 때 밤을 새우는 것보다 적정 수면을 취하는 것이 장기 기억에 유리하다.",
    answer: true,
    explanation: "뇌의 해마는 잠자는 동안 낮에 익힌 학습 내용을 정리하여 대뇌 피질의 장기 기억 저장소로 옮깁니다.",
    praise: "학습과 수면의 황금 밸런스를 아는 진정한 스마트 학습자!",
    encouragement: "중요한 내용이니 괜찮아요! 뇌의 해마가 잠잘 때 기억을 정리한다는 사실, 이번 기회에 확실히 알아두고 시험 때 푹 자도록 해요!"
  },
  {
    id: 8,
    question: "딸꾹질을 멈추기 위해 숨을 참거나 찬물을 천천히 삼키는 것은 과학적 근거가 있다.",
    answer: true,
    explanation: "숨을 참아 혈중 이산화탄소 농도를 올리거나 미주 신경을 자극하면 횡격막 경련을 진정시키는 데 효과가 있습니다.",
    praise: "실생활 응급 팁까지 섭렵한 건강 박사님 탄생이네요!",
    encouragement: "아깝게 틀렸네요! 숨 참기와 찬물 삼키기가 횡격막을 진정시키는 과학적 응급 팁이라는 점, 이번 기회에 잘 배워두면 아주 유용해요!"
  },
  {
    id: 9,
    question: "어두운 곳에서 스마트폰을 보면 눈이 피로해질 뿐 시력 자체가 영구 손상되지는 않는다.",
    answer: true,
    explanation: "어두운 곳 시청은 눈 근육 피로와 안구 건조증을 일으키지만, 영구적인 시력 소실이나 안구 구조 변형을 주지는 않습니다.",
    praise: "흔한 대중적 오해를 바로잡은 과학적 팩트 체크, 최고입니다!",
    encouragement: "누구나 오해하기 쉬운 문제예요! 안구 피로일 뿐 영구 시력 손상은 아니라는 과학적 사실, 이번 기회에 제대로 챙겨두세요!"
  },
  {
    id: 10,
    question: "식사 후 바로 눕는 습관은 위산 역류와 역류성 식도염의 주요 원인이 된다.",
    answer: true,
    explanation: "누운 자세에서는 중력의 차단 효과가 사라져 위의 내용물과 산성 소화액이 식도 쪽으로 쉽게 역류합니다.",
    praise: "소화기 건강을 지키는 바른 생활 습관, 만점짜리 정답이에요!",
    encouragement: "괜찮아요! 식후 바로 누우면 중력 때문에 위산이 역류한다는 원리, 이번 기회에 확실히 알아두고 건강한 습관을 만들어봐요!"
  }
];

const STORAGE_KEY = 'quiz_순자건강퀴즈';

interface QuizRecord {
  name: string;
  score: number;
  date: string;
}

interface RankedQuizRecord extends QuizRecord {
  rank: number;
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>(Array(QUESTIONS.length).fill(null));
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [recordsList, setRecordsList] = useState<QuizRecord[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);

  // 'quiz_순자건강퀴즈' 키의 기록만 초기화하는 함수
  const handleClearRecords = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecordsList([]);
      setShowResetConfirm(false);
    } catch (e) {
      console.error('기록 초기화 오류:', e);
    }
  };

  // 저장된 기록을 .json 파일로 다운로드하는 함수
  const handleDownloadJson = () => {
    const records = loadRecordsFromStorage();
    if (!records || records.length === 0) {
      return;
    }

    try {
      // 읽기 편하도록 2칸 들여쓰기된 JSON 문자열로 변환
      const jsonString = JSON.stringify(records, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // 파일명: quiz_순자건강퀴즈_기록_YYYYMMDD.json
      const now = new Date();
      const dateTag = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      link.download = `quiz_순자건강퀴즈_기록_${dateTag}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 2000);
    } catch (e) {
      console.error('JSON 다운로드 중 오류 발생:', e);
    }
  };

  // localStorage에서 기록 불러오기
  const loadRecordsFromStorage = (): QuizRecord[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('기록 로드 실패:', e);
      return [];
    }
  };

  // 앱 로드 시 및 저장소 동기화
  useEffect(() => {
    setRecordsList(loadRecordsFromStorage());
  }, []);

  // 밀집 순위(Dense Ranking) 계산: 점수 높은 순, 동점은 같은 순위, 다음 점수는 바로 다음 순위, 동점 내에서는 먼저 등록한 순
  const getRankedLeaderboard = (records: QuizRecord[]): RankedQuizRecord[] => {
    if (!records || records.length === 0) return [];

    // 먼저 기록된 순서(인덱스)를 보존하여 정렬
    const indexed = records.map((item, idx) => ({ ...item, originalIndex: idx }));
    indexed.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // 점수 높은 순서
      }
      return a.originalIndex - b.originalIndex; // 같은 점수 내에서는 먼저 기록한 순서
    });

    let currentRank = 1;
    let lastScore: number | null = null;
    const ranked: RankedQuizRecord[] = [];

    for (let i = 0; i < indexed.length; i++) {
      const item = indexed[i];
      if (lastScore !== null && item.score < lastScore) {
        currentRank++;
      }
      lastScore = item.score;
      if (currentRank > 10) {
        break; // 10위까지만 표기
      }
      ranked.push({
        name: item.name,
        score: item.score,
        date: item.date,
        rank: currentRank,
      });
    }

    return ranked;
  };

  // 현재 날짜와 시간을 'YYYY-MM-DD HH:mm' 포맷으로 생성하는 헬퍼 함수
  const formatCurrentDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // '기록하기' 버튼 클릭 처리: 저장 후 바로 '🏆 명예의 전당' 화면으로 전환
  const handleSaveRecord = () => {
    if (isSaved) return;

    const trimmedName = studentName.trim();
    if (!trimmedName) {
      setErrorMessage('이름을 입력해주세요');
      return;
    }

    setErrorMessage('');
    const newRecord: QuizRecord = {
      name: trimmedName,
      score: score,
      date: formatCurrentDateTime(),
    };

    try {
      const existing = loadRecordsFromStorage();
      const updated = [...existing, newRecord];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecordsList(updated);
      setIsSaved(true);
      // 저장 완료 후 즉시 🏆 명예의 전당 화면으로 이동
      setShowLeaderboard(true);
    } catch (e) {
      console.error('기록 저장 중 오류:', e);
      setErrorMessage('기록을 저장하지 못했습니다.');
    }
  };

  const currentQ = QUESTIONS[currentIndex];
  const currentAnswer = userAnswers[currentIndex];
  const isCurrentAnswered = currentAnswer !== null;
  const isCurrentCorrect = isCurrentAnswered && currentAnswer === currentQ.answer;

  const handleSelectAnswer = (choice: boolean) => {
    if (isCurrentAnswered) return;
    const updated = [...userAnswers];
    updated[currentIndex] = choice;
    setUserAnswers(updated);
  };

  const handleNextQuestion = () => {
    const allAnswered = userAnswers.every((ans) => ans !== null);
    if (allAnswered) {
      setIsFinished(true);
      return;
    }

    // 다음 미응시 문제 찾기
    let nextIdx = -1;
    for (let i = 1; i <= QUESTIONS.length; i++) {
      const target = (currentIndex + i) % QUESTIONS.length;
      if (userAnswers[target] === null) {
        nextIdx = target;
        break;
      }
    }

    if (nextIdx !== -1) {
      setCurrentIndex(nextIdx);
      setIsFinished(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setIsFinished(false);
    setShowLeaderboard(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers(Array(QUESTIONS.length).fill(null));
    setIsFinished(false);
    setShowLeaderboard(false);
    setShowResetConfirm(false);
    setStudentName('');
    setIsSaved(false);
    setErrorMessage('');
  };

  // 응시 및 점수 계산 (각 10점, 총 100점)
  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    if (ans !== null && ans === QUESTIONS[idx].answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const score = correctCount * 10;
  const allAnswered = answeredCount === QUESTIONS.length;
  const rankedLeaderboard = getRankedLeaderboard(recordsList);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2C2A29] py-6 px-3 sm:px-6 font-sans antialiased flex flex-col items-center selection:bg-amber-200">
      {/* 최상단 네비게이션 헤더 */}
      <div className="w-full max-w-5xl mb-4 flex items-center justify-between text-xs text-[#6B6355]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1E1D1D] flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#BE123C]" />
            2026학년도 중3 전국연합 보건의학 학력평가
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="bg-[#EAE4D7] px-2.5 py-1 rounded text-[#4B4438] font-semibold">
            응시 완료: <span className="text-[#BE123C] font-mono">{answeredCount}</span>/10문항
          </span>

          {/* 명예의 전당 (순위 보기) 버튼 */}
          <button
            type="button"
            onClick={() => {
              setRecordsList(loadRecordsFromStorage());
              setShowLeaderboard(!showLeaderboard);
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
              showLeaderboard
                ? 'bg-amber-500 border-amber-600 text-white'
                : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>{showLeaderboard ? '순위 닫기' : '순위 보기'}</span>
          </button>

          {showLeaderboard ? (
            <button
              type="button"
              onClick={() => setShowLeaderboard(false)}
              className="text-[#BE123C] hover:underline font-bold cursor-pointer text-[11px]"
            >
              시험지로
            </button>
          ) : isFinished ? (
            <button
              type="button"
              onClick={() => setIsFinished(false)}
              className="text-[#BE123C] hover:underline font-bold cursor-pointer text-[11px]"
            >
              시험지 보기
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsFinished(true)}
              className="bg-[#2C2A29] hover:bg-black text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer"
            >
              성적표 보기
            </button>
          )}
        </div>
      </div>

      {/* 2단 분할 레이아웃: 좌측(시험지), 우측(OMR 카드) */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-start justify-center gap-5">
        {/* ================= 좌측: 학교 시험지 본문 ================= */}
        <main className="w-full lg:flex-1 bg-[#FFFDF9] border border-[#DDD5C7] rounded-sm shadow-md overflow-hidden relative">
          {/* 시험지 상단 헤더 박스 */}
          <header className="border-b-2 border-[#2C2A29] p-5 sm:p-6 bg-[#FCFAF5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-[#C8BFB0]">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#2C2A29] text-white">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs tracking-wider text-[#736B5E] font-medium">제3교시 보건·생활 건강 영역</p>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E1D1D]">
                    건강 상식 모의평가 시험지 (OX)
                  </h1>
                </div>
              </div>

              {/* 수험자 정보란 */}
              <div className="flex items-center gap-2 text-xs text-[#524C42] bg-[#F5EFE6] px-3 py-2 border border-[#DBD2C5] rounded">
                <div>
                  <span className="font-semibold text-[#3D3830]">수험번호:</span> 2026-303
                </div>
                <span className="text-[#C2B7A8]">|</span>
                <div>
                  <span className="font-semibold text-[#3D3830]">성명:</span> 중3 수험생
                </div>
                <span className="text-[#C2B7A8]">|</span>
                <div className="flex items-center gap-1 font-semibold text-[#BE123C]">
                  <FileText className="w-3.5 h-3.5" />
                  <span>10문항</span>
                </div>
              </div>
            </div>

            {/* 시험 유의사항 및 진행 바 */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6B6355]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C]"></span>
                <span>오른쪽 OMR 카드를 눌러 풀고 싶은 문제를 자유롭게 선택할 수 있습니다.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#3D3830]">진행도:</span>
                <span className="font-mono text-sm font-bold text-[#BE123C]">
                  {answeredCount} / 10 완료
                </span>
              </div>
            </div>

            {/* 진행 게이지 (목표 구배 효과 반영) */}
            <div className="w-full bg-[#EAE3D6] h-1.5 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#BE123C] h-full transition-all duration-300 ease-out"
                style={{ width: `${(answeredCount / 10) * 100}%` }}
              />
            </div>
          </header>

          {/* 시험 본문 영역 */}
          {showLeaderboard ? (
            /* ================= 🏆 명예의 전당 (순위 화면) ================= */
            <section className="p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">
              <div>
                {/* 타이틀 헤더 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#E5DECF]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#1E1D1D] flex items-center gap-2">
                        <span>🏆 명예의 전당</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                          TOP 10
                        </span>
                      </h2>
                      <p className="text-xs text-[#736B5E] mt-0.5">
                        점수가 높은 순으로 1위~10위까지 표시되며, 동점자는 같은 순위로 기록됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <span className="text-[11px] bg-[#FAF5EB] px-2.5 py-1.5 rounded text-[#6E6352] border border-[#E3DAC8] font-mono">
                      총 등록: <strong className="text-[#BE123C]">{recordsList.length}</strong>명
                    </span>
                    <button
                      type="button"
                      onClick={handleDownloadJson}
                      disabled={recordsList.length === 0}
                      title={recordsList.length === 0 ? "다운로드할 저장 기록이 없습니다" : "기록을 JSON 파일로 다운로드"}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border shadow-2xs ${
                        recordsList.length === 0
                          ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                          : isDownloaded
                          ? 'bg-emerald-600 border-emerald-700 text-white cursor-default'
                          : 'bg-white hover:bg-emerald-50 border-emerald-400 text-emerald-800 active:scale-95 cursor-pointer'
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>다운로드 완료!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-emerald-600" />
                          <span>JSON 다운로드</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all bg-white hover:bg-rose-50 border border-rose-300 text-rose-600 shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>기록 초기화</span>
                    </button>
                  </div>
                </div>

                {/* 화면 안 확인 모달 (브라우저 기본 confirm창 대신 화면 내 팝업 렌더링) */}
                {showResetConfirm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4 animate-in fade-in duration-150">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl border-2 border-rose-300 p-6 text-center animate-in zoom-in-95 duration-150">
                      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1E1D1D] mb-1.5">
                        정말 모든 기록을 지울까요?
                      </h3>
                      <p className="text-xs text-[#736B5E] mb-6 leading-relaxed">
                        'quiz_순자건강퀴즈'에 저장된 랭킹 및 수험생 점수 데이터가 삭제됩니다.
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setShowResetConfirm(false)}
                          className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-[#3D3830] text-xs font-bold rounded transition-colors cursor-pointer"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={handleClearRecords}
                          className="flex-1 py-2.5 px-4 bg-[#BE123C] hover:bg-[#9F1239] text-white text-xs font-bold rounded shadow-sm transition-colors cursor-pointer"
                        >
                          지우기
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 순위 테이블 */}
                {rankedLeaderboard.length === 0 ? (
                  <div className="py-16 text-center text-[#8C8373] bg-[#FAF8F5] rounded border border-dashed border-[#DFD6C9]">
                    <Award className="w-12 h-12 text-amber-400 mx-auto mb-3 opacity-80" />
                    <p className="font-bold text-sm text-[#3D3830] mb-1">아직 등록된 기록이 없습니다.</p>
                    <p className="text-xs">10문제를 모두 풀고 성적표에서 '기록하기'를 눌러 1위의 주인공이 되어보세요!</p>
                  </div>
                ) : (
                  <div className="overflow-hidden border border-[#DCD3C4] rounded bg-white shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#F6F2E9] border-b border-[#DDD5C7] text-[#554D40] font-bold">
                          <th className="py-2.5 px-3 w-24 text-center">순위</th>
                          <th className="py-2.5 px-3">이름</th>
                          <th className="py-2.5 px-3 text-center w-24">점수</th>
                          <th className="py-2.5 px-3 text-right">기록 일시</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EFEAE1]">
                        {rankedLeaderboard.map((item, idx) => {
                          const isTop1 = item.rank === 1;
                          const isTop2 = item.rank === 2;
                          const isTop3 = item.rank === 3;

                          return (
                            <tr
                              key={`${item.name}-${item.date}-${idx}`}
                              className={`transition-colors ${
                                isTop1
                                  ? 'bg-amber-50/90 font-semibold'
                                  : isTop2
                                  ? 'bg-slate-50/90'
                                  : isTop3
                                  ? 'bg-orange-50/60'
                                  : 'hover:bg-[#FAF8F3]'
                              }`}
                            >
                              <td className="py-3 px-3 text-center font-bold">
                                {isTop1 ? (
                                  <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full text-xs shadow-2xs">
                                    <span>🥇</span> 1위
                                  </span>
                                ) : isTop2 ? (
                                  <span className="inline-flex items-center gap-1 text-slate-800 bg-slate-200 border border-slate-300 px-2 py-0.5 rounded-full text-xs">
                                    <span>🥈</span> 2위
                                  </span>
                                ) : isTop3 ? (
                                  <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-200/60 border border-amber-300 px-2 py-0.5 rounded-full text-xs">
                                    <span>🥉</span> 3위
                                  </span>
                                ) : (
                                  <span className="text-zinc-600 font-mono text-xs font-semibold px-2">
                                    {item.rank}위
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-[#1E1D1D] font-medium tracking-tight">
                                  {item.name}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-center">
                                <span className="font-mono font-black text-sm text-[#BE123C]">
                                  {item.score}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-medium ml-0.5">점</span>
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-[11px] text-[#786F62]">
                                {item.date}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 명예의 전당 하단 버튼 바 */}
              <div className="mt-6 pt-4 border-t border-[#EAE3D6] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-[#807666]">
                  * 브라우저 저장소(localStorage)의 'quiz_순자건강퀴즈' 키에 안전하게 보관된 데이터입니다.
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    disabled={recordsList.length === 0}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold shadow-sm transition-all border ${
                      recordsList.length === 0
                        ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                        : isDownloaded
                        ? 'bg-emerald-600 border-emerald-700 text-white'
                        : 'bg-white border-emerald-300 hover:bg-emerald-50 text-emerald-800 cursor-pointer'
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>다운로드 완료</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>JSON 파일 받기</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded shadow-sm cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>기록 초기화</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeaderboard(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#2C2A29] hover:bg-stone-50 text-[#2C2A29] text-xs font-semibold rounded shadow-sm cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>시험지로 돌아가기</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C2A29] hover:bg-[#151414] text-white text-xs font-semibold rounded shadow transition-transform active:scale-[0.98] cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>다시 하기</span>
                  </button>
                </div>
              </div>
            </section>
          ) : !isFinished ? (
            <section className="p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">
              {/* 문제 번호 및 문제 지문 */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-[#2C2A29] text-white rounded">
                      제 {currentQ.id} 번
                    </span>
                    <span className="text-xs text-[#8A8172] font-medium">배점: 10점</span>
                    {isCurrentAnswered ? (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        마킹 완료
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded animate-pulse">
                        답안 작성 대기중
                      </span>
                    )}
                  </div>

                  {/* 실시간 시험지 채점 도장 표시 */}
                  {isCurrentAnswered && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-[#BE123C]/30 bg-rose-50 text-[#BE123C] font-bold text-xs">
                      {isCurrentCorrect ? (
                        <>
                          <span className="text-base leading-none">⭕</span>
                          <span>[정답 채점 완료]</span>
                        </>
                      ) : (
                        <>
                          <span className="text-base leading-none">❌</span>
                          <span>[오답 채점 완료]</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* 문제 텍스트 */}
                <div className="relative py-5 px-6 bg-[#FAF7F0] border-l-4 border-[#2C2A29] rounded-r text-[#1F1E1D]">
                  <p className="text-lg sm:text-xl font-semibold leading-relaxed tracking-tight break-keep">
                    {currentQ.question}
                  </p>

                  {/* 답안 채점 붉은 색연필 그래픽 오버레이 */}
                  {isCurrentAnswered && (
                    <div className="absolute right-4 top-2 pointer-events-none select-none opacity-85">
                      {isCurrentCorrect ? (
                        <span className="text-[#BE123C] font-bold text-6xl font-mono leading-none">⭕</span>
                      ) : (
                        <span className="text-[#BE123C] font-bold text-6xl font-mono leading-none">／</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* O / X 답안 선택 버튼부 (피츠의 법칙 & 힉의 법칙 적용) */}
              <div className="my-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-[#7A7163] font-medium flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    {isCurrentAnswered 
                      ? "이 문제는 이미 답안을 마킹하여 채점이 완료되었습니다." 
                      : "아래 O 또는 X를 클릭하여 컴퓨터용 답안지에 마킹하세요."}
                  </p>
                  {isCurrentAnswered && (
                    <span className="text-[11px] text-zinc-500 font-mono">
                      선택한 답: [{currentAnswer ? 'O' : 'X'}]
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* O 버튼 */}
                  <button
                    type="button"
                    disabled={isCurrentAnswered}
                    onClick={() => handleSelectAnswer(true)}
                    className={`group relative flex flex-col items-center justify-center p-6 rounded border-2 transition-all duration-150 ${
                      currentAnswer === true
                        ? isCurrentCorrect
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400'
                          : 'border-[#BE123C] bg-rose-50 text-[#BE123C] ring-2 ring-rose-400'
                        : isCurrentAnswered
                        ? 'border-[#DDD4C6] bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                        : 'border-[#3D3A36] bg-white text-[#2C2A29] hover:bg-[#F4EFE6] hover:border-[#1E1D1C] active:scale-[0.98] cursor-pointer'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-wider">O</span>
                    <span className="mt-1 text-xs font-semibold tracking-wide">그렇다 (참)</span>
                    {isCurrentAnswered && currentQ.answer === true && (
                      <span className="absolute top-2 right-2 text-xs bg-emerald-700 text-white px-2 py-0.5 rounded font-bold">
                        정답
                      </span>
                    )}
                  </button>

                  {/* X 버튼 */}
                  <button
                    type="button"
                    disabled={isCurrentAnswered}
                    onClick={() => handleSelectAnswer(false)}
                    className={`group relative flex flex-col items-center justify-center p-6 rounded border-2 transition-all duration-150 ${
                      currentAnswer === false
                        ? isCurrentCorrect
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400'
                          : 'border-[#BE123C] bg-rose-50 text-[#BE123C] ring-2 ring-rose-400'
                        : isCurrentAnswered
                        ? 'border-[#DDD4C6] bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                        : 'border-[#3D3A36] bg-white text-[#2C2A29] hover:bg-[#F4EFE6] hover:border-[#1E1D1C] active:scale-[0.98] cursor-pointer'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-wider">X</span>
                    <span className="mt-1 text-xs font-semibold tracking-wide">아니다 (거짓)</span>
                    {isCurrentAnswered && currentQ.answer === false && (
                      <span className="absolute top-2 right-2 text-xs bg-emerald-700 text-white px-2 py-0.5 rounded font-bold">
                        정답
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* 채점 및 해설 피드백 박스 */}
              {isCurrentAnswered ? (
                <div className={`p-4 rounded border ${
                  isCurrentCorrect 
                    ? 'bg-[#F2FBF6] border-emerald-300 text-emerald-950' 
                    : 'bg-[#FFF5F5] border-rose-300 text-rose-950'
                } transition-all`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-full">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        {isCurrentCorrect ? (
                          <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                            <Check className="w-4 h-4 stroke-[3]" />
                            정답입니다! (+10점 획득)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-sm font-bold text-[#BE123C]">
                            <X className="w-4 h-4 stroke-[3]" />
                            오답입니다! (정답: {currentQ.answer ? 'O' : 'X'})
                          </span>
                        )}
                      </div>

                      {/* 칭찬/격려 피드백 */}
                      {isCurrentCorrect ? (
                        <div className="flex items-start gap-1.5 text-sm font-medium text-[#1A422B] mb-2.5 bg-white/80 p-2.5 rounded border border-emerald-200">
                          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-xs text-emerald-700 block mb-0.5">[선생님의 칭찬]</span>
                            <span>{currentQ.praise}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-1.5 text-sm font-medium text-[#4D2800] mb-2.5 bg-white/90 p-2.5 rounded border border-amber-300">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-xs text-amber-700 block mb-0.5">[선생님의 격려 및 꿀팁]</span>
                            <span>{currentQ.encouragement}</span>
                          </div>
                        </div>
                      )}

                      {/* 상세 해설 */}
                      <p className="text-xs text-[#52493E] leading-relaxed pl-1">
                        <span className="font-bold text-[#332E27]">[정답 및 상세 해설]</span> {currentQ.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-black/5">
                    <span className="text-[11px] text-zinc-500">
                      우측 OMR 카드에서 다른 문항을 눌러 바로 이동할 수도 있습니다.
                    </span>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#2C2A29] hover:bg-[#151414] text-white text-xs font-semibold rounded shadow-sm transition-colors cursor-pointer"
                    >
                      <span>{allAnswered ? '최종 성적표 확인' : '다음 안 푼 문제로'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 text-center text-xs text-[#8A8172] bg-[#FAF8F5] border border-dashed border-[#DFD6C9] rounded flex items-center justify-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-[#BE123C]" />
                  <span>O 또는 X를 선택하면 즉시 컴퓨터 사인펜 마킹과 실시간 채점이 진행됩니다.</span>
                </div>
              )}
            </section>
          ) : (
            /* 성적표 화면 */
            <section className="p-6 sm:p-10 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-4 border border-amber-300">
                <Award className="w-8 h-8" />
              </div>

              <p className="text-xs font-bold tracking-widest text-[#786F62] uppercase mb-1">
                OFFICIAL REPORT CARD
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1E1D] mb-2">
                보건 모의고사 최종 성적표
              </h2>
              <p className="text-xs text-[#635C50] mb-6 max-w-md">
                우측 OMR 답안지와 대조하여 틀린 문제를 복습하고 건강 지식을 확인해 보세요.
              </p>

              {/* 성적 점수 카드 */}
              <div className="w-full max-w-md bg-[#FAF7F0] border-2 border-[#2C2A29] p-6 rounded mb-6 relative">
                <div className="absolute right-4 top-4 border-2 border-[#BE123C] text-[#BE123C] text-xs font-black px-2 py-1 rotate-[-8deg] rounded-xs select-none">
                  채점관 확인
                </div>

                <div className="grid grid-cols-2 gap-4 divide-x divide-[#DBD3C5] text-center">
                  <div>
                    <span className="text-xs text-[#7A7163] font-medium block mb-1">최종 환산 점수</span>
                    <span className="text-4xl sm:text-5xl font-black font-mono text-[#BE123C]">
                      {score}
                    </span>
                    <span className="text-xs text-[#7A7163] font-medium ml-1">/ 100점</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#7A7163] font-medium block mb-1">맞힌 개수</span>
                    <span className="text-4xl sm:text-5xl font-black font-mono text-[#2C2A29]">
                      {correctCount}
                    </span>
                    <span className="text-xs text-[#7A7163] font-medium ml-1">/ 10개</span>
                  </div>
                </div>

                {/* 총평 메시지 */}
                <div className="mt-5 pt-4 border-t border-dashed border-[#DBD3C5] text-xs text-[#4A4338] leading-relaxed font-medium">
                  {score === 100 && "🎉 대단합니다! 100점 만점으로 학교 최고의 '건강 지킴이' 자격을 취득했습니다!"}
                  {score >= 80 && score < 100 && "👏 훌륭한 성적입니다! 평소 건강 상식을 아주 잘 실천하고 있네요!"}
                  {score >= 60 && score < 80 && "👍 기본 건강 상식이 튼튼합니다! 틀린 부분만 우측 OMR을 눌러 복습해 보세요!"}
                  {score < 60 && "💪 우측 OMR 카드의 틀린 문항을 클릭해 친절한 해설을 확인해 보세요!"}
                </div>
              </div>

              {/* 성적 기록 및 명부 등록 영역 (localStorage 'quiz_순자건강퀴즈') */}
              <div className="w-full max-w-md bg-white border border-[#DDD5C7] rounded-md p-4 mb-6 shadow-xs text-left">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="student-name-input" className="text-xs font-bold text-[#3D3830] flex items-center gap-1.5">
                    <Save className="w-3.5 h-3.5 text-[#BE123C]" />
                    <span>성적 명부 등록 (브라우저 저장)</span>
                  </label>
                  {isSaved && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <BookmarkCheck className="w-3 h-3" />
                      저장 완료됨
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    id="student-name-input"
                    type="text"
                    value={studentName}
                    disabled={isSaved}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isSaved) {
                        handleSaveRecord();
                      }
                    }}
                    placeholder="이름을 입력해주세요"
                    className={`flex-1 px-3 py-2 text-xs border rounded transition-colors focus:outline-none ${
                      isSaved
                        ? 'bg-zinc-100 border-zinc-300 text-zinc-500 cursor-not-allowed'
                        : errorMessage
                        ? 'border-rose-400 bg-rose-50/50 text-[#1E1D1D] focus:border-rose-500'
                        : 'border-[#C8BFB0] bg-[#FFFDF9] text-[#1E1D1D] focus:border-[#BE123C]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleSaveRecord}
                    disabled={isSaved}
                    className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-1.5 transition-all shadow-xs ${
                      isSaved
                        ? 'bg-emerald-600 text-white cursor-not-allowed opacity-90'
                        : 'bg-[#BE123C] hover:bg-[#9F1239] active:scale-[0.98] text-white cursor-pointer'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>기록 완료</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>기록하기</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 이름 미입력 경고 메시지 */}
                {errorMessage && (
                  <p className="text-xs text-rose-600 font-medium mt-2 flex items-center gap-1">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                {/* 저장 성공 안내 문구 */}
                {isSaved && (
                  <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-900 leading-relaxed">
                    <p className="font-semibold flex items-center gap-1">
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                      성적이 브라우저에 안전하게 보관되었습니다!
                    </p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">
                      (수험생: <strong>{studentName}</strong> | 득점: <strong>{score}점</strong> | 중복 방지를 위해 버튼이 비활성화되었습니다)
                    </p>
                  </div>
                )}
              </div>

              {/* 버튼 그룹 */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setRecordsList(loadRecordsFromStorage());
                    setShowLeaderboard(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded shadow-sm transition-colors cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-100" />
                  <span>🏆 순위 보기 (명예의 전당)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFinished(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#2C2A29] hover:bg-stone-50 text-[#2C2A29] text-xs font-semibold rounded shadow-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>시험지로 문제 검토</span>
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2C2A29] hover:bg-[#151414] text-white text-xs font-semibold rounded shadow transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>다시 하기</span>
                </button>
              </div>
            </section>
          )}

          {/* 시험지 하단 풋터 */}
          <footer className="border-t border-[#DDD5C7] px-6 py-3 bg-[#FAF8F2] flex items-center justify-between text-[11px] text-[#857B6C]">
            <span>중3 눈높이 맞춤 생활 보건 교육 평가원</span>
            <span>배점: 각 문항당 10점</span>
          </footer>
        </main>

        {/* ================= 우측: 현실감 넘치는 OMR 답안지 ================= */}
        <aside className="w-full lg:w-80 shrink-0 bg-[#FFFDF8] border-2 border-[#BE123C] rounded-sm shadow-md overflow-hidden flex flex-col font-mono">
          {/* OMR 상단 타이틀 바 */}
          <div className="bg-[#BE123C] text-white p-3 text-center border-b-2 border-[#9F1239]">
            <div className="text-[10px] tracking-widest opacity-90 font-sans">중학교 정기고시 및 모의평가</div>
            <h2 className="text-base font-black tracking-tight font-sans flex items-center justify-center gap-1.5">
              <span>OMR 답안지 (전산채점용)</span>
            </h2>
            <div className="text-[10px] text-rose-100 flex items-center justify-center gap-1 mt-0.5">
              <span>컴퓨터용 수성사인펜 전용</span>
              <span>•</span>
              <span>수정테이프 사용 불가</span>
            </div>
          </div>

          {/* OMR 카드 서브 안내 (수험 정보) */}
          <div className="bg-[#FFF1F2] px-3 py-2 border-b border-[#FECDD3] text-[11px] text-[#881337] flex items-center justify-between">
            <span className="font-sans font-bold">수험생 마킹 현황판</span>
            <span className="font-mono text-xs bg-white px-2 py-0.5 rounded border border-[#FECDD3]">
              {answeredCount}/10 표기
            </span>
          </div>

          {/* OMR 테이블 헤더 */}
          <div className="bg-[#F8E7E9] text-[#9F1239] text-[11px] font-bold py-1.5 px-3 border-b border-[#FDA4AF] grid grid-cols-12 text-center items-center">
            <div className="col-span-1 text-left text-[9px] text-[#BE123C]">SYNC</div>
            <div className="col-span-3 text-left pl-1">문항</div>
            <div className="col-span-5">답안 마킹</div>
            <div className="col-span-3">채점 결과</div>
          </div>

          {/* OMR 문항 목록 (1~10번) */}
          <div className="divide-y divide-rose-100 bg-[#FFFDF8]">
            {QUESTIONS.map((q, idx) => {
              const ans = userAnswers[idx];
              const isAnswered = ans !== null;
              const isCurrent = currentIndex === idx && !isFinished;
              const isCorrectQ = isAnswered && ans === q.answer;

              return (
                <div
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`grid grid-cols-12 items-center py-2 px-3 text-xs transition-colors cursor-pointer select-none ${
                    isCurrent
                      ? 'bg-amber-100/90 text-amber-950 font-bold ring-2 ring-inset ring-amber-500'
                      : 'hover:bg-rose-50/70 text-[#374151]'
                  }`}
                  title={`${q.id}번 문제로 바로 이동하기`}
                >
                  {/* OMR 좌측 전산 판독용 동기 타이밍 마크 (Black Timing Block) */}
                  <div className="col-span-1 flex items-center">
                    <span className="inline-block w-2.5 h-3.5 bg-black rounded-[1px]"></span>
                  </div>

                  {/* 문항 번호 및 현재 문제 포인터 */}
                  <div className="col-span-3 flex items-center gap-1 font-mono">
                    <span className={`text-xs ${isCurrent ? 'font-extrabold text-[#BE123C]' : 'font-semibold text-zinc-700'}`}>
                      {q.id.toString().padStart(2, '0')}번
                    </span>
                    {isCurrent && (
                      <PenTool className="w-3 h-3 text-[#BE123C] shrink-0 animate-bounce" />
                    )}
                  </div>

                  {/* O / X 마킹 타원 버블 (컴퓨터용 사인펜 스타일) */}
                  <div className="col-span-5 flex items-center justify-center gap-2">
                    {/* O 마킹 타원 */}
                    <div
                      className={`w-6 h-4 rounded-full flex items-center justify-center text-[10px] transition-all border ${
                        ans === true
                          ? 'bg-neutral-900 border-black text-white font-black shadow-sm scale-105'
                          : 'border-[#FDA4AF] bg-white text-[#BE123C] font-semibold'
                      }`}
                    >
                      O
                    </div>

                    {/* X 마킹 타원 */}
                    <div
                      className={`w-6 h-4 rounded-full flex items-center justify-center text-[10px] transition-all border ${
                        ans === false
                          ? 'bg-neutral-900 border-black text-white font-black shadow-sm scale-105'
                          : 'border-[#FDA4AF] bg-white text-[#BE123C] font-semibold'
                      }`}
                    >
                      X
                    </div>
                  </div>

                  {/* 채점 및 상태 표시란 */}
                  <div className="col-span-3 text-center">
                    {!isAnswered ? (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-stone-100 text-stone-500 font-sans border border-stone-200">
                        미응시
                      </span>
                    ) : isCorrectQ ? (
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-600 font-sans">
                        <span>⭕</span>
                        <span>정답</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-600 font-sans">
                        <span>／</span>
                        <span>오답</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* OMR 카드 하단 요약 및 인터랙션 가이드 */}
          <div className="p-3 bg-[#FCFAF5] border-t-2 border-[#BE123C] text-[11px] font-sans flex flex-col gap-2">
            <div className="flex items-center justify-between text-[#44403C]">
              <span className="font-semibold">실시간 득점:</span>
              <span className="font-mono font-black text-sm text-[#BE123C]">
                {score}점 <span className="text-xs text-zinc-500 font-normal">/ 100점</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-zinc-500 text-[10px]">
              <span>정답: {correctCount}개</span>
              <span>오답: {answeredCount - correctCount}개</span>
              <span className="font-semibold text-amber-700">미응시: {10 - answeredCount}개</span>
            </div>

            {/* 안내 팁 박스 */}
            <div className="mt-1 p-2 bg-[#FFF1F2] border border-[#FECDD3] rounded text-[10px] text-[#9F1239] leading-tight flex items-start gap-1.5">
              <span className="text-xs">💡</span>
              <span>
                <strong>클릭 이동 기능:</strong> 번호를 누르면 해당 문제로 바로 이동하여 먼저 풀거나 검토할 수 있습니다.
              </span>
            </div>

            {/* 최종 제출 / 성적표 열기 버튼 */}
            <button
              type="button"
              onClick={() => {
                setShowLeaderboard(false);
                setIsFinished(!isFinished);
              }}
              className="mt-1 w-full py-2 bg-[#BE123C] hover:bg-[#9F1239] text-white text-xs font-bold rounded shadow-sm transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              {showLeaderboard ? (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>시험지 화면으로 돌아가기</span>
                </>
              ) : isFinished ? (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>시험지 화면으로 돌아가기</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{allAnswered ? '최종 채점 성적표 확인' : '현재까지 성적표 확인'}</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
