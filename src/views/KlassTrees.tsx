import React from "react";

import "./KlassTrees.css";
import { config } from "../config";
import { useTalentContext } from "../TalentContext";
import { TalentTree } from "../components/TalentTree";
import { ClearButton } from "../components/ClearButton";

interface Props {
  klass: string;
}

export const KlassTrees: React.FC<Props> = ({ klass }) => {
  const { data, points, pointsSpent, resetAll } = useTalentContext();

  const treeNames = Object.keys(data);
  const treePoints = Object.values(pointsSpent).map(
    (value, i, arr) => `${value}${i < arr.length - 1 ? "/" : ""}`,
  );
  const requiredLevel =
    config.TOTAL_POINTS - points + config.FIRST_POINT_LEVEL - 1;

  return (
    <div className="KlassTrees-container">
      <div className="KlassTrees">
        <div className="KlassTrees-header">
          <div className="KlassTrees-titleArea">
            <h1>
              {klass} {treePoints}
            </h1>
            <p className="KlassTrees-summary">
              Required level: {requiredLevel >= 10 ? requiredLevel : "-"}
            </p>
            <p className="KlassTrees-summary">Points left: {points}</p>
          </div>
          <ClearButton onClick={() => resetAll()}>Clear all</ClearButton>
        </div>
        <div className="KlassTrees-list">
          {treeNames.map(name => (
            <TalentTree key={name} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
};
