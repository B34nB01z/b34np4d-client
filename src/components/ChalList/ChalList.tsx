import { Category } from "../../models/category";
import { Challenge } from "../../models/challenge";

interface ChalListProps {
  chals: Challenge[];
  cats: Category[];
}

function ChalList(props: ChalListProps) {
  const { chals, cats } = props;

  return(
    <div>
      {cats.map(cat => {
        if(chals.some(chal => chal.category == cat.id))
          return(
            <div key={cat.id} className="ctf-category">
              <h4>{cat.name} [{chals.filter(chal => (chal.category == cat.id && chal.done)).length}/{chals.filter(chal => chal.category == cat.id).length}]</h4>
              <ul>
              {chals.map(chal => {
                if(chal.category == cat.id)
                  return(
                    <li key={chal.id}>[{chal.points }]{chal.name}</li>
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