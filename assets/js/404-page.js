function render404Page(container) {
  container.innerHTML = `
    <div class="error-page">
      <div class="error-code">404</div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <a href="/" class="back-link">홈으로 돌아가기</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('error-page-root');
  if (!root) return;
  render404Page(root);
});
