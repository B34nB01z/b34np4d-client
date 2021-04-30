import { CTF } from '../../models/ctf';

interface TableProps {
    ctfs: CTF[];
}

function CTFTable(props: TableProps) {

  return(
      <table className="ctf-table">
          <tr>
              <th>Name</th><th>From/To</th><th>Challenges</th>
          </tr>
          {props.ctfs
            .sort((a,b) => a.id-b.id)
            .map((ctf: CTF) => {
              return(
                <tr>
                  <td><a href={ctf.url ? ctf.url : '#'}>{ctf.name}</a></td>
                  <td>{ctf.start?.toLocaleString()} - {ctf.end?.toLocaleString()}</td>
                  <td>{ctf.challenges?.filter(c => c.done).length}/{ctf.challenges?.length}</td>
                </tr>
              )
            })}
      </table>
  );

}

export default CTFTable;