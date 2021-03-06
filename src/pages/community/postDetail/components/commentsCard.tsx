import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {get_id} from "../../../../API/auth"
import {putCommunityPostComment,deleteCommunityPostComment} from "../../../../API/community"

interface IParmas{
    postId:string;
    univId:string;
    role:any;
}

interface IProps extends RouteComponentProps<IParmas> {
    commentData:any;
    key:number;
    getCommentsData:any;
    role:any;
}

const CommentsCard:React.FC<IProps> = ({commentData, key, getCommentsData, match:{params:{univId, postId, role}}}) => {

    const [openEditComment, SetOpenEditComment] =  useState(false);

    const handleClickCancelEditComment = (e:any) =>{
        const textarea = e.target.parentElement.parentElement.children[4];
        const buttonList = e.target.parentElement.parentElement.children[5];
        textarea.remove();
        buttonList.remove();
        SetOpenEditComment(false);
    }

    const handleClickEditComment = (e:any) => {
        const textarea = e.target.parentElement.parentElement.children[4];
        const buttonList = e.target.parentElement.parentElement.children[5];
        const body = textarea.value;    
        putCommunityPostComment(parseInt(univId), parseInt(postId), commentData.commentsId, body, role);
        textarea.remove();
        buttonList.remove();
        SetOpenEditComment(false);
        getCommentsData();
    }

    const handleClickRemoveComment = (e:any)=>{
        deleteCommunityPostComment(parseInt(univId), parseInt(postId), commentData.commentsId, role);
        getCommentsData();
    }

    const handleClickEditComments = (e:React.MouseEvent) => {
        if(!openEditComment){
            const newTextarea = document.createElement("textarea");
            newTextarea.classList.add("outline-none", "border-2", "border-solid", "border-green-300", "w-full");
            newTextarea.id = "newTextarea";

            const buttonList = document.createElement("div");
            buttonList.classList.add("flex");
            buttonList.id = "buttonList";

            const editCommentButton = document.createElement("button");
            editCommentButton.innerHTML="수정하기"
            editCommentButton.classList.add("w-24", "h-8" ,"bg-blue-100", "flex", "justify-center", "items-center");
            editCommentButton.onclick = handleClickEditComment;
            const cancelEditCommentButton = document.createElement("button");
            cancelEditCommentButton.innerHTML="취소하기"
            cancelEditCommentButton.classList.add("w-24", "h-8" ,"bg-blue-100", "flex", "justify-center", "items-center");
            cancelEditCommentButton.onclick = handleClickCancelEditComment;
            buttonList.appendChild(editCommentButton);
            buttonList.appendChild(cancelEditCommentButton);

            const currentTarget = e.currentTarget;
            currentTarget.parentElement?.parentElement?.appendChild(newTextarea);
            currentTarget.parentElement?.parentElement?.appendChild(buttonList);
            SetOpenEditComment(true);
        }
    }

    return <div className="bg-green-100 mt-10 shadow-xl p-3">
        <div>
            {commentData.body}
        </div>
        <div className = "mt-3 font-bold text-gray-700">
            {commentData.writer}
        </div>
        <div className = "font-bold text-gray-700">
            {commentData.updatedDate.slice(0, 10)}
        </div>
        {
            get_id() == commentData.writer ? <div className="flex mt-3">
            <div className="hover:bg-blue-400 cursor-pointer w-24 h-8 bg-blue-200 flex justify-center items-center" onClick={handleClickEditComments}>
                댓글 수정
            </div>
            <div className="hover:bg-blue-400 cursor-pointer ml-2 w-24 h-8 bg-blue-200 flex justify-center items-center" onClick={handleClickRemoveComment}>
                댓글 삭제
            </div>
        </div>
        : ""
        }
        
    </div>
}

export default withRouter(CommentsCard);