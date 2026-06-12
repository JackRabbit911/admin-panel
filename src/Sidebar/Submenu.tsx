import type { SideItem } from "./types";

type Props = {
  item: SideItem;
}

const Submenu = ({ item }: Props) => {
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
