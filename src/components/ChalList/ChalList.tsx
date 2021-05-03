import { useState } from "react";
import { Category } from "../../models/category";
import { Challenge } from "../../models/challenge";
import './ChalList.scss';

interface ChalListProps {
  chals: Challenge[];
  cats: Category[];
  handleDone: (chal: Challenge) => void;
}

function ChalList(props: ChalListProps) {
  const { chals, cats, handleDone } = props;

  return(
    <div>
      {cats.map(cat => {
        if(chals.some(chal => chal.category == cat.id))
          return(
            <div key={cat.id} className="ctf-category">
              <h4>{cat.name} [{chals.filter(chal => (chal.category == cat.id && chal.done)).length}/{chals.filter(chal => chal.category == cat.id).length}]</h4>
              <ul className="challenge-list">
              {chals.map(chal => {
                if(chal.category == cat.id)
                  return(
                    <li key={chal.id}><input type="checkbox" onClick={() => handleDone(chal)} checked={chal.done}/> [{chal.points }]{chal.name}</li>
                  )
              })}
              </ul>
            </div>
          );
      })}
    </div>
  );
}

export default ChalList;