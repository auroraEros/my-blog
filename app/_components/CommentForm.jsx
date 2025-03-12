"use client";
import { useActionState, useEffect, useState } from "react";
import SubmitButton from "@/app/_ui/SubmitButton";
import TextArea from "@/app/_ui/TextArea";
import { createComment } from "@/app/_lib/actions";
import toast from "react-hot-toast";

const initialState = { message: "", error: "" };
function CommentForm({ postId, parentId, onClose }) {
  const [text, setText] = useState("");
  const [state, formAction] = useActionState(createComment, initialState);
  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) toast.error(state.error);
  }, [state]);
  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form
            className="space-y-7"
            action={async (formData) =>
              await formAction({ formData, parentId, postId })
            }
          >
            <TextArea
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />

            <SubmitButton>تایید</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
