import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 8) + 3;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setTimeout(() => {
          setFinished(true);
        }, 350);
      }

      setProgress(value);
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="
            fixed
            inset-0
            z-[99999]
            flex
            min-h-screen
            flex-col
            justify-between
            bg-[#080808]
            px-6
            py-7
            text-white
            sm:px-10
            sm:py-9
            lg:px-14
            lg:py-10
          "
        >

          {/* TOP */}

          <div className="flex items-start justify-between">

            <div>

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-therynox-orange
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-white
                  "
                >
                  THERYNOX
                </span>

              </div>

              <p
                className="
                  mt-1
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                "
              >
                WEB STUDIO
              </p>

            </div>


            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-white/25
              "
            >
              2026
            </span>

          </div>


          {/* CENTER */}

          <div className="mx-auto w-full max-w-[1200px]">

            <div className="overflow-hidden">

          
          



          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* Soft glow */}
            <div
              className="
                pointer-events-none
                absolute
                -inset-x-10
                top-1/2
                h-32
                -translate-y-1/2
                bg-orange-500/10
                blur-[80px]
              "
            />

            <h1
              className="
                relative
                whitespace-nowrap
                text-[8vw]
                font-semibold
                leading-[0.82]
                tracking-[-0.085em]
                text-white
                sm:text-[7vw]
                lg:text-[6.5vw]
              "
            >
              THERYNOX{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-[#ff6a00]
                  via-[#ff9a3d]
                  to-[#ff5a00]
                  bg-[length:200%_100%]
                  bg-clip-text
                  text-transparent
                  animate-[gradient_3s_ease_infinite]
                "
              >
                WEB STUDIO
              </span>
            </h1>
          </motion.div>















            </div>


            <div
              className="
                mt-8
                flex
                items-center
                justify-between
                gap-5
              "
            >

              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-white/30
                "
              >
                Building digital experiences
              </span>


              <motion.span
                key={progress}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="
                  text-sm
                  font-medium
                  tracking-[-0.03em]
                  text-white
                "
              >
                {String(progress).padStart(
                  3,
                  "0"
                )}
                %
              </motion.span>

            </div>


            {/* PROGRESS */}

            <div
              className="
                relative
                mt-4
                h-[2px]
                w-full
                overflow-hidden
                bg-white/10
              "
            >

              <motion.div
                className="
                  absolute
                  inset-y-0
                  left-0
                  bg-therynox-orange
                "
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.15,
                  ease: "linear",
                }}
              />

            </div>

          </div>


          {/* BOTTOM */}

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-white/20
              "
            >
              Digital · Design · Development
            </span>


            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-white/20
              "
            >
              Loading experience...
            </span>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}