import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mark } from './Identity';

export function Intro({ finish }: { finish: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.timeline({ onComplete: finish })
        .from('.intro-mark', { scale: .75, autoAlpha: 0, duration: .55, ease: 'power2.out' })
        .from('.intro-word span', { yPercent: 115, stagger: .045, duration: .7, ease: 'power3.out' }, .25)
        .from('.intro-caption', { opacity: 0, y: 8, duration: .4 }, .65)
        .to('.intro-line', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, .15)
        .to('.intro-copy', { scale: 1.08, opacity: 0, duration: .45 }, 1.7)
        .to('.intro-gate.top', { yPercent: -101, duration: .85, ease: 'power3.inOut' }, 1.85)
        .to('.intro-gate.bottom', { yPercent: 101, duration: .85, ease: 'power3.inOut' }, 1.85)
        .to('.intro-skip', { opacity: 0, duration: .2 }, 2.3);
    }, root);
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', escape);
    return () => { context.revert(); window.removeEventListener('keydown', escape); };
  }, [finish]);

  return <div ref={root} className="intro" role="dialog" aria-modal="true" aria-label="노바리스 오프닝">
    <div className="intro-gate top" /><div className="intro-gate bottom" />
    <div className="intro-copy"><Mark className="intro-mark" /><p className="eyebrow intro-caption">PROJECT / NOVARIS</p><div className="intro-word" aria-label="NOVARIS">{'NOVARIS'.split('').map((letter, i) => <span key={i} aria-hidden="true">{letter}</span>)}</div><p className="intro-caption intro-korean">당신의 이야기가 시작될 도시.</p><div className="intro-line" /></div>
    <button className="intro-skip text-button" onClick={finish} autoFocus>SKIP INTRO <span>↗</span></button>
  </div>;
}
