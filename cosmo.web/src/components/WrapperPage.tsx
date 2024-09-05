import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

type WrapperPageProps = MotionProps;

export function WrapperPage({ ...rest }: WrapperPageProps) {
  return (
    <AnimatePresence mode="wait">
      <Wrapper
        {...rest}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: 'linear',
        }}
      />
      ;
    </AnimatePresence>
  );
}
