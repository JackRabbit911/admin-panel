import type { SideItem } from "./types";

type SubmenuProps = {
  item: SideItem;
}

const Submenu = ({ item }: SubmenuProps) => {
  return (
    <li>
      <details>
        <summary>{item.title}</summary>
        <ul>
          {(item?.sub || []).map(
            (item, key) => !item?.sub ? (
              <li key={key}>
                <a href={item.href}>
                  {item.title}
                </a>
              </li>
            ) : (
              <Submenu item={item} key={key} />
            )
          )}
        </ul>
      </details>
    </li>
  )
}

export default Submenu
