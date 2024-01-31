import { useEffect, useRef, useState } from "react";
import { ContainerProps } from "./types";

export const Container = ({ totalWater, setTotalWater }: ContainerProps) => {
  const [waterLevel, setWaterLevel] = useState(0);
  const ref = useRef<number | undefined>();
  const levelRef = useRef<number | undefined>();
  const averageWater = totalWater / 4;

  useEffect(() => {
    levelRef.current = setTimeout(startLevelingUp, 1000, waterLevel);
    return () => clearTimeout(levelRef.current);
  }, [totalWater]);

  function startFillingWater() {
    ref.current = setTimeout(setNewLevel, 1000, waterLevel, 250, totalWater);
  }

  function setNewLevel(
    previousWaterLevel: number,
    addition: number,
    newTotalWater: number
  ) {
    const newWaterLevel = previousWaterLevel + addition;
    if (!(newWaterLevel > 1000)) {
      setWaterLevel(newWaterLevel);
      setTotalWater(newTotalWater + addition);
      ref.current = setTimeout(
        setNewLevel,
        1000,
        newWaterLevel,
        250,
        newTotalWater + addition
      );
    }
  }

  function stopFillingWater() {
    clearTimeout(ref.current);
  }

  function startLevelingUp(previousWaterLevel: number) {
    if (previousWaterLevel == averageWater) {
      clearTimeout(levelRef.current);
      return;
    }
    const addition = Math.min(
      previousWaterLevel > averageWater
        ? previousWaterLevel - averageWater
        : averageWater - previousWaterLevel,
      25
    );
    const newWaterLevel =
      previousWaterLevel +
      (previousWaterLevel > averageWater ? -addition : addition);
    setWaterLevel(newWaterLevel);
    levelRef.current = setTimeout(startLevelingUp, 1000, newWaterLevel);
  }

  function emptyTank() {
    setWaterLevel(0);
    setTotalWater(totalWater - waterLevel);
  }

  return (
    <div className="container__main">
      <button
        className="add-btn"
        onMouseDown={startFillingWater}
        onMouseUp={stopFillingWater}
        onPointerUp={startFillingWater}
        onPointerDown={stopFillingWater}
      >
        Add
      </button>
      <button className="empty-btn" onClick={emptyTank}>
        Empty
      </button>
      <div className="container" key={2}>
        <div
          className="water-level "
          style={
            {
              "--water-level": `${
                waterLevel == 0 ? 0 : Math.round(waterLevel / 10)
              }%`,
              "--border": waterLevel == 0 ? "0px" : "4px",
            } as React.CSSProperties
          }
        ></div>
      </div>
      <h3>{waterLevel} L</h3>
    </div>
  );
};
