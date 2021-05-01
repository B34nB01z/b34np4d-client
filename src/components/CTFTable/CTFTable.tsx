import { CTF } from '../../models/ctf';
import './CTFTable.scss';

interface TableProps {
  ctfs: CTF[];
}

function CTFTable(props: TableProps) {

  const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <table className="ctf-table">
      <thead>
        <tr>
          <th>Name</th><th>From/To</th><th>Challenges</th>
        </tr>
      </thead>
      <tbody>
        {props.ctfs
          .sort((a, b) => b.id - a.id)
          .map((ctf: CTF) => {
            return (
              <tr>
                <td><a href={ctf.url ? ctf.url : '#'}>{ctf.name}</a></td>
                <td>Start: {dateFormat.format(ctf.start)} <br /> &nbsp;&nbsp;End: {dateFormat.format(ctf.end)}</td>
                <td>{ctf.challenges?.filter(c => c.done).length}/{ctf.challenges?.length}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  );

}

export default CTFTable;