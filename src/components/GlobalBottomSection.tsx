"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import modalCarImage from "../../modalcar.png";
import cancelImage from "../../cancel.png";
import hoverCancelImage from "../../hovercal.png";
import checkboxImage from "../../checkbox.png";
import checkboxCheckedImage from "../../1checkbox.png";

const assets = {
  logoDark:
    "https://www.figma.com/api/mcp/asset/c09e776a-e946-486b-9d81-f10ca738c3e0",
  logoFooter: "/footer logo.svg",
  location: "/icon_location_s.svg",
  communicate: "/icon_communicate_s.svg",
  x: "/X.png",
  linkedIn: "/link.png",
  instagram: "/ins.png",
  youtube: "/YouTube.png",
};

const footerNav = ["Product", "Scenarios", "Resources", "About us"];
const policyLinks = ["Cookie Policy", "Terms of Use", "Privacy Policy"];

export function GlobalBottomSection() {
  const [futureTruckEntered, setFutureTruckEntered] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [typedCharCount, setTypedCharCount] = useState(0);
  const [modalChecks, setModalChecks] = useState({
    advocate: false,
    updates: true,
    terms: true,
  });

  const titleLine1 = "Making Logistics";
  const titleLine2 = "Simpler.";
  const totalTitleCharCount = titleLine1.length + titleLine2.length;

  useEffect(() => {
    if (!isSignupModalOpen) {
      return;
    }
    const timer = window.setInterval(() => {
      setTypedCharCount((prev) => {
        if (prev >= totalTitleCharCount) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 65);

    return () => window.clearInterval(timer);
  }, [isSignupModalOpen, totalTitleCharCount]);

  const typedLine1 =
    typedCharCount <= titleLine1.length
      ? titleLine1.slice(0, typedCharCount)
      : titleLine1;
  const typedLine2 =
    typedCharCount <= titleLine1.length
      ? ""
      : titleLine2.slice(0, typedCharCount - titleLine1.length);

  const handleFutureSectionEnter = () => {
    setFutureTruckEntered(true);
  };

  const handleOpenSignupModal = () => {
    setTypedCharCount(0);
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
    setTypedCharCount(0);
  };

  const toggleModalCheck = (key: keyof typeof modalChecks) => {
    setModalChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <motion.section
        className="relative overflow-visible bg-[#222943] px-6 py-14 text-white md:py-16"
        viewport={{ amount: 0.25, once: true }}
        onViewportEnter={handleFutureSectionEnter}
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[860px]">
            <h2 className="text-[40px] font-bold leading-[1.1] md:text-[50px] md:leading-[59px]">
              Shaping the Future
              <br />
              of Autonomous Logistics
            </h2>
            <p className="mt-5 max-w-[880px] text-[16px] leading-8 text-white/90 md:text-[24px] md:leading-8">
              Empowering organizations worldwide to move goods safely,
              efficiently, and sustainably with autonomous logistics
              solutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-[13px]">
              <button className="h-[34px] rounded-[3px] border border-[#f0f1f2] px-4 text-[16px]">
                Partner With Us
              </button>
              <button className="h-[34px] rounded-[3px] bg-white px-4 text-[16px] font-medium text-[#222943]">
                Contact Sales
              </button>
            </div>
          </div>

          <motion.div
            initial={{ x: 560, opacity: 0 }}
            animate={
              futureTruckEntered
                ? { x: 0, opacity: 1 }
                : { x: 560, opacity: 0 }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-50 mx-auto shrink-0 lg:mx-0 lg:mr-20 lg:translate-y-[200px]"
          >
            <Image
              src={assets.logoDark}
              alt="truck visual"
              width={290}
              height={180}
              className="h-[180px] w-[290px]"
            />
          </motion.div>
        </div>
      </motion.section>

      <section className="border-b border-[#e6e8ef] bg-white px-6 py-10 md:py-8">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Image
              src={assets.logoFooter}
              alt="zelostech"
              width={230}
              height={36}
              className="h-9 w-auto"
            />

            <div className="mt-8 space-y-4 text-[14px] text-[#8e919f]">
              <div className="flex items-start gap-[15px]">
                <Image src={assets.location} alt="" width={20} height={20} />
                <p>
                  Singapore: 2 Science Park Drive, #02-08 Ascent, Singapore
                  118222
                </p>
              </div>
              <div className="flex items-start gap-[14px]">
                <Image src={assets.communicate} alt="" width={20} height={20} />
                <p>marketing@zelostech.com | sales@zelostech.com</p>
              </div>
            </div>

            <p className="mt-10 text-[14px] text-[#8e919f]">
              Sign up for updates to get the latest on zelostech
            </p>
            <div className="relative mt-5">
              <button
                className="h-[34px] w-[100px] rounded-[3px] bg-[#222943] text-[16px] font-medium text-white shadow-[0px_4px_8px_0px_rgba(0,94,255,0.08)]"
                onClick={handleOpenSignupModal}
              >
                Sign up
              </button>

              <AnimatePresence>
                {isSignupModalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-[52px] left-0 z-40 h-[340px] w-[452px] max-w-[calc(100vw-40px)] rounded-[9px] bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.10)]"
                  >
                    <div className="relative h-full overflow-hidden rounded-[9px]">
                      <button
                        aria-label="Close sign up modal"
                        className="absolute right-5 top-5 z-30 h-6 w-6"
                        onClick={handleCloseSignupModal}
                        onMouseEnter={() => setIsCloseHovered(true)}
                        onMouseLeave={() => setIsCloseHovered(false)}
                      >
                        <Image
                          src={isCloseHovered ? hoverCancelImage : cancelImage}
                          alt="Close"
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                      </button>

                      <div className="flex items-start pl-[30px] pt-[30px]">
                        <h3 className="text-[25px] font-semibold leading-[1.2] text-[#222943] font-['Poppins']">
                          {typedLine1}
                          <br />
                          <span className="text-[#25cacc]">{typedLine2}</span>
                        </h3>
                        <motion.div
                          key={isSignupModalOpen ? "car-open" : "car-close"}
                          initial={{ x: 0, opacity: 1 }}
                          animate={{ x: 20, opacity: 1 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="pointer-events-none ml-[10px] mt-[-10px] shrink-0"
                        >
                          <Image
                            src={modalCarImage}
                            alt="Modal vehicle"
                            width={134}
                            height={76}
                            className="h-[76px] w-[134px]"
                            priority
                          />
                        </motion.div>
                      </div>

                      <div className="mt-[25px] px-[30px]">
                        <p className="text-[14px] font-medium text-[#222943]">
                          * Email Address
                        </p>
                        <p className="mt-[5px] text-[14px] font-medium text-[#222943] font-['Poppins']">
                          78u980808@gmail.com
                        </p>
                        <div className="mt-2 h-px w-full bg-[#a3abc3]" />

                        <label className="mt-4 flex items-center gap-2 text-[10px] font-normal text-[#222943] font-['Poppins']">
                          <button
                            type="button"
                            className="h-4 w-4 shrink-0"
                            aria-label="Toggle advocate checkbox"
                            aria-pressed={modalChecks.advocate}
                            onClick={() => toggleModalCheck("advocate")}
                          >
                            <Image
                              src={
                                modalChecks.advocate
                                  ? checkboxCheckedImage
                                  : checkboxImage
                              }
                              alt=""
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          </button>
                          Contact me to help advocate to bring Zelostech to my
                          city.
                        </label>
                        <label className="mt-2 flex items-center gap-2 text-[10px] font-normal text-[#222943] font-['Poppins']">
                          <button
                            type="button"
                            className="h-4 w-4 shrink-0"
                            aria-label="Toggle updates checkbox"
                            aria-pressed={modalChecks.updates}
                            onClick={() => toggleModalCheck("updates")}
                          >
                            <Image
                              src={
                                modalChecks.updates
                                  ? checkboxCheckedImage
                                  : checkboxImage
                              }
                              alt=""
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          </button>
                          Send me regular updates on the latest from Zelostech.
                        </label>
                        <label className="mt-2 flex items-center gap-2 text-[10px] font-normal text-[#222943] font-['Poppins']">
                          <button
                            type="button"
                            className="h-4 w-4 shrink-0"
                            aria-label="Toggle terms checkbox"
                            aria-pressed={modalChecks.terms}
                            onClick={() => toggleModalCheck("terms")}
                          >
                            <Image
                              src={
                                modalChecks.terms
                                  ? checkboxCheckedImage
                                  : checkboxImage
                              }
                              alt=""
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          </button>
                          By submitting this form, you agree to our Terms of
                          Service and Privacy Policy.
                        </label>

                        <button className="mt-[25px] h-9 w-[106px] rounded-[3px] border border-[#222943] text-[16px] font-medium text-[#222943]">
                          Submit
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:mt-20 lg:w-[290px] lg:justify-self-end lg:mr-20 lg:translate-x-[20px]">
            <ul className="space-y-4 text-[24px] font-semibold leading-8">
              {footerNav.map((item) => (
                <li
                  key={item}
                  className={item === "Scenarios" ? "text-[#25cacc]" : "text-[#222943]"}
                >
                  <a href="#" className="inline-flex items-center gap-2">
                    {item}
                    {item === "Scenarios" && (
                      <span className="text-base leading-none">›</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-[#fafafb] px-6 py-7">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-[14px] text-[#040b29]/50">
            <span>© 2026 Zelos Technology (Global) PTE. LTD.</span>
            {policyLinks.map((item) => (
              <span key={item} className="inline-flex items-center gap-3">
                <span className="h-[9px] w-px rounded-full bg-[#040b29]/25" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <Image src={assets.x} alt="X" width={32} height={32} />
            <Image src={assets.linkedIn} alt="LinkedIn" width={32} height={32} />
            <Image src={assets.instagram} alt="Instagram" width={32} height={32} />
            <Image src={assets.youtube} alt="YouTube" width={32} height={32} />
          </div>
        </div>
      </footer>
    </>
  );
}
