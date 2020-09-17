export const setSkeleton = () => {
  const skeleton = document.querySelector('#skeleton');
  console.log(skeleton);

  const skeletonBox1 = `<div class="banner d-flex justify-content-center align-items-center">
    <div class="spinner-border" style="color: #D3D3D3; width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`;

  for (let i = 0; i < 12; i++) {

    const skeletonBox2 = `
    <div class="card rounded border-0 my-3 m-md-2" data-recipe="${i+1}">
      <div class="card-header bg-white px-2 pt-2 pb-0 border-0">
        <div class="d-flex justify-content-start align-items-center">
          <div id="card-picture" class="skeleton-loading mr-2"></div>
          <div id="card-name" class="skeleton-loading"></div>
        </div>
      </div>
      <div class="card-body bg-white p-2">
          <div id="card-image" class="skeleton-loading">
          </div>
        <div class="d-flex justify-content-between align-items-center my-2">
          <div id="card-action" class="skeleton-loading"></div>
        </div>
        <div class="d-flex flex-column">
          <div id="card-title" class="skeleton-loading"></div>
          <div id="card-text" class="skeleton-loading my-1"></div>
          <div id="card-text" class="skeleton-loading my-1"></div>
          <div id="card-text" class="skeleton-loading my-1"></div>
        </div>
      </div>
    </div>
    `;

    skeleton.insertAdjacentHTML('beforeEnd', skeletonBox2);
  }
}
