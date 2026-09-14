import { useTranslate } from "shared/i18n/hooks";

type ActionType = 'logs' | 'sessions' | 'tokens' | 'all';

type BtnProps = {
  label: string;
  count: number;
  action: ActionType;
  onClear: (action: string) => void;
}

const Btn = ({ label, count, action, onClear }: BtnProps) => {
  const __ = useTranslate()

  return (<button
    className="btn btn-outline w-96 my-1 px-24 flex justify-between"
    onClick={() => onClear(action)}
  >
    {__(label)}
    <span className="text-secondary font-bold text-xl">
      {count}
    </span>
  </button>)
}

export default Btn
