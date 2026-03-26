const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// 환경변수(혹은 firebase secrets)에서 로드함을 가정합니다.
const GOOGLE_SPACE_WEBHOOK_URL = process.env.GOOGLE_SPACE_WEBHOOK_URL;
const STIBEE_API_KEY = process.env.STIBEE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 1. 리드 생성 트리거: Firestore "leads/{id}" 추가 시 이벤트 발동
exports.onLeadCreate = onDocumentCreated("leads/{id}", async (event) => {
  const snap = event.data;
  if (!snap) return;

  const data = snap.data();
  const email = data.email || "알 수 없음";
  const company = data.company || "알 수 없음";
  const name = data.name || "알 수 없음";
  const eventSize = data.attendeeSize || data.eventSize || "알 수 없음";

  // 1-1. Google Space 알림 발송
  if (GOOGLE_SPACE_WEBHOOK_URL) {
    try {
      await axios.post(GOOGLE_SPACE_WEBHOOK_URL, {
        text: `🔥 [신규 리드 수집]\n이름: ${name}\n회사: ${company}\n행사 규모: ${eventSize}\n이메일: ${email}`
      });
      console.log("Google Space 알림 발송 성공");
    } catch (error) {
      console.error("Google Space 알림 발송 실패:", error.message);
    }
  }

  // 1-2. Stibee 구독자 추가 연결
  const listId = process.env.STIBEE_LIST_ID;
  if (STIBEE_API_KEY && listId) {
    try {
      await axios.post(`https://api.stibee.com/v1/lists/${listId}/subscribers`, {
        subscribers: [{ email: email, name: name }]
      }, {
        headers: {
          "AccessToken": STIBEE_API_KEY,
          "Content-Type": "application/json"
        }
      });
      console.log("Stibee 리스트에 구독자 등록 완료");
    } catch (error) {
      console.error("Stibee API 에러:", error.response?.data || error.message);
    }
  }
});

// 2. 관리자 뷰/클라이언트 호출용 Gemini 콘텐츠 자동 생성 엔진 (Callable)
exports.generateContent = onCall(async (request) => {
  const { summary } = request.data;
  if (!summary) {
    throw new HttpsError("invalid-argument", "요약(summary) 텍스트가 필요합니다.");
  }
  if (!GEMINI_API_KEY) {
    throw new HttpsError("internal", "GEMINI_API_KEY 누락");
  }

  const prompt = `다음 NotebookLM 요약을 기반으로 B2B 마케팅용 단일 소스 멀티유즈(OSMU) 콘텐츠를 작성해주세요.
반드시 아래 JSON 포맷을 유지하여 응답해야 합니다 (마크다운 포맷팅 제외, 순수 JSON만 반환).

[요약/분석 정보]
${summary}

[출력 JSON 구조]
{
  "newsletter": "이메일 뉴스레터에 사용될 3~4문장 분량의 짧고 후킹한 텍스트",
  "blog": "자세한 서론/본론/결론과 Call-to-action을 포함한 장문의 블로그 기고문",
  "pdf": "문서화를 위해 핵심 요점과 논리만 뼈대로 남긴 목차 기반의 구조적 요약"
}`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json" // Gemini-1.5 JSON 모드
        }
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const textResult = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResult) throw new Error("분석 응답 없음");
    
    return JSON.parse(textResult);
  } catch (error) {
    console.error("Gemini API 호출 에러:", error.response?.data || error.message);
    throw new HttpsError("internal", "Gemini 모델 처리에 실패했습니다.");
  }
});
