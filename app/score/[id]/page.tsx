"use client";
import { Header } from "@/app/component/header";
import { RefreshIcon } from "@/app/icons/refreshIcon";
import { RightIcon } from "@/app/icons/rightIcon";
import { SaveIcon } from "@/app/icons/saveIcon";
import { StarIcon } from "@/app/icons/starIcon";
import { WrongIcon } from "@/app/icons/wrongIcon";
import { SideBar } from "@/app/component/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type Quiz = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};
type Article = {
  id: string;
  title: string;
  content: string;
  summary: string;
  userId: string;
};
export default function Home() {
  const { id } = useParams();
  const articleId = id;
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [summary, setSummary] = useState<Article | null>(null);
  const [finished, setFinished] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [answered, setAnswered] = useState(false);
  const handleQuiz = () => {
    router.push(`/quiz/${id}`);
  };
  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/article?userId=${id}`);
      if (!res.ok) throw new Error("Failed to fetch history");

      const data = await res.json();

      const filteredData = data.articles?.filter((item: any) => item.id == id);
      if (filteredData.length > 0) {
        setSummary(filteredData[0]);
      } else {
        console.warn("no matching");
      }
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };
  useEffect(() => {
    if (!id) return;
    fetchHistory();
  }, [id]);
  useEffect(() => {
    if (!summary?.id) return;
    const fetchQuiz = async () => {
      const res = await fetch(`/api/generated/${summary.id}`);
      const data = await res.json();
      setQuizzes(data);
      console.log(data, "haah");
    };
    fetchQuiz();
  }, [summary?.id]);
  const handleAnswer = (selected: string) => {
    if (answered) return;
    setAnswered(true);
    if (
      selected.trim().toLowerCase() ===
      quizzes[current].answer.trim().toLowerCase()
    ) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers((prev) => [...prev, selected]);
    setTimeout(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        if (next >= quizzes.length) {
          setFinished(true);
          return prev;
        }
        setAnswered(false);
        return next;
      });
    }, 300);
  };
  useEffect(() => {
    console.log("current:", current, "finished:", finished, "score:", score);
  }, [current, finished, score]);
  const saveQuiz = async () => {
    try {
      const res = await fetch("/api/quizResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: summary?.userId,
          quizId: summary?.id,
          totalScore: score,
        }),
      });
    } catch (err) {
      console.error("Save quiz failed", err);
    }
  };
  return (
    <div className="w-full bg-gray-100">
      <Header />
      <div className="flex max-w-screen-2xl w-full ">
        <SideBar />
        {!finished && quizzes.length > 0 && (
          <div className="flex-1 bg-gray-100 flex items-start py-14 px-6 justify-center ">
            <div className="w-[558px] h-72 flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="flex items-center gap-3 text-[24px] font-semibold">
                  <StarIcon /> Quick test
                </p>
                <button
                  className="w-10 h-10 flex justify-center items-center border border-gray-200 rounded-lg"
                  onClick={() => setOpen(true)}
                >
                  x
                </button>
                {open && (
                  <div className="flex fixed inset-0 z-1  w-full h-full justify-center items-center">
                    <div className="w-[422px] h-40 bg-white rounded-lg flex justify-center items-center flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl">Are you sure?</p>
                        <p className="text-[#B91C1C] text-sm">
                          If you press 'Cancel', this quiz will restart from the
                          beginning.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="bg-black text-white flex justify-center items-center rounded-lg h-10 w-[179px]  "
                          onClick={() => setOpen(false)}
                        >
                          Go back
                        </button>
                        <button
                          className="border border-gray-200 flex justify-center items-center rounded-lg h-10 w-[179px]"
                          onClick={handleQuiz}
                        >
                          Cancel quiz
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[#71717a] font-medium text-base">
                Take a quick test about your knowledge from your content
              </p>
              <div className="w-[578px] min-h-[220px] rounded-lg border border-gray-200 flex items-center">
                <div className="flex flex-col gap-4 p-5 w-full ">
                  <div className="flex justify-between ">
                    <p className="font-medium text-lg w-[498px] ">
                      {quizzes[current]?.question}
                    </p>
                    <p className="text-lg ">
                      {current + 1}
                      <span className="text-gray-500"> / {quizzes.length}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {quizzes[current].options.map((cur, index) => (
                      <button
                        key={index}
                        disabled={answered}
                        className={`w-[243px] min-h-10 rounded-lg border   ${
                          answered
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleAnswer(cur)}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {finished && (
          <div className=" flex-1 flex items-start py-14 px-6 w-[1980px] justify-center">
            <div className="w-[428px] min-h-[616px] flex flex-col gap-4">
              <p className="flex gap-3 items-center font-bold text-2xl ">
                <StarIcon /> Quiz completed
              </p>
              <p className="text-[#71717a] text-base font-medium">
                Lets see what you did
              </p>
              <div className=" border-gray-200 border rounded-lg flex flex-col gap-3 w-[428px] min-h-[578px] p-5">
                <p className="font-bold text-2xl">
                  Your score : {score}
                  <span>/{quizzes.length}</span>
                </p>
                <div className="flex flex-col gap-2">
                  {quizzes.map((q, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect =
                      userAnswer?.trim().toLowerCase() ===
                      q.answer.trim().toLowerCase();

                    return (
                      <div key={q.id} className="flex gap-3 items-start">
                        <div className="w-6 h-6">
                          {isCorrect ? <RightIcon /> : <WrongIcon />}
                        </div>
                        <div className="text-[#71717a]">
                          <p>
                            {index + 1}. {q.question}
                          </p>
                          <p className="text-black">
                            Your answer: {userAnswer ?? "No answer"}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-500">
                              Correct: {q.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 mt-5">
                  <button
                    className="w-44 h-10 border border-gray-200 flex justify-center items-center rounded-lg gap-2"
                    onClick={() => {
                      setCurrent(0);
                      setScore(0);
                      setUserAnswers([]);
                      setFinished(false);
                      setAnswered(false);
                    }}
                  >
                    <RefreshIcon /> Restart quiz
                  </button>
                  <button
                    className="w-44 h-10 bg-black  flex justify-center items-center text-white rounded-lg gap-2"
                    onClick={saveQuiz}
                  >
                    <SaveIcon /> Save and leave
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
