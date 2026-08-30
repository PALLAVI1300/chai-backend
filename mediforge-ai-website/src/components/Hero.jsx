import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import BioScene from './BioScene';

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    label: 'HOME',
    href: '#home'
  },
  {
    label: 'ABOUT US',
    href: '#about'
  },
  {
    label: 'OUR TEAM',
    href: '#team'
  },
  {
    label: 'OUR WORK',
    href: '#work'
  },
  {
    label: 'MENTOR SUPPORT',
    href: '#mentor'
  },
  {
    label: 'CONTACT',
    href: '#contact'
  }
];

/* =========================================================
   HERO
========================================================= */

const Hero = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const [activeNav, setActiveNav] = useState('HOME');

  /* =======================================================
     AUTOMATIC ACTIVE NAVIGATION WHILE SCROLLING
  ======================================================= */

  useEffect(() => {

    const handleScroll = () => {

      const scrollPosition =
        window.scrollY + 160;

      let currentSection = 'HOME';

      navigation.forEach((item) => {

        const section =
          document.querySelector(item.href);

        if (!section) return;

        const sectionTop =
          section.offsetTop;

        const sectionBottom =
          sectionTop + section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionBottom
        ) {

          currentSection =
            item.label;

        }

      });

      setActiveNav(currentSection);

    };

    /*
      Run once immediately so HOME
      is correctly selected on page load.
    */

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    return () => {

      window.removeEventListener(
        'scroll',
        handleScroll
      );

    };

  }, []);

  /* =======================================================
     NAVIGATION CLICK
  ======================================================= */

  const handleNavigation = (label) => {

    setActiveNav(label);

    setMenuOpen(false);

  };

  /* =======================================================
     COMPONENT
  ======================================================= */

  return (

    <section
      id="home"
      className="
        relative
        min-h-screen
        bg-[#050505]
        text-white
        overflow-hidden
      "
    >

      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-[radial-gradient(circle_at_74%_45%,rgba(8,145,178,0.12),transparent_34%)]
        "
      />

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-[radial-gradient(circle_at_86%_70%,rgba(79,70,229,0.10),transparent_30%)]
        "
      />

      {/* =====================================================
          SCIENTIFIC GRID
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          pointer-events-none
          bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* =====================================================
          FIXED HEADER
      ===================================================== */}

      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-[100]
          bg-[#050505]/90
          backdrop-blur-xl
        "
      >

        <div
          className="
            max-w-[1500px]
            mx-auto
            px-6
            md:px-10
            lg:px-14
            pt-5
          "
        >

          <div
            className="
              h-[72px]
              flex
              items-center
              justify-between
              border-b
              border-white/[0.09]
            "
          >

            {/* =================================================
                MEDIFORGE BRANDING
                Circular logo + name
            ================================================= */}

            <a
              href="#home"
              onClick={() =>
                handleNavigation('HOME')
              }
              className="
                flex
                items-center
                gap-3
                shrink-0
                group
              "
            >

              <img
                src="/src/assets/mediforge.png"
                alt="MediForge Logo"
                className="
                  h-11
                  w-11
                  md:h-12
                  md:w-12
                  rounded-full
                  object-cover
                  shrink-0
                  transition-transform
                  duration-300
                  group-hover:scale-[1.04]
                "
              />

              <span
                className="
                  font-display
                  text-base
                  md:text-lg
                  font-semibold
                  tracking-[-0.04em]
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-cyan-100
                "
              >
                MEDI-FORGE
              </span>

            </a>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav
              className="
                hidden
                lg:flex
                items-center
                gap-7
                xl:gap-8
              "
            >

              {navigation.map((item) => {

                const isActive =
                  activeNav === item.label;

                return (

                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() =>
                      handleNavigation(item.label)
                    }
                    className={`
                      relative
                      py-3
                      text-[10px]
                      xl:text-[11px]
                      tracking-[0.11em]
                      font-medium
                      whitespace-nowrap
                      transition-colors
                      duration-300
                      group

                      ${
                        isActive
                          ? 'text-white'
                          : 'text-white/48 hover:text-white/90'
                      }
                    `}
                  >

                    {item.label}

                    <span
                      className={`
                        absolute
                        left-0
                        right-0
                        -bottom-0.5
                        h-px
                        bg-cyan-300
                        origin-center
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? 'opacity-100 scale-x-100'
                            : 'opacity-0 scale-x-0 group-hover:opacity-70 group-hover:scale-x-100'
                        }
                      `}
                    />

                  </a>

                );

              })}

            </nav>

            {/* =================================================
                MOBILE MENU
            ================================================= */}

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="
                lg:hidden
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/70
                hover:text-cyan-300
                hover:border-cyan-300/30
                transition-all
              "
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >

              {menuOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}

            </button>

          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================= */}

          <div
            className={`
              lg:hidden
              overflow-hidden
              transition-all
              duration-300
              ${
                menuOpen
                  ? 'max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              }
            `}
          >

            <nav
              className="
                py-5
                border-b
                border-white/[0.08]
                bg-black/75
                backdrop-blur-xl
              "
            >

              {navigation.map((item, index) => {

                const isActive =
                  activeNav === item.label;

                return (

                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() =>
                      handleNavigation(item.label)
                    }
                    className={`
                      flex
                      items-center
                      justify-between
                      py-3.5
                      px-2
                      text-xs
                      tracking-[0.16em]
                      transition-colors

                      ${
                        isActive
                          ? 'text-cyan-300'
                          : 'text-white/50 hover:text-white'
                      }
                    `}
                  >

                    <span>
                      {item.label}
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-mono
                        text-white/20
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </a>

                );

              })}

            </nav>

          </div>

        </div>

      </header>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <main
        className="
          relative
          z-10
          max-w-[1500px]
          mx-auto
          px-6
          md:px-10
          lg:px-14
          pt-[97px]
          min-h-[calc(100vh-97px)]
          grid
          grid-cols-1
          lg:grid-cols-[0.92fr_1.08fr]
          items-center
        "
      >

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-30
            pt-20
            lg:pt-3
            pb-10
          "
        >

          {/* =================================================
              TEAM STATEMENT
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
              mb-8
            "
          >

            <span
              className="
                w-10
                md:w-12
                h-px
                bg-cyan-400/75
              "
            />

            <span
              className="
                text-[9px]
                md:text-[10px]
                font-mono
                tracking-[0.17em]
                md:tracking-[0.19em]
                text-cyan-300
                font-medium
              "
            >

              STUDENT-LED

              <span className="text-white/25">
                {' '}·{' '}
              </span>

              RESEARCH-DRIVEN

              <span className="text-white/25">
                {' '}·{' '}
              </span>

              FUTURE-FOCUSED

            </span>

          </div>

          {/* =================================================
              MEDIFORGE
          ================================================= */}

          <h1
            className="
              font-display
              font-semibold
              tracking-[-0.065em]
              leading-[0.82]
              text-[clamp(3.2rem,7.2vw,8rem)]
              white-space-nowrap
              max-w-none
              select-none
            "
          >

            MEDI-

            <span
              className="
                text-cyan-300
              "
            >
              FORGE
            </span>

          </h1>

          {/* =================================================
              TEAM TITLE
          ================================================= */}

          <div
            className="
              mt-8
              md:mt-9
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-10
                md:w-12
                h-px
                bg-white/25
                shrink-0
              "
            />

            <p
              className="
                text-[10px]
                md:text-[13px]
                tracking-[0.15em]
                md:tracking-[0.18em]
                text-white/75
                uppercase
                font-medium
              "
            >
              Biomedical Innovation Team
            </p>

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-7
              md:mt-8
              max-w-[555px]
              text-[13px]
              md:text-[15px]
              leading-6
              md:leading-7
              text-white/58
              font-normal
            "
          >

            We are a multidisciplinary student team
            exploring biology, medicine, engineering and
            intelligent technology to transform bold ideas
            into meaningful biomedical innovations.

          </p>

          {/* =================================================
              TEAM IDENTITY
          ================================================= */}

          <div
            className="
              mt-10
              md:mt-12
              pt-5
              md:pt-6
              border-t
              border-white/[0.09]
              max-w-[570px]
            "
          >

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-6
                sm:gap-5
              "
            >

              {/* FOCUS */}

              <div>

                <p
                  className="
                    text-[8px]
                    font-mono
                    tracking-[0.19em]
                    text-cyan-300
                  "
                >
                  FOCUS
                </p>

                <p
                  className="
                    mt-1.5
                    text-[11px]
                    md:text-xs
                    text-white/52
                    leading-5
                  "
                >
                  Biomedical Innovation
                </p>

              </div>

              {/* APPROACH */}

              <div>

                <p
                  className="
                    text-[8px]
                    font-mono
                    tracking-[0.19em]
                    text-cyan-300
                  "
                >
                  APPROACH
                </p>

                <p
                  className="
                    mt-1.5
                    text-[11px]
                    md:text-xs
                    text-white/52
                    leading-5
                  "
                >
                  Research · Engineering · AI
                </p>

              </div>

              {/* COMMUNITY */}

              <div>

                <p
                  className="
                    text-[8px]
                    font-mono
                    tracking-[0.19em]
                    text-cyan-300
                  "
                >
                  COMMUNITY
                </p>

                <p
                  className="
                    mt-1.5
                    text-[11px]
                    md:text-xs
                    text-white/52
                    leading-5
                  "
                >
                  Students · Mentors · Researchers
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            RIGHT — DNA
        =================================================== */}

        <div
          className="
            relative
            h-[56vh]
            md:h-[63vh]
            lg:h-[calc(100vh-115px)]
            min-h-[470px]
            md:min-h-[540px]
            lg:min-h-[600px]
            lg:-mr-10
            lg:translate-x-[4%]
            lg:translate-y-2
          "
        >

          <BioScene />

          {/* BIOLOGICAL SYSTEM */}

          <div
            className="
              absolute
              top-[25%]
              left-[1%]
              hidden
              xl:block
              pointer-events-none
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-[8px]
                font-mono
                tracking-[0.17em]
                text-white/22
              "
            >

              <span
                className="
                  w-6
                  h-px
                  bg-cyan-400/30
                "
              />

              BIOLOGICAL SYSTEM

            </div>

          </div>

          {/* MEDIFORGE IDENTIFIER */}

          <div
            className="
              absolute
              bottom-[13%]
              right-[2%]
              hidden
              xl:block
              pointer-events-none
            "
          >

            <div
              className="
                text-[8px]
                font-mono
                tracking-[0.18em]
                text-white/13
              "
            >
              MEDIFORGE / 01
            </div>

          </div>

        </div>

      </main>

      {/* =====================================================
          BOTTOM META
      ===================================================== */}

      <div
        className="
          absolute
          bottom-6
          left-6
          md:left-10
          lg:left-14
          z-30
          hidden
          md:block
        "
      >

        <p
          className="
            text-[8px]
            font-mono
            tracking-[0.16em]
            text-white/17
          "
        >
          MEDIFORGE · MEDIFORGE INNOVATION COLLECTIVE · 2026
        </p>

      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <div
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          z-40
          hidden
          md:flex
          flex-col
          items-center
          gap-3
          pointer-events-none
        "
      >

        <span
          className="
            text-[8px]
            tracking-[0.26em]
            text-white/20
          "
        >
          SCROLL TO EXPLORE
        </span>

        <div
          className="
            w-px
            h-8
            bg-gradient-to-b
            from-cyan-400/55
            to-transparent
          "
        />

      </div>

    </section>

  );

};

export default Hero;