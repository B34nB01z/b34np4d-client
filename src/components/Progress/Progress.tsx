import { Challenge } from "../../models/challenge";
import ProgressBar from "../ProgressBar/ProgressBar";

interface ProgressProps {
  ctfName: string;
  ctfUrl: string;
  chals: Challenge[];
}

export function Progress(props: ProgressProps) {

  const {ctfName, ctfUrl, chals} = props;

  const maxPoints = chals.map(c => c.points).reduce((a,b) => a+b, 0);
  const curPoints = chals.map(c => c.done ? c.points : 0).reduce((a,b) => a+b, 0);
  
  const maxDone = chals.length;
  const curDone = chals.map(c => c.done).length;

  return (
    <div id="progress">
      <h4><a href={ctfUrl} target="_blank" rel="noopener noreferrer">{ctfName}</a></h4>
      <ProgressBar key="challenges" current={curDone} max={maxDone} color={'#6a1b9a'} secondaryColor={'#ededed'} width={100} strokeWidth={7} />
      <ProgressBar key="points" current={curPoints} max={maxPoints} color={'#ef6c00'} secondaryColor={'#ededed'} width={100} strokeWidth={7} />
    </div>
  );

}

export default Progress;