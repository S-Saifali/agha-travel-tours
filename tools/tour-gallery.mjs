// Past-projects "tour journal" for the Group Tours page.
// Photos live in images/china-tours (resized from the client's originals); w/h are the saved pixel sizes.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const chapters = [
  { n: '01', title: 'City Skyline', blurb: 'Where the trip began: the Shanghai skyline and old-town streets.', photos: [
    { f: '01', w: 1050, h: 1400, cap: 'Skyline crew', alt: 'Group of travellers standing on a Shanghai street with the Oriental Pearl Tower behind them' },
    { f: '02', w: 1050, h: 1400, cap: 'Old Shanghai', alt: 'Group photo in front of traditional red-and-gold Chinese buildings in Shanghai' },
    { f: '03', w: 1400, h: 788, cap: 'Pakistan flag at the Bund', alt: 'Group holding a Pakistan flag on the Shanghai waterfront with the skyline behind' },
    { f: '11', w: 788, h: 1400, cap: 'Stroll along the Bund', alt: 'Two travellers on the Shanghai waterfront promenade with the Oriental Pearl Tower behind' },
  ] },
  { n: '02', title: 'On the Move', blurb: 'Terminals, flags and a comfortable ride on the high-speed train.', photos: [
    { f: '04', w: 1050, h: 1400, cap: 'Flags at the terminal', alt: 'Group with Chinese, Agha Travel & Tours and Pakistani flags in a modern terminal hall' },
    { f: '05', w: 1050, h: 1400, cap: 'High-speed rail ride', alt: 'Travellers seated in a high-speed train carriage' },
    { f: '12', w: 1050, h: 1400, cap: 'Ready to roll', alt: 'Group with luggage and three flags inside the terminal' },
    { f: '13', w: 1050, h: 1400, cap: 'One more for the album', alt: 'Second group photo with flags and luggage in the terminal hall' },
  ] },
  { n: '03', title: 'Into the Greenery', blurb: 'Waterfalls, forest views and a walk across a glass bridge.', photos: [
    { f: '06', w: 1050, h: 1400, cap: 'Waterfall photo stop', alt: 'Group holding Chinese, Agha Travel & Tours and Pakistani flags in front of a waterfall' },
    { f: '07', w: 1050, h: 1400, cap: 'Glass bridge walk', alt: 'Group with flags on a glass walkway above a forested valley' },
    { f: '08', w: 960, h: 1280, cap: 'Three flags, one group', alt: 'Three travellers holding the Chinese, Pakistani and Agha Travel & Tours flags by a waterfall' },
    { f: '09', w: 960, h: 1280, cap: 'A quiet moment by the falls', alt: 'Traveller posing beside a waterfall and wooden railing' },
    { f: '10', w: 960, h: 1280, cap: 'Big flag, big smile', alt: 'Traveller holding the Chinese flag in front of a waterfall' },
  ] },
];

const total = chapters.reduce((s, c) => s + c.photos.length, 0);

const polaroid = (p, i) => `          <figure class="tj-pol" data-aos="fade-up" data-aos-delay="${(i % 3) * 120}">
            <button type="button" class="tj-open" data-full="images/china-tours/tour-${p.f}.jpg" data-cap="${esc(p.cap)}" data-alt="${esc(p.alt)}" aria-label="Open photo: ${esc(p.cap)}">
              <img src="images/china-tours/tour-${p.f}.jpg" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" loading="lazy">
              <figcaption>${esc(p.cap)}</figcaption>
            </button>
          </figure>`;

const chapter = (c) => `      <section class="tj-chapter" aria-label="Chapter ${c.n}: ${c.title}">
        <header class="tj-chap-head" data-aos="fade-up">
          <span class="tj-num">${c.n}</span>
          <div><h3>${c.title}</h3><p>${c.blurb}</p></div>
        </header>
        <div class="tj-board">
${c.photos.map(polaroid).join('\n')}
        </div>
      </section>`;

export const tourJournal = () => `
      <div class="tj-head">
        <div class="tj-stamp" aria-hidden="true"><span>China</span><b>Group Tour</b><span>Sep 2026</span></div>
        <div>
          <span class="eyebrow"><i class="fa-solid fa-clock-rotate-left"></i> Past Projects</span>
          <h2>China — Past Group Tours</h2>
          <p>A look back at our China group tour: ${total} moments from the road, in the order they happened. Tap any photo to see it full size.</p>
        </div>
      </div>
${chapters.map(chapter).join('\n')}
      <div class="tj-foot" data-aos="fade-up">
        <p>Want to be in the next album?</p>
        <button type="button" class="btn btn-dark" data-goto="gt-active"><i class="fa-solid fa-bolt"></i> See Active Projects</button>
      </div>`;

export const lightbox = `
<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button type="button" class="lb-close" aria-label="Close photo viewer"><i class="fa-solid fa-xmark"></i></button>
  <button type="button" class="lb-nav lb-prev" aria-label="Previous photo"><i class="fa-solid fa-chevron-left"></i></button>
  <figure class="lb-fig"><img src="" alt=""><figcaption></figcaption></figure>
  <button type="button" class="lb-nav lb-next" aria-label="Next photo"><i class="fa-solid fa-chevron-right"></i></button>
  <span class="lb-count" aria-live="polite"></span>
</div>`;
