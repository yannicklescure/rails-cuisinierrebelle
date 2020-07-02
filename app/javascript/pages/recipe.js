import { currentLocation } from "../components/location";
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
// import { smoothToAnchor } from "../components/smooth-to-anchor";
import { print } from "../components/print";
import { previewImageOnFileSelect } from "../components/recipe-photo-preview";
import { recipePhoto } from "../components/recipe-photo";
import { optionsButton } from "../components/recipe-button-options";

export const recipe = (location) => {
  // console.log(location);
  let currentLang = location.currentLang;
  let currentController = location.currentController;
  let currentPage = location.currentPage;
  const device = document.querySelector('body').dataset.device;

    // window.onhashchange = () => smoothToAnchor();
    // window.onload = () => smoothToAnchor();

    viewReplies();

    const userSignedIn = document.querySelector('body').dataset.user === 'true';

    if(userSignedIn) {
      if (currentPage && currentPage.match(/.*\/edit/) || currentPage === 'new') {
        recipePhoto();
        previewImageOnFileSelect();
        optionsButton(location);
      }
      else {
        btnClick();
        print();
        replyForms();
        repliesReply();
        editComment();
        editReply();
        commentPhoto();
        previewCommentPhotoOnFileSelect();
        replyPhoto();
        previewReplyPhotoOnFileSelect();
      }
    } else {
      const newUserRegistrationBtn = document.querySelector('#new-user-registration');
      if (newUserRegistrationBtn) {
        newUserRegistrationBtn.addEventListener('click', ()=> {
          location.href = `${location.domain}/users/sign_up`;
        });
      }
    }

    const recipeImage = document.querySelector('.recipe-image');
    if (recipeImage) {
      const recipeImageWidth = recipeImage.offsetWidth;
      const recipeImageHeight = `${parseInt(recipeImageWidth * 9 / 16)}px`;
      recipeImage.style.height = recipeImageHeight;
    }
};
