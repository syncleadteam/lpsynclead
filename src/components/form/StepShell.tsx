import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function StepShell({ children, k }: { children: ReactNode; k: string | number }) {
  return (
    <motion.div
      key={k}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}