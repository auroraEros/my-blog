"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import {
  HeartIcon as SolidHeartIcon,
  BookmarkIcon as SolidBookmarkIcon,
} from "@heroicons/react/24/solid";

import ButtonIcon from "@/app/_ui/ButtonIcon";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import { bookmarkPostApi, likePostApi } from "@/app/_lib/postService";

function PostInteractions({ post }) {
  const router = useRouter();
  async function likeHandler(postId) {
    try {
      const { message } = await likePostApi(postId);
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    router.refresh();
  }

  async function bookmarkHandler(postId) {
    try {
      const { message } = await bookmarkPostApi(postId);
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    router.refresh();
  }
  return (
    <div className="flex items-center gap-x-4">
      <ButtonIcon variant="secondary">
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(post.commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant="red" onClick={() => likeHandler(post._id)}>
        {post.isLiked ? <SolidHeartIcon /> : <HeartIcon />}
      </ButtonIcon>
      <ButtonIcon variant="primary" onClick={() => bookmarkHandler(post._id)}>
        {post.isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
      </ButtonIcon>
    </div>
  );
}

export default PostInteractions;
