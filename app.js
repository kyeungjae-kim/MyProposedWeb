// 샘플 후보자 데이터베이스 (상태 관리)
const candidateData = [
  {
    id: 'doc',
    fileName: "홍길동_백엔드개발자_이력서.doc",
    docHtml: `
      <h1>이 력 서</h1>
      <h2>1. 기본 정보</h2>
      <table>
        <tr><th>성명</th><td>홍길동</td><th>생년월일</th><td>1992.05.14 (34세)</td></tr>
        <tr><th>성별</th><td>남성</td><th>연락처</th><td>010-1234-5678</td></tr>
        <tr><th>주소</th><td colspan="3">서울특별시 강남구 테헤란로 123</td></tr>
      </table>
      <h2>2. 주요 경력</h2>
      <p><strong>(주)테크솔루션</strong> (2021.03 ~ 현재) / 차장</p>
      <p>- Spring Boot 기반 대용량 결제 시스템 API 개발</p>
      <p>- MSA 전환 프로젝트 주도 및 AWS cloud 구축</p>
    `,
    aiData: {
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      name: "홍길동",
      age: "34세 (1992년생)",
      gender: "남성",
      address: "서울시 강남구 테헤란로 123",
      careers: [
        { period: "2021.03 ~ 재직중", company: "(주)테크솔루션", role: "차장 / 백엔드 리드", task: "Spring Boot 결제 API 구축, MSA/AWS 전환" },
        { period: "2018.01 ~ 2021.02", company: "(주)에이비씨소프트", role: "대리 / 개발자", task: "Java 백엔드 개발 및 DB 성능 튜닝" }
      ],
      field: "IT / 백엔드 개발",
      applyField: "수석 백엔드 아키텍트",
      careerSummary: "총 7년 경력. Spring Boot 및 AWS 기반 대용량 금융 결제 시스템 구축 경험 보유.",
      etc: "희망 연봉 7,500만 원, 원격근무 선호",
      tags: ["#Java", "#SpringBoot", "#MSA", "#AWS", "#백엔드"]
    }
  },
  {
    id: 'hwp',
    fileName: "김철수_기획자_이력서.hwp",
    docHtml: `
      <h1>이 력 서</h1>
      <p><b>■ 인적사항</b></p>
      <ul><li>성 명: 김철수 (여성, 29세)</li><li>주 소: 경기도 성남시 분당구 판교역로 45</li></ul>
      <h2>■ 경력 사항</h2>
      <table>
        <tr><th>기간</th><th>근무처</th><th>직위</th><th>담당업무</th></tr>
        <tr><td>2022.05~2026.01</td><td>(주)글로벌커머스</td><td>과장</td><td>서비스 기획 및 UX 설계</td></tr>
      </table>
    `,
    aiData: {
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      name: "김철수",
      age: "29세 (1997년생)",
      gender: "여성",
      address: "경기도 성남시 분당구 판교역로 45",
      careers: [
        { period: "2022.05 ~ 2026.01", company: "(주)글로벌커머스", role: "과장 / PO", task: "커머스 UX 설계 및 결제 로직 개선" }
      ],
      field: "서비스 기획 / PO",
      applyField: "이커머스 서비스 총괄 PO",
      careerSummary: "총 5년 경력. 글로벌 커머스 앱 전환율 35% 향상 주도.",
      etc: "비즈니스 영어 가능",
      tags: ["#서비스기획", "#PO", "#Figma", "#GA4", "#UIUX"]
    }
  }
];

// 1. SPA 페이지 라우팅
function switchPage(pageId) {
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  
  document.getElementById(`page-${pageId}`).classList.add('active');
  event.currentTarget.classList.add('active');

  if (pageId === 'resume-list') {
    renderCandidateListTable(candidateData);
  }
}

// 2. 이력서 등록 스플릿 뷰 샘플 로딩
function loadSample(key) {
  const item = candidateData.find(c => c.id === key);
  if (!item) return;

  document.getElementById('current-filename').textContent = item.fileName;
  document.getElementById('doc-html-view').innerHTML = item.docHtml;

  const ai = item.aiData;
  document.getElementById('ai-photo').src = ai.photo;
  document.getElementById('ai-name').textContent = ai.name;
  document.getElementById('ai-age').textContent = ai.age;
  document.getElementById('ai-gender').textContent = ai.gender;
  document.getElementById('ai-address').textContent = ai.address;

  const tbody = document.getElementById('ai-career-tbody');
  tbody.innerHTML = '';
  ai.careers.forEach(c => {
    tbody.innerHTML += `<tr><td><strong>${c.period}</strong></td><td>${c.company}</td><td>${c.role}</td><td>${c.task}</td></tr>`;
  });

  document.getElementById('ai-field').textContent = ai.field;
  document.getElementById('ai-apply-field').textContent = ai.applyField;
  document.getElementById('ai-career-summary').textContent = ai.careerSummary;
  document.getElementById('ai-etc').textContent = ai.etc;

  const tagCloud = document.getElementById('ai-tags');
  tagCloud.innerHTML = '';
  ai.tags.forEach(t => tagCloud.innerHTML += `<span class="tag">${t}</span> `);
}

// 3. 이력서 목록 테이블 렌더링 및 키워드 검색
function renderCandidateListTable(data) {
  const tbody = document.querySelector('#candidate-list-table tbody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const ai = item.aiData;
    const tagsHtml = ai.tags.map(t => `<span class="badge">${t}</span>`).join(' ');
    tbody.innerHTML += `
      <tr>
        <td><strong>${ai.name}</strong></td>
        <td>${ai.gender} / ${ai.age.split(' ')[0]}</td>
        <td>${ai.applyField}</td>
        <td>${ai.careerSummary}</td>
        <td>${tagsHtml}</td>
        <td>
          <button class="btn btn-sample" onclick="openCandidateDetail('${item.id}')">스플릿 보기</button>
        </td>
      </tr>
    `;
  });
}

function searchCandidates() {
  const keyword = document.getElementById('candidate-search').value.toLowerCase();
  const filtered = candidateData.filter(item => {
    const ai = item.aiData;
    return ai.name.toLowerCase().includes(keyword) || 
           ai.field.toLowerCase().includes(keyword) || 
           ai.tags.some(t => t.toLowerCase().includes(keyword));
  });
  renderCandidateListTable(filtered);
}

function openCandidateDetail(id) {
  const navBtn = document.querySelectorAll('.nav-item')[1];
  switchPage('resume-register');
  navBtn.classList.add('active');
  loadSample(id);
}

// 4. Ollama AI 추천 기능 시뮬레이션
function runOllamaRecommendation() {
  const model = document.getElementById('ollama-model-select').value;
  const prompt = document.getElementById('ollama-prompt').value;
  const resultArea = document.getElementById('ollama-result-area');
  const responseBox = document.getElementById('ollama-response-text');

  if (!prompt.trim()) {
    alert('요구 직무 조건 또는 프로젝트 내용을 입력해주세요.');
    return;
  }

  resultArea.style.display = 'block';
  responseBox.textContent = `[${model}] 모델이 DB 내 후보자 매칭 분석 중입니다...`;

  setTimeout(() => {
    responseBox.textContent = `🤖 [Ollama ${model} 인재 매칭 리포트]

🎯 최적 매칭 후보자: 홍길동 (적합도: 96%)

📌 AI 매칭 사유:
1. 입력하신 요구사항('Spring Boot', 'AWS', '백엔드')과 홍길동 후보자의 스펙 태그가 100% 일치합니다.
2. (주)테크솔루션에서 대용량 결제 API 구축 및 MSA 전환을 성공적으로 주도한 7년 경력이 요구 프로젝트 조건에 최적화되어 있습니다.

💡 면접 추천 질문:
- MSA 아키텍처 전환 과정에서 발생한 트래픽 병목 현상 해결 경험
- AWS 환경에서의 결제 데이터 정합성 보장 전략`;
  }, 1200);
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  loadSample('doc');
});