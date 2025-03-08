const iconVarient = {
  comment: { containerClass: "", iconClass: "", iconColor: "" },
  like: { containerClass: "", iconClass: "", iconColor: "" },
  bookmark: { containerClass: "", iconClass: "", iconColor: "" },
};
function IconText({
  Icon,
  children,
  type = "bookmark",
  iconSize = 24,
  active = false,
}) {
  
  return (
    <div className={`flex items-center gap-2 ${iconVarient[type].containerClass}`}>
      {Icon && (
        <Icon
          width={iconSize}
          height={iconSize}
          className={iconVarient[type].iconClass}
          fill={type !== "comment" && active ? iconVarient[type].iconColor : "none"}
        />
      )}
      {type !== "bookmark" && (
        <span className="text-gray-800 text-sm font-medium">{children}</span>
      )}
    </div>
  );
}

export default IconText;
