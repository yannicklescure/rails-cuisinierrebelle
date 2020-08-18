import { setPictureSize } from "../util";

const previewImageOnFileSelect = () => {
  // we select the photo input
  const input = document.getElementById('photo-input');
  if (input) {
    // we add a listener to know when a new picture is uploaded
    input.addEventListener('change', () => {
      // we call the displayPreview function (who retrieve the image url and display it)
      displayPreview(input);
    })
  }
}

const displayPreview = (input) => {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById('photo-preview').src = event.currentTarget.result;
    }
    reader.readAsDataURL(input.files[0])
    const photoActive = document.getElementById('photo-active');
    if(photoActive) photoActive.classList.add('d-none');
    const photoPreview = document.getElementById('photo-preview')
    setPictureSize(photoPreview);
    photoPreview.classList.remove('d-none');
  }
}

export { previewImageOnFileSelect };
