'use client'
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

import { LayoutGroup, motion } from 'framer-motion';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const selectedColor = COLORS[timeElapsed % 3];

  React.useEffect(() => {
    let intervalId = null;
    if(isRunning) {
      intervalId = window.setInterval(() => {
        setTimeElapsed(timeElapsed + 1);
      }, 1000);

      return () => {
        window.clearInterval(intervalId);
      };      
    }
    else {
      window.clearInterval(intervalId);      
    }
  }, [isRunning, timeElapsed]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div layoutId={`selected-color-outline-${id}`}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => {
            if(isRunning) {
              setIsRunning(false);
            }
            else {
              setIsRunning(true);              
              setTimeElapsed(timeElapsed + 1);
            }
          }}>
            {isRunning ? <Pause /> :  <Play />}
            <VisuallyHidden>{isRunning ? 'Pause' :  'Play'}</VisuallyHidden>
          </button>
          <button onClick={() => {
            setIsRunning(false);
            setTimeElapsed(0);
          }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
