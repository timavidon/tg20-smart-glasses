import MobileNavigation from "./mobile-navigation";
import { BackToTop, HeaderDownloads, SiteImageLightbox } from "./site-interactions";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: "eager" | "lazy";
  className?: string;
};

function ZoomableImage({ src, alt, width, height, loading, className }: ZoomableImageProps) {
  return (
    <img
      className={`zoomable-image${className ? ` ${className}` : ""}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      data-zoomable
      role="button"
      tabIndex={0}
      aria-label={`פתיחת ${alt} בגודל מלא`}
    />
  );
}

const snapshot = [
  ["משך", "כחודשיים"],
  ["צוות", "הובלתי לצד שותף"],
  ["תפקיד", "הובלה ותוכנה"],
  ["תחומים", "BLE · OLED · אופטיקה"],
];

const requirements = [
  ["קלט מדידה", "קבלת המדידה ממולטימטר תומך Bluetooth", "OWON B41T עם BLE 4.0"],
  ["תקשורת", "תאימות לפרוטוקול האלחוטי של המולטימטר", "HM-11 במצב Central, חיבור באמצעות פקודות AT"],
  ["עיבוד", "פענוח סוג מדידה, מצב, סימן, קנה־מידה וערך", "מפענח למסגרת קבועה בת 6 בתים"],
  ["תצוגה", "הצגת הערך ללא מעבר מבט לצג המולטימטר", "OLED ‏128×64 באמצעות I²C"],
  ["אופטיקה", "תמונה מוגדלת ומשוקפת מול העין", "מראה, עדשת Fresnel בהגדלה ×4 ומחזיר שקוף"],
  ["עלות", "פתרון ממוקד וזול ביחס למשקפי AR, VR ו־MR כלליים", "עלות אב־טיפוס: כ־₪230"],
];

const decisions = [
  {
    label: "בקר",
    selected: "Arduino Micro",
    reason: "קטן, מוכר וכולל UART לקליטת הנתונים.",
  },
  {
    label: "תצוגה",
    selected: "OLED ‏128×64",
    reason: "קומפקטי, מתחבר ב־I²C ודורש מעט חיווט.",
  },
  {
    label: "תקשורת",
    selected: "HM-11",
    reason: "תואם ל־BLE 4.0 ופועל במצב Central.",
  },
  {
    label: "אופטיקה",
    selected: "מראה → Fresnel ×4 → מחזיר שקוף",
    reason: "מגדיל את התמונה בלי לחסום את שדה הראייה.",
  },
  {
    label: "הזנה",
    selected: "סוללת 9V",
    reason: "נבחרה כי לא הצלחתי להשיג סוללת ליתיום קטנה ונטענת.",
  },
];

const validation = [
  ["חיבור BLE", "קבלת נתונים מהמולטימטר", "הודעת OK+CONN וזרם נתונים ב־9600 baud"],
  ["מבנה מסגרת", "זיהוי עקבי של חבילת המדידה", "מסגרת חוזרת בת 6 בתים"],
  ["פענוח ערך", "סימן, יחידה ומיקום נקודה עשרונית", "תועדו דוגמאות: 0.0024V, ‏11.640V, ‏−9.628V"],
  ["תצוגה אופטית", "קריאת הנתון מול העין", "הנתון הוצג דרך המערך האופטי באור יום ובחושך"],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">דלג לתוכן הראשי</a>

      <header className="site-header">
        <nav className="nav-shell" aria-label="ניווט ראשי">
          <a className="brand" href="#top" aria-label="TG-20 — חזרה לראש העמוד">
            <strong className="brand-wordmark" dir="ltr">TG-<span>20</span></strong>
          </a>
          <div className="nav-links" aria-label="קישורים בעמוד">
            <a href="#overview">בקצרה</a>
            <a href="#problem">הבעיה</a>
            <a href="#architecture">ארכיטקטורה</a>
            <a href="#decisions">החלטות</a>
            <a href="#validation">בדיקות</a>
            <a href="#prototype">תיעוד</a>
            <a href="#contact">קשר</a>
          </div>
          <HeaderDownloads />
          <MobileNavigation />
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid page-shell">
            <div className="hero-copy reveal">
              <p className="eyebrow">פרויקט גמר · הנדסאי אלקטרוניקה ומחשבים</p>
              <h1>
                <span className="model-name" dir="rtl">TG-20</span>
                <span className="product-name">משקפיים חכמים</span>
              </h1>
              <p className="hero-lead">
                משקפיים חכמים שמציגים בזמן אמת מתח, זרם והתנגדות ישירות בשדה הראייה,
                כדי לעבוד במעבדה בלי להסיט את המבט אל מסך הרב־מודד.
              </p>
              <div className="author-line">
                <div><strong>טימוטי אבידון</strong><span>בוגר הנדסאי אלקטרוניקה ומחשבים מאורט בראודה כרמיאל</span></div>
              </div>
              <div className="hero-actions">
                <a className="button secondary" href="/resume.pdf" download>
                  <span className="button-icon" aria-hidden="true" dir="ltr">PDF</span>
                  <span className="button-copy"><strong>הורדת קורות חיים</strong><small>הורדת קובץ PDF</small></span>
                </a>
                <a className="button secondary" href="/project-book.pdf" download>
                  <span className="button-icon" aria-hidden="true" dir="ltr">PDF</span>
                  <span className="button-copy"><strong>הורדת ספר הפרויקט</strong><small>הורדת קובץ PDF</small></span>
                </a>
              </div>
            </div>

            <figure className="hero-visual reveal">
              <div className="image-frame">
                <ZoomableImage
                  className="hero-zoomable-image"
                  src="/tg20-hero.webp"
                  alt="אב־טיפוס משקפי TG-20 על רקע לבן"
                  width={1448}
                  height={1086}
                  loading="eager"
                />
              </div>
              <figcaption>
                <span>אב־טיפוס סופי</span>
                <span>Arduino · BLE · OLED · I²C · אופטיקה ואינטגרציה</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section snapshot" id="overview" aria-labelledby="snapshot-title">
          <div className="page-shell snapshot-layout">
            <div className="section-heading compact snapshot-intro">
              <p className="eyebrow">01 · בקצרה</p>
              <h2 id="snapshot-title">הפרויקט בקצרה</h2>
              <p>אב־טיפוס למשקפיים חכמים שמציג נתוני רב־מודד מול העין בזמן אמת.</p>
            </div>
            <dl className="snapshot-grid">
              {snapshot.map(([term, value]) => (
                <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" id="problem" aria-labelledby="problem-title">
          <div className="page-shell split-intro">
            <div className="section-heading sticky-copy">
              <p className="eyebrow">02 · הבעיה והדרישות</p>
              <h2 id="problem-title">למדוד את הנתונים ולראות ישירות את נתוני המדידה</h2>
              <p>
                במדידת PCB או איתור תקלה, הטכנאי מחזיק שני קצות בדיקה על נקודות קטנות ובמקביל
                צריך לקרוא את צג המולטימטר. מעבר המבט עלול לשבור את רצף העבודה, להזיז את הקצוות
                ולייצר קריאה לא מתאימה.
              </p>
              <div className="scenario-note">
                <span>תרחיש הפעלה</span>
                <p>בדיקה במעבדה: ידיים על הפרובים, מבט על המעגל, ערך המדידה מוצג בשדה הראייה.</p>
              </div>
            </div>
            <div className="requirements-wrap">
              <div className="constraints">
                <h3>אילוצי התכן</h3>
                <ul>
                  <li>המשקפיים החכמים לבישים, לכן חשובים הנוחות, המשקל וההתאמה למרכיבי משקפיים.</li>
                  <li>המולטימטר משדר באמצעות Bluetooth BLE 4.0, ונדרש לפענח את הנתונים.</li>
                  <li>OLED קטן שדורש הגדלה וכיוון אופטי לעיניים.</li>
                  <li>מקור מתח נייד וחיווט שניתן לשלב במסגרת קטנה.</li>
                </ul>
              </div>
              <div className="table-scroll requirements-table" role="region" aria-label="טבלת דרישות" tabIndex={0}>
                <table>
                  <caption>דרישות מערכת והפתרון שנבחר</caption>
                  <thead><tr><th>תחום</th><th>דרישה</th><th>מימוש</th></tr></thead>
                  <tbody>
                    {requirements.map(([area, requirement, implementation]) => (
                      <tr key={area}>
                        <td data-label="תחום">{area}</td>
                        <td data-label="דרישה">{requirement}</td>
                        <td data-label="מימוש">{implementation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section architecture-section" id="architecture" aria-labelledby="architecture-title">
          <div className="page-shell">
            <div className="section-heading centered">
              <p className="eyebrow">03 · ארכיטקטורת המערכת</p>
              <h2 id="architecture-title">מהמדידה אל שדה הראייה</h2>
              <p>הארכיטקטורה מפרידה בין מקור המדידה, שכבת התקשורת והפענוח, לבין שרשרת התצוגה האופטית.</p>
            </div>

            <div className="system-diagram" aria-label="זרימת המדידה והתצוגה במערכת TG-20">
              <section className="flow-lane" aria-label="שלבי זרימת המדידה והתצוגה">
                <ol className="flow-steps">
                  <li className="flow-step">
                    <span className="flow-step-number">01</span>
                    <div className="flow-step-copy"><strong>נקודות בדיקה</strong><small>הפרובים נוגעים במעגל</small></div>
                  </li>
                  <li className="flow-step">
                    <span className="flow-step-number">02</span>
                    <div className="flow-step-copy"><strong>OWON B41T</strong><small>מודד מתח, זרם או התנגדות</small></div>
                  </li>
                  <li className="flow-step">
                    <span className="flow-step-number">03</span>
                    <div className="flow-step-copy"><strong>HM-11</strong><small>קולט את הנתונים דרך BLE 4.0</small></div>
                  </li>
                  <li className="flow-step">
                    <span className="flow-step-number">04</span>
                    <div className="flow-step-copy"><strong>Arduino Micro</strong><small>מפענח מסגרת של 6 בתים</small></div>
                  </li>
                  <li className="flow-step optical-step">
                    <span className="flow-step-number">05</span>
                    <div className="flow-step-copy"><strong>OLED 128×64</strong><small>מציג את תוצאת המדידה</small></div>
                  </li>
                  <li className="flow-step optical-step">
                    <span className="flow-step-number">06</span>
                    <div className="flow-step-copy"><strong>מראת החזרה</strong><small>מכוונת את התמונה קדימה</small></div>
                  </li>
                  <li className="flow-step optical-step">
                    <span className="flow-step-number">07</span>
                    <div className="flow-step-copy"><strong>עדשת Fresnel ×4</strong><small>מגדילה את התמונה</small></div>
                  </li>
                  <li className="flow-step optical-step">
                    <span className="flow-step-number">08</span>
                    <div className="flow-step-copy"><strong>מחזיר שקוף</strong><small>משקף את הנתון אל העין</small></div>
                  </li>
                </ol>
              </section>
            </div>

            <div className="architecture-evidence">
              <figure>
                <ZoomableImage src="/electrical-schematic.webp" alt="שרטוט מערכת TG-20 מתוך ספר הפרויקט" width={1394} height={1252} loading="lazy" />
                <figcaption><strong>שרטוט מערכת מתועד</strong><span>חיבורי המולטימטר, HM-11, הבקר, ה־OLED והשרשרת האופטית.</span></figcaption>
              </figure>
              <div className="architecture-notes">
                <h3>ממשקי מפתח</h3>
                <dl>
                  <div><dt>BLE</dt><dd>המולטימטר משדר; HM-11 קולט במצב Central.</dd></div>
                  <div><dt>UART</dt><dd>זרם הנתונים עובר ל־Arduino Micro בקצב 9600 baud.</dd></div>
                  <div><dt>I²C</dt><dd>הבקר מעדכן את תצוגת ה־OLED בכתובת שאותרה בסריקה.</dd></div>
                  <div><dt>אופטיקה</dt><dd>מסלול מקופל: מראה, 3 ס״מ לעדשה, והשתקפות אל המחזיר.</dd></div>
                  <div><dt>הזנה</dt><dd>סוללת 9V אל כניסת VIN ומפסק הפעלה; צריכת הזרם לא אופיינה.</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="section decisions-section" id="decisions" aria-labelledby="decisions-title">
          <div className="page-shell">
            <div className="section-heading">
              <p className="eyebrow">04 · ההחלטות</p>
              <h2 id="decisions-title">הבחירות המרכזיות</h2>
            </div>
            <div className="decision-grid">
              {decisions.map((decision, index) => (
                <article key={decision.label}>
                  <span className="decision-number">0{index + 1}</span>
                  <small>{decision.label}</small>
                  <h3>{decision.selected}</h3>
                  <p>{decision.reason}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section validation-section" id="validation" aria-labelledby="validation-title">
          <div className="page-shell">
            <div className="section-heading centered light-heading">
              <p className="eyebrow">05 · בדיקות, אימות ופענוח</p>
              <h2 id="validation-title">מהבדיקה ועד לפענוח</h2>
              <p>הבדיקות שבוצעו בפועל והדרך שבה פוענחו נתוני המולטימטר.</p>
            </div>

            <div className="test-method">
              <article><span>01</span><h3>מערך בדיקה</h3><p>OWON B41T, מודול HM-11, ‏Arduino Micro, ‏Serial Monitor, ‏OLED והמערך האופטי.</p></article>
              <article><span>02</span><h3>הליך</h3><p>חיבור BLE, קליטת בתים, שינוי ערכי DMM, רישום מקביל של החבילה והקריאה, גזירת נוסחה והצגה.</p></article>
              <article><span>03</span><h3>כלי מדידה</h3><p>המולטימטר שימש כערך הייחוס מול הנתון שפוענח והוצג ב־OLED.</p></article>
            </div>

            <div className="table-scroll dark-table" role="region" aria-label="טבלת דרישה מול תוצאה" tabIndex={0}>
              <table>
                <caption>דרישות מול תוצאות</caption>
                <thead><tr><th>מדד</th><th>דרישה</th><th>תוצאה שנמדדה / תועדה</th></tr></thead>
                <tbody>
                  {validation.map(([metric, requirement, result]) => (
                    <tr key={metric}><td>{metric}</td><td>{requirement}</td><td>{result}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="validation-evidence">
              <figure><ZoomableImage src="/dmm-positive.webp" alt="מולטימטר OWON מציג 11.640 וולט במהלך בדיקת פענוח" width={1320} height={1150} loading="lazy" /><figcaption>קריאת ייחוס חיובית שתועדה: 11.640V</figcaption></figure>
              <figure><ZoomableImage src="/dmm-negative.webp" alt="מולטימטר OWON מציג מינוס 9.628 וולט במהלך בדיקת פענוח" width={1320} height={1150} loading="lazy" /><figcaption>בדיקת סימן שלילי שתועדה: −9.628V</figcaption></figure>
              <div className="formula-card" dir="ltr">
                <span dir="rtl">הערך לאחר הפענוח</span>
                <code>positive = 256 × byte₆ + byte₅</code>
                <code>negative = 256 × (byte₆ − 128) + byte₅</code>
                <small dir="rtl">המיקום העשרוני והיחידה נקבעים לפי שדות נוספים במסגרת.</small>
              </div>
            </div>

            <div className="debug-subsection" aria-labelledby="debug-title">
              <div className="section-heading">
                <h2 id="debug-title">תהליך הפענוח שעשיתי</h2>
              </div>
              <div className="debug-layout">
                <figure>
                  <ZoomableImage src="/debug-notebook.webp" alt="דפי חישובים ורישום ידני ששימשו לפענוח נתוני המולטימטר" width={856} height={959} loading="lazy" />
                  <figcaption>רישום ידני של מסגרות, ערכי DMM וניסיונות חישוב.</figcaption>
                </figure>
                <ol className="debug-steps">
                  <li><span>הבעיה</span><div><h3>החיבור עובד, אבל הנתונים חסרי משמעות</h3><p>לאחר OK+CONN הגיעו שוב ושוב שישה ערכים מספריים שלא ייצגו טקסט ASCII שימושי.</p></div></li>
                  <li><span>החקירה</span><div><h3>שינוי מבוקר ורישום מקביל</h3><p>שינינו סוג מדידה וערך במולטימטר, שמרנו כל חבילה והשווינו בין מיקום הבית לבין יחידה, מצב, סימן ותצוגת ה־DMM.</p></div></li>
                  <li><span>מקור הבעיה</span><div><h3>פרוטוקול יצרן בינארי ולא מתועד</h3><p>ארבעת הבתים הראשונים תיארו את מצב המדידה; שני הבתים האחרונים קידדו את הערך והסימן.</p></div></li>
                  <li><span>הפתרון</span><div><h3>מפענח ייעודי</h3><p>נגזרה נוסחת בסיס 256, הוגדר סף 128 לסימן, ונבנה מיפוי למיקום נקודה עשרונית וליחידה.</p></div></li>
                  <li><span>בדיקה חוזרת</span><div><h3>אימות על ערכים שונים</h3><p>הפענוח תועד עבור 0.0024V, ‏11.640V ו־−9.628V והועבר לתצוגת ה־OLED.</p></div></li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section prototype-section" id="prototype" aria-labelledby="prototype-title">
          <div className="page-shell">
            <div className="section-heading">
              <p className="eyebrow">06 · האב־טיפוס</p>
              <h2 id="prototype-title">תיעוד הבנייה</h2>
            </div>
            <div className="prototype-grid">
              <figure className="prototype-main"><ZoomableImage src="/tg20-hero.webp" alt="האב־טיפוס הסופי של TG-20" width={1448} height={1086} loading="lazy" /><figcaption><strong>אב־טיפוס סופי מורכב</strong><span>אינטגרציה של משקפי מגן, אלקטרוניקה ואופטיקה.</span></figcaption></figure>
              <figure><ZoomableImage src="/cad-assembly.webp" alt="מודל תלת־ממדי של מארז TG-20 בתוכנת Tinkercad" width={1384} height={840} loading="lazy" /><figcaption><strong>ניסיון לבניית הפרויקט בתלת־ממד</strong><span>בניית המודל עם הרכיבים ב־Tinkercad.</span></figcaption></figure>
              <figure><ZoomableImage src="/oled-projection.webp" alt="טקסט OLED מוקרן דרך מערכת האופטיקה" width={2048} height={1405} loading="lazy" /><figcaption><strong>בדיקת אופטיקה</strong><span>התמונה המוגדלת נראית דרך המחזיר השקוף.</span></figcaption></figure>
              <figure><ZoomableImage src="/optics-bench.webp" alt="אב־טיפוס מוקדם מקרטון לבדיקת מסלול האור" width={2048} height={1328} loading="lazy" /><figcaption><strong>ניסיון ראשון עם קרטון</strong><span>בדיקה מהירה של הפרויקט כשהוא בנוי.</span></figcaption></figure>
              <figure className="prototype-video">
                <video controls playsInline preload="metadata" poster="/project-demo-1-poster.jpg" aria-label="סרטון הדגמת האב־טיפוס">
                  <source src="/project-demo-1.mp4" type="video/mp4" />
                  הדפדפן אינו תומך בווידאו. <a href="/project-demo-1.mp4" download>הורדת הסרטון</a>
                </video>
                <figcaption><strong>הדגמת האב־טיפוס</strong><span>המערכת והמבנה בפעולה.</span></figcaption>
              </figure>
              <figure className="prototype-video">
                <video controls playsInline preload="metadata" poster="/project-demo-2-poster.jpg" aria-label="סרטון נוסף של מערכת TG-20">
                  <source src="/project-demo-2.mp4" type="video/mp4" />
                  הדפדפן אינו תומך בווידאו. <a href="/project-demo-2.mp4" download>הורדת הסרטון</a>
                </video>
                <figcaption><strong>בדיקת המערכת</strong><span>תיעוד נוסף של פרויקט TG-20.</span></figcaption>
              </figure>
            </div>

          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="page-shell contact-grid">
            <div>
              <p className="eyebrow">07 · יצירת קשר</p>
              <h2 id="contact-title">מחפש את האתגר הבא</h2>
              <p>פתוח לתפקידי הנדסאי אלקטרוניקה ומחשבים, תוכנה, פיתוח ורשתות.</p>
              <div className="contact-actions">
                <a className="button primary" href="mailto:timavidon@gmail.com">שליחת מייל</a>
                <a className="button dark-secondary" href="/resume.pdf" download>הורדת קורות חיים</a>
              </div>
            </div>
            <dl className="contact-list">
              <div><dt>שם</dt><dd>טימוטי אבידון</dd></div>
              <div><dt>מייל</dt><dd><a href="mailto:timavidon@gmail.com">timavidon@gmail.com</a></dd></div>
              <div><dt>טלפון</dt><dd><a href="tel:+972505888794" dir="ltr">050-588-8794</a></dd></div>
              <div><dt>LinkedIn</dt><dd><a href="https://www.linkedin.com/in/timavidon/" target="_blank" rel="noreferrer">linkedin.com/in/timavidon ↗</a></dd></div>
              <div><dt>GitHub</dt><dd><a href="https://github.com/timavidon" target="_blank" rel="noreferrer">github.com/timavidon ↗</a></dd></div>
              <div><dt>מיקום</dt><dd>נהריה</dd></div>
              <div><dt>שפות</dt><dd>עברית · רוסית · אנגלית</dd></div>
            </dl>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-shell footer-inner"><span>© 2026 טימוטי אבידון</span><span>פרויקט TG-20</span><span>בניתי את האתר בעזרת ChatGPT Codex</span></div>
      </footer>
      <SiteImageLightbox />
      <BackToTop />
    </>
  );
}
