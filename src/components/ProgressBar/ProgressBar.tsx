import './ProgressBar.scss';

interface PBProps {
  current: number;
  max: number;
  color: string;
  secondaryColor: string;
  width: number;
  strokeWidth: number;
}

function ProgressBar(props: PBProps) {
  const { color, current, max, width, strokeWidth, secondaryColor } = props;

  const R = (width / 2) - (strokeWidth * 2);
  const circumfence = 2 * Math.PI * R;
  const offset = circumfence - (current / (max==0?1:max)) * circumfence;

  return (
    <div className="progress-bar-container" style={{ width: `${width}px`, height: `${width}px` }}>
      <div className="progress-bar-text-container">
        <span>{current}/{max}</span>
      </div>

      <svg width='100%' height='100%'>
        <circle 
          strokeWidth={strokeWidth}
          fill='#fff' 
          r={R} 
          cx={width / 2} 
          cy={width / 2} 
          stroke={secondaryColor} 
          strokeDasharray={`${circumfence} ${circumfence}`} 
        />
        <circle
          style={{transform: 'rotate(-90deg)', transformOrigin: '50% 50%'}}
          strokeWidth={strokeWidth} 
          fill='#fff' 
          r={R} 
          cx={width / 2} 
          cy={width / 2} 
          stroke={color} 
          strokeDasharray={`${circumfence} ${circumfence}`}
          strokeDashoffset={offset}
        />
      </svg>

    </div>
  );
};

export default ProgressBar;