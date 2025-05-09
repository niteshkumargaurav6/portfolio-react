import React, { useRef, useState } from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram
} from "@tabler/icons-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

export function FloatingDockDemo() {
  const iconClass = "h-5 w-5 text-neutral-700 dark:text-neutral-300";

  const links = [
    {
      title: "Home",
      icon: <IconHome className={iconClass} />,
      href: "#"
    },
    {
      title: "Twitter",
      icon: <IconBrandX className={iconClass} />,
      href: "https://x.com/niteshkumargau4"
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className={iconClass} />,
      href: "https://github.com/niteshkumargaurav6"
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className={iconClass} />,
      href: "https://www.linkedin.com/in/niteshkumargaurav"
    },
    {
      title: "Google Scholar",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Scholar_logo.svg"
          alt="Google Scholar"
          className="h-6 w-6 object-contain"
        />
      ),
      href: "https://scholar.google.com/citations?user=Ngg57s8AAAAJ&hl=en"
    },
    {
      title: "Facebook",
      icon: <IconBrandFacebook className={iconClass} />,
      href: "https://facebook.com/yourprofile"
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className={iconClass} />,
      href: "https://instagram.com/yourprofile"
    }
  ];

  return (
    <div className="floating-dock">
      <ul>
        {links.map((link, index) => (
          <IconContainer key={index} title={link.title} icon={link.icon} href={link.href} />
        ))}
      </ul>
    </div>
  );
}

function IconContainer({ title, icon, href }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(Infinity);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    mouseX.set(e.pageX);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    setHovered(false);
  };

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <li className="relative group">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={ref}
          style={{ width, height }}
          className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
        >
          <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
            {icon}
          </motion.div>
        </motion.div>
      </a>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
