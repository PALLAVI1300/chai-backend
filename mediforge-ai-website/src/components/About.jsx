import { useEffect, useRef, useState } from "react";

import {
  Microscope,
  FlaskConical,
  BrainCircuit,
  Cpu,
  Dna,
  BookOpen,
  Users,
  ArrowDown,
  Target,
  Eye,
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
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}


/* =========================================================
   REVEAL
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
        ${
          visible
            ? "translate-x-0 translate-y-0 opacity-100"
            : `${transforms[direction]} opacity-0`
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
   SECTION HEADER
========================================================= */

function ChapterHeader({
  number,
  title,
  subtitle,
}) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className="text-center"
    >

      {/* Number */}

      <div
        className={`
          font-mono
          text-[9px]
          md:text-[10px]
          tracking-[0.28em]
          text-cyan-300/75
          transition-all
          duration-700
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }
        `}
      >
        {number}
      </div>


      {/* Line */}

      <div className="mt-3 flex justify-center">

        <span
          className={`
            h-px
            bg-cyan-300/65
            transition-all
            duration-900
            ${
              visible
                ? "w-12 md:w-16"
                : "w-0"
            }
          `}
        />

      </div>


      {/* Main heading */}

      <div className="group mt-5">

        <h2
          className={`
            font-display
            font-semibold
            text-[clamp(2.5rem,4.5vw,4.8rem)]
            leading-[0.88]
            tracking-[-0.06em]
            text-white
            transition-all
            duration-700
            ease-out
            ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
            group-hover:text-cyan-100
            group-hover:-translate-y-1
          `}
          style={{
            transitionDelay: "150ms",
          }}
        >
          {title}
        </h2>

        {/* Heading hover line */}

        <div
          className="
            mx-auto
            mt-3
            h-px
            w-0
            bg-cyan-300
            transition-all
            duration-600
            group-hover:w-12
          "
        />

      </div>


      {/* Subtitle */}

      {subtitle && (

        <p
          className={`
            mt-4
            font-mono
            text-[8px]
            md:text-[9px]
            tracking-[0.22em]
            text-white/35
            transition-all
            duration-700
            ${
              visible
                ? "opacity-100"
                : "opacity-0"
            }
          `}
          style={{
            transitionDelay: "350ms",
          }}
        >
          {subtitle}
        </p>

      )}

    </div>
  );
}


/* =========================================================
   SECTION DIVIDER
========================================================= */

function SectionDivider() {
  return (
    <div
      className="
        mx-auto
        max-w-[1380px]
        px-6
        md:px-10
        lg:px-14
      "
    >
      <div
        className="
          h-px
          w-full
          bg-white/[0.14]
        "
      />
    </div>
  );
}


/* =========================================================
   INFORMATION CARD
========================================================= */

function InfoCard({
  number,
  title,
  description,
  icon: Icon,
  accent = "cyan",
}) {
  const purple = accent === "purple";

  return (
    <article
      className={`
        group
        relative
        flex
        h-full
        min-h-[205px]
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-white/[0.11]
        bg-white/[0.018]
        p-6
        md:p-7
        transition-all
        duration-700
        hover:-translate-y-1.5
        hover:bg-white/[0.03]
        ${
          purple
            ? "hover:border-violet-300/30"
            : "hover:border-cyan-300/30"
        }
      `}
    >

      {/* Glow */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          blur-3xl
          opacity-0
          transition-opacity
          duration-700
          group-hover:opacity-100
          ${
            purple
              ? "bg-violet-400/10"
              : "bg-cyan-400/10"
          }
        `}
      />


      {/* Top */}

      <div className="relative flex items-center justify-between">

        <span
          className={`
            font-mono
            text-[9px]
            tracking-[0.2em]
            ${
              purple
                ? "text-violet-300/75"
                : "text-cyan-300/75"
            }
          `}
        >
          {number}
        </span>


        <Icon
          size={18}
          strokeWidth={1}
          className="
            text-white/20
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:text-cyan-300/80
          "
        />

      </div>


      {/* Heading */}

      <h3
        className="
          relative
          mt-7
          font-display
          font-semibold
          text-[clamp(1.3rem,1.8vw,1.9rem)]
          leading-none
          tracking-[-0.04em]
          text-white
          transition-all
          duration-500
          group-hover:translate-x-1
          group-hover:text-cyan-100
        "
      >
        {title}
      </h3>


      {/* Accent */}

      <div
        className={`
          mt-4
          h-px
          w-8
          transition-all
          duration-600
          group-hover:w-14
          ${
            purple
              ? "bg-violet-300/55"
              : "bg-cyan-300/55"
          }
        `}
      />


      {/* Content */}

      <p
        className="
          relative
          mt-5
          text-[13px]
          md:text-sm
          lg:text-[15px]
          leading-[1.65]
          text-white/55
          transition-colors
          duration-500
          group-hover:text-white/70
        "
      >
        {description}
      </p>


      {/* Bottom line */}

      <span
        className={`
          absolute
          bottom-0
          left-0
          h-px
          w-0
          transition-all
          duration-700
          group-hover:w-full
          ${
            purple
              ? "bg-violet-300"
              : "bg-cyan-300"
          }
        `}
      />

    </article>
  );
}


/* =========================================================
   RESEARCH PROCESS
========================================================= */

const researchStages = [
  {
    number: "01",
    title: "UNDERSTAND",
    subtitle: "THE MEDICAL PROBLEM",
    description:
      "We begin by understanding the disease, biological systems, symptoms, risk factors, diagnosis and current treatment approaches.",
    icon: Microscope,
  },

  {
    number: "02",
    title: "RESEARCH",
    subtitle: "EVIDENCE & KNOWLEDGE",
    description:
      "We explore scientific literature, existing research, AI applications, datasets and evidence to understand what is already known.",
    icon: FlaskConical,
  },

  {
    number: "03",
    title: "IDENTIFY",
    subtitle: "CHALLENGES & OPPORTUNITIES",
    description:
      "We identify limitations in current approaches and determine what information, data and opportunities may support technological solutions.",
    icon: BrainCircuit,
  },

  {
    number: "04",
    title: "ENGINEER",
    subtitle: "RESEARCH → DIRECTION",
    description:
      "We translate research findings into structured recommendations that can guide engineering and technology development.",
    icon: Cpu,
  },
];


/* =========================================================
   LEARNING FOCUS
========================================================= */

const learningAreas = [
  {
    number: "01",
    title: "MEDICINE",
    description:
      "Disease, diagnosis, treatment and real-world healthcare challenges.",
    icon: Microscope,
  },

  {
    number: "02",
    title: "BIOLOGY",
    description:
      "Biological systems, mechanisms and the science behind disease.",
    icon: Dna,
  },

  {
    number: "03",
    title: "ENGINEERING",
    description:
      "Translating research insights into structured technological approaches.",
    icon: Cpu,
  },

  {
    number: "04",
    title: "ARTIFICIAL INTELLIGENCE",
    description:
      "Exploring how AI and machine learning can support healthcare research and decision-making.",
    icon: BrainCircuit,
  },
];


/* =========================================================
   MISSION
========================================================= */

const missionItems = [
  {
    number: "01",
    title: "LEARN.",
    description:
      "Understand medicine, biology, disease and the science behind real healthcare problems.",
    icon: BookOpen,
  },

  {
    number: "02",
    title: "RESEARCH.",
    description:
      "Question existing knowledge, investigate evidence and explore what is already known.",
    icon: FlaskConical,
  },

  {
    number: "03",
    title: "COLLABORATE.",
    description:
      "Bring students from different disciplines together to learn and solve problems collectively.",
    icon: Users,
  },

  {
    number: "04",
    title: "BUILD.",
    description:
      "Translate research insights into structured technological directions and meaningful innovation.",
    icon: Cpu,
  },
];


/* =========================================================
   ABOUT PAGE
========================================================= */

export default function About() {

  return (

    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_15%_8%,rgba(8,145,178,0.07),transparent_30%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_85%_45%,rgba(79,70,229,0.05),transparent_32%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
          bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />


      {/* =====================================================
          01 — ABOUT US
      ===================================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-6
          md:px-10
          lg:px-14
          pt-24
          md:pt-28
          lg:pt-32
          pb-20
          md:pb-24
        "
      >

        <ChapterHeader
          number="01"
          title="ABOUT US"
          subtitle="MEDIFORGE / STUDENT RESEARCH & ENGINEERING LAB"
        />


        <Reveal delay={400}>

          <p
            className="
              mx-auto
              mt-8
              max-w-[760px]
              text-center
              text-[13px]
              md:text-sm
              lg:text-[15px]
              leading-[1.7]
              text-white/60
            "
          >
            Mediforge is a student-led research and innovation
            team exploring the intersection of medicine, biology,
            engineering and intelligent technology.
          </p>

        </Reveal>


        {/* Purpose + Vision */}

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-2
          "
        >

          <Reveal
            delay={550}
            direction="left"
            className="h-full"
          >

            <InfoCard
              number="01"
              title="OUR PURPOSE"
              icon={Target}
              description="
                Mediforge exists to create a research-driven environment where students can understand real medical problems, investigate the science behind them, and explore how technology can contribute meaningful solutions.
              "
            />

          </Reveal>


          <Reveal
            delay={700}
            direction="right"
            className="h-full"
          >

            <InfoCard
              number="02"
              title="OUR VISION"
              icon={Eye}
              accent="purple"
              description="
                We envision a generation of students capable of understanding medicine deeply, asking meaningful questions and exploring thoughtful technological answers.
              "
            />

          </Reveal>

        </div>

      </section>


      <SectionDivider />


      {/* =====================================================
          02 — WHAT WE DO
      ===================================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1200px]
          px-6
          md:px-10
          lg:px-14
          pt-24
          md:pt-28
          pb-20
          md:pb-24
        "
      >

        <ChapterHeader
          number="02"
          title="WHAT WE DO"
          subtitle="THE MEDIFORGE RESEARCH PROCESS"
        />


        <Reveal delay={400}>

          <p
            className="
              mx-auto
              mt-8
              max-w-[700px]
              text-center
              text-[13px]
              md:text-sm
              lg:text-[15px]
              leading-[1.7]
              text-white/60
            "
          >
            Every project begins by understanding the problem
            before attempting to engineer a solution.
          </p>

        </Reveal>


        {/* Timeline */}

        <div
          className="
            relative
            mt-12
            md:mt-14
          "
        >

          {/* Timeline line */}

          <div
            className="
              absolute
              left-[15px]
              top-0
              bottom-0
              w-px
              bg-gradient-to-b
              from-cyan-300/60
              via-white/[0.12]
              to-violet-300/50
              md:left-1/2
              md:-translate-x-1/2
            "
          />


          {researchStages.map((stage, index) => {

            const Icon = stage.icon;

            const rightSide =
              index % 2 === 1;

            return (

              <Reveal
                key={stage.number}
                delay={index * 150}
                direction={
                  rightSide
                    ? "right"
                    : "left"
                }
                className="relative"
              >

                <div
                  className={`
                    relative
                    mb-8
                    md:mb-10
                    flex
                    ${
                      rightSide
                        ? "md:justify-end"
                        : "md:justify-start"
                    }
                  `}
                >

                  {/* Timeline node */}

                  <div
                    className="
                      absolute
                      left-[3px]
                      top-7
                      z-20
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-cyan-300/50
                      bg-[#050505]
                      shadow-[0_0_18px_rgba(34,211,238,0.15)]
                      md:left-1/2
                      md:-translate-x-1/2
                    "
                  >

                    <div
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-cyan-300
                      "
                    />

                  </div>


                  {/* Timeline card */}

                  <div
                    className="
                      ml-12
                      w-full
                      rounded-xl
                      border
                      border-white/[0.11]
                      bg-white/[0.018]
                      p-5
                      md:ml-0
                      md:w-[44%]
                      md:p-6
                      transition-all
                      duration-700
                      hover:-translate-y-1
                      hover:border-cyan-300/30
                      hover:bg-white/[0.03]
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <span
                        className="
                          font-mono
                          text-[9px]
                          tracking-[0.2em]
                          text-cyan-300/75
                        "
                      >
                        {stage.number}
                      </span>

                      <Icon
                        size={18}
                        strokeWidth={1}
                        className="
                          text-white/20
                          transition-all
                          duration-500
                          hover:text-cyan-300
                          hover:scale-110
                        "
                      />

                    </div>


                    <h3
                      className="
                        mt-6
                        font-display
                        font-semibold
                        text-[clamp(1.25rem,2.1vw,1.9rem)]
                        leading-none
                        tracking-[-0.04em]
                        transition-all
                        duration-500
                        hover:text-cyan-100
                      "
                    >
                      {stage.title}
                    </h3>


                    <p
                      className="
                        mt-3
                        font-mono
                        text-[8px]
                        tracking-[0.16em]
                        text-cyan-300/55
                      "
                    >
                      {stage.subtitle}
                    </p>


                    <div
                      className="
                        mt-4
                        h-px
                        w-8
                        bg-cyan-300/50
                      "
                    />


                    <p
                      className="
                        mt-4
                        text-[13px]
                        md:text-sm
                        leading-[1.65]
                        text-white/55
                      "
                    >
                      {stage.description}
                    </p>

                  </div>

                </div>

              </Reveal>

            );
          })}

        </div>

      </section>


      <SectionDivider />


      {/* =====================================================
          03 — OUR LEARNING FOCUS
      ===================================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-6
          md:px-10
          lg:px-14
          pt-24
          md:pt-28
          pb-20
          md:pb-24
        "
      >

        <ChapterHeader
          number="03"
          title="OUR LEARNING FOCUS"
          subtitle="DISCIPLINES WE EXPLORE"
        />


        <Reveal delay={400}>

          <p
            className="
              mx-auto
              mt-8
              max-w-[760px]
              text-center
              text-[13px]
              md:text-sm
              lg:text-[15px]
              leading-[1.7]
              text-white/60
            "
          >
            Our work brings together different disciplines
            required to understand and approach complex
            healthcare problems.
          </p>

        </Reveal>


        {/* Discipline rows */}

        <div className="mt-12 md:mt-14">

          {learningAreas.map((area, index) => {

            const Icon = area.icon;

            const rightSide =
              index % 2 === 1;

            return (

              <Reveal
                key={area.number}
                delay={index * 130}
                direction={
                  rightSide
                    ? "right"
                    : "left"
                }
              >

                <div
                  className={`
                    group
                    grid
                    grid-cols-[42px_1fr]
                    items-center
                    gap-4
                    border-b
                    border-white/[0.13]
                    py-7
                    md:grid-cols-[55px_1fr_0.8fr]
                    md:gap-7
                    md:py-8
                    ${
                      rightSide
                        ? "md:pl-[10%]"
                        : "md:pr-[10%]"
                    }
                    transition-all
                    duration-500
                    hover:bg-white/[0.015]
                  `}
                >

                  {/* Number */}

                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.18em]
                      text-cyan-300/70
                    "
                  >
                    {area.number}
                  </span>


                  {/* Title */}

                  <div>

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <h3
                        className="
                          font-display
                          font-semibold
                          text-[clamp(1.45rem,2.5vw,2.5rem)]
                          leading-none
                          tracking-[-0.045em]
                          transition-all
                          duration-500
                          group-hover:translate-x-1.5
                          group-hover:text-cyan-100
                        "
                      >
                        {area.title}
                      </h3>


                      <Icon
                        size={17}
                        strokeWidth={1}
                        className="
                          text-white/20
                          transition-all
                          duration-500
                          group-hover:text-cyan-300/80
                          group-hover:scale-110
                        "
                      />

                    </div>


                    <div
                      className="
                        mt-3
                        h-px
                        w-7
                        bg-cyan-300/50
                        transition-all
                        duration-500
                        group-hover:w-12
                      "
                    />

                  </div>


                  {/* Description */}

                  <p
                    className="
                      col-start-2
                      text-[13px]
                      md:col-start-auto
                      md:text-sm
                      lg:text-[15px]
                      leading-[1.65]
                      text-white/55
                      transition-colors
                      duration-500
                      group-hover:text-white/70
                    "
                  >
                    {area.description}
                  </p>

                </div>

              </Reveal>

            );
          })}

        </div>

      </section>


      <SectionDivider />


      {/* =====================================================
          04 — OUR MISSION
      ===================================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-6
          md:px-10
          lg:px-14
          pt-24
          md:pt-28
          pb-24
          md:pb-28
        "
      >

        <ChapterHeader
          number="04"
          title="OUR MISSION"
          subtitle="HOW WE MOVE FORWARD"
        />


        <Reveal delay={400}>

          <p
            className="
              mx-auto
              mt-8
              max-w-[820px]
              text-center
              text-[13px]
              md:text-sm
              lg:text-[15px]
              leading-[1.7]
              text-white/60
            "
          >
            We create a research-driven environment where
            students investigate real-world problems,
            collaborate across disciplines and transform
            evidence-based insights into innovative
            technological directions.
          </p>

        </Reveal>


        {/* Mission grid */}

        <div
          className="
            mt-12
            md:mt-14
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >

          {missionItems.map((item, index) => (

            <Reveal
              key={item.number}
              delay={index * 130}
              direction={
                index % 2 === 0
                  ? "left"
                  : "right"
              }
              className="h-full"
            >

              <InfoCard
                number={item.number}
                title={item.title}
                description={item.description}
                icon={item.icon}
                accent={
                  index % 2 === 0
                    ? "cyan"
                    : "purple"
                }
              />

            </Reveal>

          ))}

        </div>

      </section>


      {/* =====================================================
          FINAL PHILOSOPHY
      ===================================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-6
          md:px-10
          lg:px-14
          pb-28
          md:pb-36
        "
      >

        <Reveal>

          <div
            className="
              border-t
              border-white/[0.15]
              pt-6
              text-center
            "
          >

            <p
              className="
                font-mono
                text-[8px]
                md:text-[9px]
                tracking-[0.24em]
                text-cyan-300/70
              "
            >
              MEDIFORGE / RESEARCH PHILOSOPHY
            </p>

          </div>

        </Reveal>


        <div
          className="
            mt-12
            md:mt-16
            text-center
          "
        >

          <Reveal delay={120}>

            <h3
              className="
                font-display
                font-semibold
                text-[clamp(2.7rem,6vw,6.8rem)]
                leading-[0.8]
                tracking-[-0.07em]
                transition-all
                duration-700
                hover:text-cyan-100
              "
            >
              RESEARCH

              <span className="text-white/25">
                {" "}FIRST.
              </span>

            </h3>

          </Reveal>


          <Reveal delay={280}>

            <h3
              className="
                mt-3
                font-display
                font-semibold
                text-[clamp(2.7rem,6vw,6.8rem)]
                leading-[0.8]
                tracking-[-0.07em]
                text-cyan-300
                transition-all
                duration-700
                hover:tracking-[-0.085em]
              "
            >
              ENGINEERING

              <span className="text-cyan-300/30">
                {" "}NEXT.
              </span>

            </h3>

          </Reveal>


          <Reveal delay={440}>

            <h3
              className="
                mt-3
                font-display
                font-semibold
                text-[clamp(2.7rem,6vw,6.8rem)]
                leading-[0.8]
                tracking-[-0.07em]
                transition-all
                duration-700
                hover:text-cyan-100
              "
            >
              INNOVATION

              <span className="text-white/25">
                {" "}ALWAYS.
              </span>

            </h3>

          </Reveal>

        </div>


        {/* Bottom indicator */}

        <Reveal delay={650}>

          <div
            className="
              mt-12
              flex
              flex-col
              items-center
              gap-3
            "
          >

            <ArrowDown
              size={15}
              strokeWidth={1}
              className="
                animate-bounce
                text-cyan-300/65
              "
            />

            <span
              className="
                font-mono
                text-[8px]
                tracking-[0.23em]
                text-white/30
              "
            >
              CONTINUE EXPLORING MEDIFORGE
            </span>

          </div>

        </Reveal>

      </section>

    </section>
  );
}