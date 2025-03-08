import Avatar from "./Avatar";

function Author({ avatarUrl, name }) {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar src={avatarUrl} />
      <p className="text-sm text-secondary-500">{name}</p>
    </div>
  );
}

export default Author;
