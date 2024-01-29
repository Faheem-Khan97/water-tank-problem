import { useState } from "react";
import "./App.css";
import { Container } from "./WaterContainer";
function App() {
  const [totalWater, setTotalWater] = useState(0);

  return (
    <div className="main">
      <h1>Total water: {totalWater}</h1>
      <div className="tanks">
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return (
              <Container
                key={index}
                setTotalWater={setTotalWater}
                totalWater={totalWater}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
