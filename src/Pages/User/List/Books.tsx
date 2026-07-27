import type { Book } from "Pages/Users/types"

type Props = {
  list: Book[];
}

const Books = ({ list }: Props) => {
  return (Boolean(list) && (
    <ul>
      {list?.map((item: Book) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  ))
}

export default Books
