import { useTranslate } from "shared/i18n/hooks";
// import type { List, UserAuthors } from "Pages/Users/types";

// type UserProps = {
//   total: number;
//   own?: number;
// }

type Props = {
  label: string;
  allow: boolean;
  total: number;
  own?: number;
  children: React.ReactNode;
}

const Collapse = ({ label, allow, total, own = 0, children }: Props) => {
  const __ = useTranslate()
  const disabledClass = `${!allow ? ' opacity-60 pointer-events-none' : ''}`
  const userVal = (own > 0) ? [own, total].join('/') : String(total)

  return (
    <div className={`collapse collapse-arrow mb-2 rounded-none${disabledClass}`}>
      <input
        type="checkbox"
        disabled={!allow}
        aria-label="Checkbox control"
      />
      <div className="collapse-title p-0 pe-10 border-none rounded-none">
        <p className="flex justify-between">
          <span>{__(label)}{!allow ? ' 🔒' : ' 👀'}:</span>
          <span>{userVal}</span>
        </p>
      </div>
      <div className="collapse-content">
        {children}
      </div>
    </div>
  )
}

export default Collapse
