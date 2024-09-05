import { VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperDatePicker = styled(VStack)`
  width: 38px;
  height: 38px;

  position: relative;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  cursor: pointer;
`;

export const WrapperCalendar = styled(motion.div)`
  width: max-content;
  height: max-content;

  display: flex;

  position: absolute;

  z-index: 300;
  top: 0;
  left: 0;

  border-radius: 12px;

  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 8px;
`;
