import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MathSolution = ({ solution }) => {
  console.log(solution);
  return (
    <div className="math-solution">
      {solution.split("\n").map((line, index) => (
        <div key={index} style={{ marginBottom: "1em" }}>
          {line.trim() ? (
            <BlockMath math={line} />
          ) : (
            <br />
          )}
        </div>
      ))}
    </div>
  );
};

export default MathSolution;
