import Table from "@/app/_ui/Table";
import { toLocalDateShort } from "@/app/_utils/dateFormatter";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";

function UserRow({ user, index }) {
  const { name, email, bookmarkedPosts, likedPosts, createdAt } = user;
  const numOfBookedMarked =
    bookmarkedPosts?.length > 0 ? bookmarkedPosts.length : "-";
  const numOfLiked = likedPosts?.length > 0 ? likedPosts.length : "-";

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{toPersianDigits(numOfBookedMarked)}</td>
      <td>{toPersianDigits(numOfLiked)}</td>
      <td>{toLocalDateShort(createdAt)}</td>
    </Table.Row>
  );
}

export default UserRow;
