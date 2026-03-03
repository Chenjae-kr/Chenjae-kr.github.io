import './styles.css'
import FuzzyText from './components/FuzzyText'

export default function App() {
  return (
    <div className="error-page">
      <FuzzyText
        className="error-code-fuzzy"
        fontSize="clamp(3.5rem, 12vw, 7rem)"
        fontWeight={900}
        color="rgba(99, 102, 241, 0.95)"
        baseIntensity={0.12}
        hoverIntensity={0.35}
        fuzzRange={18}
        fps={45}
        direction="horizontal"
        transitionDuration={120}
        glitchMode
        glitchInterval={2600}
        glitchDuration={140}
      >
        404
      </FuzzyText>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <a href="/" className="back-link">홈으로 돌아가기</a>
    </div>
  )
}
