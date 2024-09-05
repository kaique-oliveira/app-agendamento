import { useRef } from 'react';
import { IScheduling } from '../../Interfaces';
import { HourCard, TitleCard, WrapperCard, WrapperHours } from './styles';
import { AnimatePresence } from 'framer-motion';

type CardSchedulingProps = {
  scheduling: IScheduling;
  state: 'PREVIOUS' | 'NEXT' | 'CURRENT';
  onOpenDetails(value: boolean): void;
  onFocusScheduled(scheduled: IScheduling | null): void;
};

export function CardScheduling({
  scheduling,
  state,
  onOpenDetails,
  onFocusScheduled,
}: CardSchedulingProps) {
  const refCard = useRef<HTMLDivElement>(null);

  const heightBase =
    +scheduling.endTime.split('T')[1].split(':')[0] -
    +scheduling.startTime.split('T')[1].split(':')[0];

  const metadeStart = +scheduling.startTime.split('T')[1].split(':')[1]
    ? 18
    : 0;
  const metadeEnd = +scheduling.endTime.split('T')[1].split(':')[1] ? 18 : 0;
  const sum =
    metadeStart === 18 && metadeEnd === 18
      ? 2
      : metadeStart === 18 && metadeEnd === 0
      ? -18
      : metadeStart === 0 && metadeEnd === 18
      ? 18
      : 0;


  return (
    <AnimatePresence mode="wait">
      {scheduling && (
        <WrapperCard
          ref={refCard}
          onMouseDown={() => {
            refCard.current!.style.transform = 'scale(.95)';
            refCard.current!.style.boxShadow =
              'rgba(0, 0, 0, 0.2) 0px 0px 8px 0px;';
          }}
          onMouseUp={() => (refCard.current!.style.transform = 'scale(1)')}
          onMouseLeave={() => (refCard.current!.style.transform = 'scale(1)')}
          onClick={() => {
            onFocusScheduled(scheduling);
            onOpenDetails(true);
          }}
          $state={state}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.05,
            ease: 'backIn',
          }}
          $height={heightBase * 37 + sum}
          $position={metadeStart}
          style={{ borderRadius: heightBase * 37 + sum <= 37 ? '6px' : '10px' }}
        >
          <TitleCard> {scheduling.ownerScheduled}</TitleCard>

          {heightBase * 37 + sum > 37 && (
            <WrapperHours>
              <HourCard>
                {' '}
                {scheduling.startTime.split('T')[1].substring(0, 5)}
              </HourCard>
              <HourCard>
                {' '}
                {scheduling.endTime.split('T')[1].substring(0, 5)}
              </HourCard>
            </WrapperHours>
          )}
        </WrapperCard>
      )}
    </AnimatePresence>
  );
}
