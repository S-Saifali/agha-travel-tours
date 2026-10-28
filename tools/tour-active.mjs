// Active project: China Tourism & Business Group Tour 2026 (content supplied by the client).
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const facts = [
  ['fa-location-dot', 'Destinations', 'Shanghai & Guangzhou, China'],
  ['fa-calendar-days', 'Departure', '3rd week of November 2026'],
  ['fa-moon', 'Duration', '7 Days / 6 Nights'],
  ['fa-plane-departure', 'Departure city', 'Islamabad, Pakistan'],
  ['fa-plane', 'Airline', 'China Southern Airlines'],
  ['fa-hotel', 'Accommodation', '4-star hotels'],
];

const highlights = [
  ['fa-city', 'Shanghai’s Bund & Yu Garden', 'Stroll the iconic Bund waterfront and the historic Yu Garden.'],
  ['fa-tower-observation', 'Canton Tower', 'See the magnificent Canton Tower and Guangzhou’s famous attractions.'],
  ['fa-mountain-sun', 'Gulong Gorge adventure', 'Waterfalls, glass bridges, skywalks and rafting in one unforgettable day.'],
  ['fa-landmark', 'Chinese culture', 'Chen Clan Ancestral Hall and Yuexiu Park.'],
  ['fa-store', 'Wholesale markets', 'Business opportunities, shopping and product sourcing in Guangzhou.'],
  ['fa-language', 'Bilingual guidance', 'Professional bilingual tour guides and China-based business assistance.'],
];

const days = [
  { d: 1, city: 'Shanghai', title: 'Arrival & first evening', text: 'Arrival in China, transfer to Shanghai, hotel check-in and evening exploration.' },
  { d: 2, city: 'Shanghai', title: 'The Bund & Yu Garden', text: 'Shanghai sightseeing, including The Bund, Yu Garden, and local shopping.', img: 'images/china-tours/tour-03.jpg', imgAlt: 'Travellers on the Shanghai waterfront with the skyline behind' },
  { d: 3, city: 'Guangzhou', title: 'Fly to Guangzhou', text: 'Domestic flight to Guangzhou, hotel check-in and evening city exploration.' },
  { d: 4, city: 'Guangzhou', title: 'Gulong Gorge adventure', text: 'Full-day Gulong Gorge adventure featuring waterfalls, glass skywalk, Buddha Palm, and rafting.', img: 'images/china-tours/tour-07.jpg', imgAlt: 'Group on a glass walkway above a forested gorge' },
  { d: 5, city: 'Guangzhou', title: 'Heritage & Canton Tower', text: 'Guangzhou sightseeing, including Chen Clan Ancestral Hall, Yuexiu Park, and Canton Tower.', img: 'CANTON', imgAlt: 'Canton Tower lit up at night in Guangzhou' },
  { d: 6, city: 'Guangzhou', title: 'Business market day', text: 'Business market visits, wholesale shopping, product sourcing, and supplier guidance.' },
  { d: 7, city: 'Home', title: 'Return to Pakistan', text: 'Hotel check-out and return flight to Pakistan.' },
];

const included = [
  'Return international air tickets',
  'China tourist visa',
  'Shanghai–Guangzhou domestic flight',
  '6 nights in 4-star hotels (2 nights Shanghai, 4 nights Guangzhou)',
  'Daily breakfast and halal dinner',
  'Private air-conditioned transportation',
  'Airport transfers and guided sightseeing',
  'Attraction entrance tickets as per itinerary',
  'Chinese bilingual tour guide',
  'Travel SIM and paid VPN',
  'Business market guidance, supplier introductions, and sourcing assistance',
];
const excluded = ['Lunch', 'Personal shopping', 'Laundry services', 'Activities not mentioned in the itinerary'];

export const tourActive = ({ photo, wa, cantonId }) => {
  const book = wa('Hello Agha Travel & Tours, I would like to book the China Tourism & Business Group Tour (November 2026).');
  const day = (x) => `          <li class="ta-day" data-aos="fade-up">
            <span class="ta-dnum"><small>Day</small>${x.d}</span>
            <div class="ta-dcard">
              ${x.img ? `<img class="ta-dimg" src="${x.img === 'CANTON' ? photo(cantonId, 700) : x.img}" alt="${esc(x.imgAlt)}" loading="lazy">` : ''}
              <div class="ta-dbody">
                <span class="ta-city ta-city-${x.city.toLowerCase()}">${x.city}</span>
                <h4>${esc(x.title)}</h4>
                <p>${esc(x.text)}</p>
              </div>
            </div>
          </li>`;
  return `
      <div class="ta-ticket" data-aos="fade-up">
        <div class="ta-main">
          <span class="eyebrow china-eyebrow"><i class="fa-solid fa-bolt"></i> Active Project · Now Booking</span>
          <h2>China Tourism &amp; Business <span>Group Tour 2026</span></h2>
          <p class="ta-sub">Explore Shanghai &amp; Guangzhou with Agha Travel &amp; Tours</p>
          <div class="ta-route" aria-label="Route: Islamabad, Shanghai, Guangzhou, back to Islamabad">
            <span class="ta-stop"><b>ISB</b><small>Islamabad</small></span>
            <span class="ta-line"><i class="fa-solid fa-plane"></i></span>
            <span class="ta-stop"><b>SHA</b><small>Shanghai</small></span>
            <span class="ta-line"><i class="fa-solid fa-plane"></i></span>
            <span class="ta-stop"><b>CAN</b><small>Guangzhou</small></span>
            <span class="ta-line back"><i class="fa-solid fa-plane"></i></span>
            <span class="ta-stop"><b>ISB</b><small>Home</small></span>
          </div>
        </div>
        <div class="ta-stub">
          <span class="ta-seats"><i class="fa-solid fa-fire"></i> Limited group seats</span>
          <small>Package price</small>
          <div class="ta-price"><span>PKR</span>645,000</div>
          <small>per person</small>
          <a href="${book}" target="_blank" class="btn btn-wa"><i class="fa-brands fa-whatsapp"></i> Book Your Seat</a>
        </div>
      </div>

      <p class="ta-intro" data-aos="fade-up">Discover the best of China with our exclusive 7-day Tourism &amp; Business Group Tour. Experience the breathtaking skyline of Shanghai, explore Guangzhou’s cultural landmarks, enjoy thrilling adventures at Gulong Gorge, and discover exciting business and shopping opportunities in China’s wholesale markets. Whether you’re a travel enthusiast, entrepreneur, or business professional, this carefully organized tour offers the perfect combination of sightseeing, adventure, comfort, and business networking.</p>

      <div class="ta-facts" data-aos="fade-up">
${facts.map(([ic, l, v]) => `        <div class="ta-fact"><span class="ic"><i class="fa-solid ${ic}"></i></span><div><small>${l}</small><b>${v}</b></div></div>`).join('\n')}
      </div>

      <h3 class="ta-h" data-aos="fade-up"><span>01</span> Tour Highlights</h3>
      <div class="ta-hl">
${highlights.map(([ic, t, p]) => `        <div class="ta-hlcard" data-aos="fade-up"><span class="ic"><i class="fa-solid ${ic}"></i></span><h4>${esc(t)}</h4><p>${esc(p)}</p></div>`).join('\n')}
      </div>

      <h3 class="ta-h" data-aos="fade-up"><span>02</span> 7-Day Itinerary</h3>
      <ol class="ta-days">
${days.map(day).join('\n')}
      </ol>

      <h3 class="ta-h" data-aos="fade-up"><span>03</span> What’s Included</h3>
      <div class="ta-inc">
        <div class="ta-inc-yes" data-aos="fade-up">
          <h4><i class="fa-solid fa-circle-check"></i> Package Inclusions</h4>
          <ul>
${included.map((t) => `            <li><i class="fa-solid fa-check"></i> ${esc(t)}</li>`).join('\n')}
          </ul>
        </div>
        <div class="ta-inc-no" data-aos="fade-up">
          <h4><i class="fa-solid fa-circle-xmark"></i> Exclusions</h4>
          <ul>
${excluded.map((t) => `            <li><i class="fa-solid fa-xmark"></i> ${esc(t)}</li>`).join('\n')}
          </ul>
        </div>
      </div>

      <div class="ta-why" data-aos="fade-up">
        <h3>Why Choose Agha Travel &amp; Tours?</h3>
        <p>With proven experience in organizing international group tours, Agha Travel &amp; Tours provides professionally planned itineraries, quality accommodation, comfortable transportation, visa assistance, and dedicated customer support. Our experienced team and China-based business guides ensure a smooth, enjoyable, and rewarding travel experience.</p>
      </div>

      <div class="ta-book" data-aos="zoom-in">
        <div>
          <span class="ta-seats"><i class="fa-solid fa-fire"></i> Limited group seats</span>
          <h3>Book Your China Adventure Today!</h3>
          <p>Contact us for booking and availability. Experience China like never before: travel, explore, connect, and grow.</p>
        </div>
        <div class="ta-book-actions">
          <a href="${book}" target="_blank" class="cv-cta-wa"><span class="ic"><i class="fa-brands fa-whatsapp"></i></span><span><small>Chat to book</small><b>+92 300 3848172</b></span><i class="fa-solid fa-arrow-right go"></i></a>
          <a href="tel:+923003848172" class="cv-cta-call"><span class="ic"><i class="fa-solid fa-phone"></i></span><span><small>Call us</small><b>+92 300 3848172</b></span></a>
          <p class="ta-addr"><i class="fa-solid fa-location-dot"></i> Office No. 19, 2nd Floor, Twin City Plaza, I-8 Markaz, Islamabad<br><i class="fa-solid fa-globe"></i> www.aghatravelandtours.com</p>
        </div>
      </div>`;
};
