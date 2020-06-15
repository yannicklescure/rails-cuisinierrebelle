import { btnClick } from "../components/button";
import { replyForms } from "../components/reply";
import { repliesReply } from "../components/reply";
import { editComment } from "../components/edit-comment";
import { editReply } from "../components/edit-reply";
import { commentPhoto } from "../components/comment-photo";
import { previewCommentPhotoOnFileSelect } from "../components/comment-photo-preview";
import { replyPhoto } from "../components/reply-photo";
import { previewReplyPhotoOnFileSelect } from "../components/reply-photo-preview";
import { viewReplies } from "../components/reply";
import { smoothToAnchor } from "../components/smooth-to-anchor";

export const recipe = () => {
  window.onhashchange = () => smoothToAnchor();
  window.onload = () => smoothToAnchor();

  viewReplies();

  const userSignedIn = document.querySelector('body').dataset.user === 'true';

  if(userSignedIn) {
    btnClick();
    replyForms();
    repliesReply();
    editComment();
    editReply();
    commentPhoto();
    previewCommentPhotoOnFileSelect();
    replyPhoto();
    previewReplyPhotoOnFileSelect();
  } else {
    const newUserRegistrationBtn = document.querySelector('#new-user-registration');
    if (newUserRegistrationBtn) {
      newUserRegistrationBtn.addEventListener('click', ()=> {
        console.log('newUserRegistrationBtn');
        location.href = "https://www.cuisinierrebelle.com/users/sign_up";
      });
    }
  }
}