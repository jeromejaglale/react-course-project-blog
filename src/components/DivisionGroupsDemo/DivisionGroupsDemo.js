'use client';
import React from 'react';
import clsx from 'clsx';

import { range } from '@/utils';
import Card from '@/components/Card';
import SliderControl from '@/components/SliderControl';

import Equation from './Equation';
import styles from './DivisionGroupsDemo.module.css';

import { LayoutGroup, motion } from 'framer-motion';

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  const id = React.useId();

  const [numOfGroups, setNumOfGroups] = React.useState(
    initialNumOfGroups
  );

  const numOfItemsPerGroup = Math.floor(
    numOfItems / numOfGroups
  );

  const remainder = includeRemainderArea
    ? numOfItems % numOfGroups
    : null;

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        };

  return (
    <Card as="section" className={styles.wrapper}>
      <header className={styles.header}>
        <SliderControl
          label="Number of Groups"
          className={styles.slider}
          step={1}
          min={1}
          max={4}
          value={numOfGroups}
          onChange={(ev) =>
            setNumOfGroups(Number(ev.target.value))
          }
        />
      </header>

      <LayoutGroup>
      <div className={styles.demoWrapper}>
        <motion.div
          className={clsx(styles.demoArea)}
          style={gridStructure}
        >
          {range(numOfGroups).map((groupIndex) => (
            <motion.div key={groupIndex} className={styles.group}>
              {range(numOfItemsPerGroup).map((index) => {
                return (
                  <motion.div layoutId={`test-${groupIndex}-${index}`}
                    key={`test-${groupIndex}-${index}`}
                    id={`test-${groupIndex}-${index}`}
                    className={styles.item}
                  />
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>
      </LayoutGroup>

      {includeRemainderArea && (
        <div className={styles.remainderArea}>
          <p className={styles.remainderHeading}>
            Remainder Area
          </p>

          {range(remainder).map((index) => {
            return (
              <div key={index} className={styles.item} />
            );
          })}
        </div>
      )}

      <Equation
        dividend={numOfItems}
        divisor={numOfGroups}
        remainder={remainder}
      />
    </Card>
  );
}

export default DivisionGroupsDemo;
