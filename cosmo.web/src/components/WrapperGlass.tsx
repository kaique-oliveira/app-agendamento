import { motion, MotionProps } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

type WrapperGlassType = React.HTMLAttributes<HTMLDivElement> & MotionProps;

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  background-color: rgb(0, 0, 0, 0.06);
  backdrop-filter: blur(3px);
`;

export default function WrapperGlass({ ...rest }: WrapperGlassType) {
  return (
    <Wrapper
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    />
  );
}
