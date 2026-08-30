import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Mail,
  ArrowUpRight,
  Navigation,
} from "lucide-react";


/* =========================================================
   SCROLL REVEAL
========================================================= */

function useReveal(threshold = 0.12) {

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          setVisible(true);
          observer.unobserve(element);

        }

      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();

  }, [threshold]);

  return [ref, visible];

}


/* =========================================================
   REVEAL COMPONENT
========================================================= */

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {

  const [ref, visible] = useReveal();

  const transforms = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    none: "",
  };

  return (

    <div
      ref={ref}
      className={`
        transition-all
        duration-[1000ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${transforms[direction]}
        ${
          visible
            ? "translate-x-0 translate-y-0 opacity-100"
            : "opacity-0"
        }
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>

  );

}


/* =========================================================
   GMAIL LOGO
========================================================= */

function GmailLogo() {

  return (

    <svg
      width="25"
      height="25"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M6 10.5V37.5C6 39.9853 8.01472 42 10.5 42H16V22.5L24 28.5L32 22.5V42H37.5C39.9853 42 42 39.9853 42 36.5V10.5L24 24L6 10.5Z"
        fill="#EA4335"
      />

      <path
        d="M6 10.5L24 24L42 10.5"
        stroke="#4285F4"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <path
        d="M6 10.5V37.5C6 39.9853 8.01472 42 10.5 42H16V22.5L6 10.5Z"
        fill="#34A853"
      />

      <path
        d="M42 10.5V36.5C42 39.5376 39.5376 42 36.5 42H32V22.5L42 10.5Z"
        fill="#FBBC04"
      />

      <path
        d="M6 10.5L24 24L42 10.5"
        stroke="#EA4335"
        strokeWidth="4"
        strokeLinejoin="round"
      />

    </svg>

  );

}


/* =========================================================
   INSTAGRAM LOGO
========================================================= */

function InstagramLogo() {

  return (

    <svg
      width="25"
      height="25"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >

      <defs>

        <linearGradient
          id="instagramGradient"
          x1="7"
          y1="42"
          x2="41"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >

          <stop
            offset="0"
            stopColor="#FFD600"
          />

          <stop
            offset="0.45"
            stopColor="#FF0069"
          />

          <stop
            offset="1"
            stopColor="#7638FA"
          />

        </linearGradient>

      </defs>


      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="11"
        fill="url(#instagramGradient)"
      />


      <rect
        x="13"
        y="13"
        width="22"
        height="22"
        rx="7"
        stroke="white"
        strokeWidth="3"
      />


      <circle
        cx="24"
        cy="24"
        r="5"
        stroke="white"
        strokeWidth="3"
      />


      <circle
        cx="32.5"
        cy="15.5"
        r="2"
        fill="white"
      />

    </svg>

  );

}


/* =========================================================
   LINKEDIN LOGO
========================================================= */

function LinkedInLogo() {

  return (

    <svg
      width="25"
      height="25"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >

      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="5"
        fill="#0A66C2"
      />


      <circle
        cx="14"
        cy="16"
        r="3"
        fill="white"
      />


      <path
        d="M11 21H17V37H11V21Z"
        fill="white"
      />


      <path
        d="M21 21H27V23.2C28.35 21.65 30.25 20.5 33 20.5C37.8 20.5 39 23.55 39 27.7V37H33V28.7C33 26.7 32.95 24.5 30.3 24.5C27.6 24.5 27 26.6 27 28.55V37H21V21Z"
        fill="white"
      />

    </svg>

  );

}


/* =========================================================
   CONTACT CHANNEL CARD
========================================================= */

function ContactCard({
  logo,
  title,
  description,
  delay,
}) {

  return (

    <Reveal
      delay={delay}
      direction="up"
    >

      <article
        className="
          group
          relative
          min-h-[260px]
          overflow-hidden
          bg-[#070707]
          p-7
          md:p-8
          transition-all
          duration-500
          hover:bg-white/[0.025]
        "
      >

        {/* ================================================
            ANIMATED BOTTOM LINE
        ================================================= */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-px
            w-0
            bg-cyan-300
            transition-all
            duration-700
            group-hover:w-full
          "
        />


        {/* ================================================
            PLATFORM LOGO
        ================================================= */}

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-lg
            border
            border-white/[0.08]
            bg-white/[0.035]
            transition-all
            duration-500
            group-hover:-translate-y-1
            group-hover:border-white/[0.15]
          "
        >

          {logo}

        </div>


        {/* ================================================
            LABEL
        ================================================= */}

        <p
          className="
            mt-7
            font-mono
            text-[9px]
            tracking-[0.2em]
            text-white/35
          "
        >
          {title}
        </p>


        {/* ================================================
            STATUS
        ================================================= */}

        <h3
          className="
            mt-3
            font-display
            text-xl
            font-medium
            text-white/85
          "
        >
          COMING SOON
        </h3>


        {/* ================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-2
            max-w-[300px]
            text-xs
            leading-5
            text-white/35
          "
        >
          {description}
        </p>

      </article>

    </Reveal>

  );

}


/* =========================================================
   CONTACT PAGE
========================================================= */

const Contact = () => {

  return (

    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >


      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_15%_20%,rgba(8,145,178,0.10),transparent_30%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_85%_75%,rgba(79,70,229,0.09),transparent_32%)]
        "
      />


      {/* =====================================================
          SCIENTIFIC GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-6
          md:px-10
          lg:px-14
          pt-28
          md:pt-32
          lg:pt-36
          pb-24
          md:pb-28
        "
      >


        {/* =================================================
            SECTION NUMBER
        ================================================= */}

        <Reveal>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.22em]
                text-cyan-300
              "
            >
              06
            </span>


            <span
              className="
                h-px
                w-10
                bg-cyan-400/60
              "
            />


            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.2em]
                text-white/30
              "
            >
              MEDIFORGE / CONTACT
            </span>

          </div>

        </Reveal>


        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <Reveal delay={150}>

          <h2
            className="
              mt-8
              font-display
              text-[clamp(3rem,7vw,7rem)]
              font-semibold
              leading-[0.88]
              tracking-[-0.06em]
            "
          >

            LET'S{" "}

            <span className="text-cyan-300">
              CONNECT
            </span>

          </h2>

        </Reveal>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <Reveal delay={250}>

          <p
            className="
              mt-7
              max-w-[650px]
              text-[13px]
              leading-7
              text-white/55
              md:text-[15px]
            "
          >

            Mediforge is building a collaborative space where
            medicine, biology, engineering and intelligent
            technology come together to create meaningful
            biomedical innovations.

          </p>

        </Reveal>


        {/* =================================================
            CONTACT CHANNELS
        ================================================= */}

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-px
            overflow-hidden
            border
            border-white/[0.08]
            bg-white/[0.08]
            md:grid-cols-3
          "
        >

          {/* EMAIL */}

          <ContactCard
            delay={300}
            title="EMAIL"
            logo={<GmailLogo />}
            description="
              Official communication channel
              under development.
            "
          />


          {/* INSTAGRAM */}

          <ContactCard
            delay={400}
            title="INSTAGRAM"
            logo={<InstagramLogo />}
            description="
              Follow our research journey
              when the channel launches.
            "
          />


          {/* LINKEDIN */}

          <ContactCard
            delay={500}
            title="LINKEDIN"
            logo={<LinkedInLogo />}
            description="
              Professional research presence
              coming soon.
            "
          />

        </div>


        {/* =================================================
            LOCATION HEADER
        ================================================= */}

        <Reveal
          delay={250}
          direction="up"
          className="mt-28 md:mt-36"
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <MapPin
              size={18}
              strokeWidth={1.2}
              className="text-cyan-300"
            />


            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.22em]
                text-cyan-300
              "
            >
              WHERE CAN YOU FIND US?
            </span>

          </div>


          <h3
            className="
              mt-6
              font-display
              text-[clamp(2rem,4vw,4rem)]
              font-medium
              tracking-[-0.045em]
            "
          >
            REVA UNIVERSITY
          </h3>

        </Reveal>


        {/* =================================================
            LOCATION CONTENT
        ================================================= */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            items-stretch
            gap-10
            lg:grid-cols-[0.72fr_1.28fr]
            lg:gap-14
          "
        >


          {/* =================================================
              ADDRESS
          ================================================= */}

          <Reveal
            delay={350}
            direction="left"
          >

            <div
              className="
                h-full
                border-t
                border-white/[0.09]
                pt-7
              "
            >

              <p
                className="
                  font-mono
                  text-[8px]
                  tracking-[0.2em]
                  text-cyan-300
                "
              >
                LOCATION
              </p>


              <div
                className="
                  mt-7
                  space-y-1.5
                  text-sm
                  leading-6
                  text-white/55
                "
              >

                <p className="text-white/80">
                  REVA University
                </p>

                <p>
                  Rukmini Knowledge Park
                </p>

                <p>
                  Kattigenahalli, Yelahanka
                </p>

                <p>
                  Bengaluru, Karnataka
                </p>

                <p>
                  India — 560064
                </p>

              </div>


              {/* =================================================
                  CAMPUS LOCATION
              ================================================= */}

              <div
                className="
                  mt-10
                  border-t
                  border-white/[0.07]
                  pt-6
                "
              >

                <p
                  className="
                    font-mono
                    text-[8px]
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  CAMPUS LOCATION
                </p>


                <p
                  className="
                    mt-3
                    font-mono
                    text-[10px]
                    tracking-[0.08em]
                    text-white/40
                  "
                >
                  REVA UNIVERSITY CAMPUS
                </p>

              </div>


              {/* =================================================
                  GOOGLE MAPS
              ================================================= */}

              <a
                href="https://www.google.com/maps/search/?api=1&query=REVA%20University%2C%20Rukmini%20Knowledge%20Park%2C%20Kattigenahalli%2C%20Yelahanka%2C%20Bengaluru%2C%20Karnataka%20560064"
                target="_blank"
                rel="noreferrer"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  border
                  border-cyan-300/20
                  px-4
                  py-3
                  font-mono
                  text-[9px]
                  tracking-[0.16em]
                  text-cyan-300/80
                  transition-all
                  duration-300
                  hover:border-cyan-300/50
                  hover:bg-cyan-300/[0.05]
                  hover:text-cyan-200
                "
              >

                OPEN IN GOOGLE MAPS

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.3}
                />

              </a>

            </div>

          </Reveal>


          {/* =================================================
              MAP
          ================================================= */}

          <Reveal
            delay={500}
            direction="right"
          >

            <div
              className="
                group
                relative
                min-h-[380px]
                overflow-hidden
                border
                border-white/[0.10]
                bg-[#080808]
                md:min-h-[450px]
              "
            >

              <iframe
                title="REVA University Location"
                src="https://www.google.com/maps?q=REVA%20University%2C%20Rukmini%20Knowledge%20Park%2C%20Kattigenahalli%2C%20Yelahanka%2C%20Bengaluru%2C%20Karnataka%20560064&z=16&output=embed"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                  grayscale
                  opacity-75
                  transition-all
                  duration-700
                  group-hover:grayscale-0
                  group-hover:opacity-90
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />


              {/* MAP OVERLAY */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#050505]/75
                  via-transparent
                  to-[#050505]/10
                "
              />


              {/* MAP LABEL */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-5
                  left-5
                  right-5
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >

                <div>

                  <p
                    className="
                      font-mono
                      text-[8px]
                      tracking-[0.18em]
                      text-cyan-300
                    "
                  >
                    MEDIFORGE / BASE LOCATION
                  </p>


                  <p
                    className="
                      mt-2
                      text-xs
                      text-white/70
                    "
                  >
                    REVA UNIVERSITY
                  </p>

                </div>


                <Navigation
                  size={18}
                  strokeWidth={1.2}
                  className="
                    shrink-0
                    text-cyan-300
                  "
                />

              </div>


              {/* =================================================
                  MAP CORNERS
              ================================================= */}

              <span
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  h-5
                  w-5
                  border-l
                  border-t
                  border-cyan-300/50
                "
              />

              <span
                className="
                  pointer-events-none
                  absolute
                  right-0
                  top-0
                  h-5
                  w-5
                  border-r
                  border-t
                  border-cyan-300/50
                "
              />

              <span
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  h-5
                  w-5
                  border-b
                  border-l
                  border-cyan-300/50
                "
              />

              <span
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  right-0
                  h-5
                  w-5
                  border-b
                  border-r
                  border-cyan-300/50
                "
              />

            </div>

          </Reveal>

        </div>


        {/* =================================================
            BOTTOM LINE
        ================================================= */}

        <Reveal
          delay={350}
          direction="up"
          className="mt-24 md:mt-28"
        >

          <div
            className="
              flex
              flex-col
              items-start
              justify-between
              gap-4
              border-t
              border-white/[0.08]
              pt-6
              md:flex-row
              md:items-center
            "
          >

            <p
              className="
                font-mono
                text-[8px]
                tracking-[0.16em]
                text-white/20
              "
            >
              MEDIFORGE · RESEARCH · ENGINEERING · INNOVATION
            </p>


            <p
              className="
                font-mono
                text-[8px]
                tracking-[0.16em]
                text-white/20
              "
            >
              BENGALURU · INDIA
            </p>

          </div>

        </Reveal>

      </div>

    </section>

  );

};


export default Contact;