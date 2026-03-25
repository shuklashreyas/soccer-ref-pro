import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

const AnimatedCard = ({ children, index = 0, className }: AnimatedCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    whileHover={{
      y: -4,
      transition: { duration: 0.2 },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;
