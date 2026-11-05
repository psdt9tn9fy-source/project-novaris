# NOVARIS — design and content decisions

The visual concept is an institutional archive observing a vast architectural model. Charcoal/navy, mineral green, off-white type and thin rules establish a consistent system. The city SVG, N mark and six provisional academy symbols are original project assets.

## Research translated into code

Research reviewed on 2026-11-04; designs and code were not copied.

| Reference | Principle retained | Actual implementation |
| --- | --- | --- |
| [Aten7 / Toom Archives, Immersive Garden](https://immersive-g.com/projects/aten7/) | Treat a fictional world as a navigable archive | CityMap selection, organization and lore reader, indexed information language |
| [Codrops: On-Scroll Typography Animations](https://tympanus.net/Development/OnScrollTypographyAnimations/) | Large type as spatial composition | Condensed display type, staggered opening, offset editorial sections and scroll-linked title motion |
| [Codrops: Expanding Image within Typography](https://tympanus.net/codrops/2024/04/02/on-scroll-expanding-image-animation-within-typography/) | Reveal an image through changing geometry | Discover section clip-path expansion and independently moving city layer |
| [Lenis showcase](https://lenis.darkroom.engineering/) | Consistency between scrolling and layered motion | Native scrolling with GSAP scrub. Lenis was evaluated but omitted to keep mobile scrolling native and dependencies smaller. |

[Awwwards](https://www.awwwards.com/) was reviewed for composition and interaction categories. Specific Siena / Aten7 award-detail pages timed out; their unobserved behavior is not claimed as a reference.

Implementation references: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) and [gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).

## Motion

- Approximately 2.7-second opening: masked letters, scale and split architectural gates; 3.2-second deadline, Skip and Escape. Once per browser tab session; replay from footer.
- Desktop only: opposing hero title/city depth motion, Discover image mask and scroll-driven story emphasis.
- Mobile: no parallax or scroll-driven masking; short section reveals only.
- Reduced motion: no opening, no GSAP scroll sequences, no CSS motion, immediate scroll.
- Hash page navigation, entry transitions, academy symbol transitions and restrained hover treatments.

## Canon boundary

Only the supplied six academy names, council role, genre, coeducation and 20+ character rule are published. English transliterations, codes, colors, symbols and city geometry are provisional interface design, not official lore. No invented population, foundation date, historical event, location or character is presented as canon.

The city is an explicitly labeled conceptual map. Character records start empty. Empty search results and unpublished records remain usable, clearly labeled states.

## Assets and licenses

- Barlow Condensed and Space Grotesk are self-hosted from Fontsource packages under SIL OFL 1.1; the full licenses are distributed in `public/licenses/`.
- Korean text uses the visitor's system Korean font stack.
- GSAP uses its [Standard No Charge License](https://gsap.com/community/standard-license/); this informational website is a permitted use. Bundled source notices remain intact.
- React, Vite and other package licenses are retained through their packages and the lockfile.
- No third-party character, stock photograph, video or copied site artwork is used.
