import { QuickButtonTypes } from 'src/store/types';
import './styles.scss';

type Props = {
  button: QuickButtonTypes;
  onQuickButtonClicked: (event: any, value: string | number) => any;
}

function QuickButton({ button, onQuickButtonClicked }: Props) {
  return (
    <button className={`quick-button ${button.style || ''}`} onClick={(event) => onQuickButtonClicked(event, button.value)}>
      {button.label}
    </button>
  );
}

export default QuickButton;
