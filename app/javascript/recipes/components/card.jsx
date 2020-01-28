/* eslint jsx-a11y/alt-text: off */
/* eslint jsx-a11y/no-noninteractive-element-interactions: off */

import React, { Component } from 'react';

class Card extends Component {
  render() {

    if (!this.props.card) {
      return <p>Loading...</p>;
    }

    const card = this.props.card;
    // debugger
    // const backgroundImageUrl = {backgroundImage: `url('${card.photo.card.url}')`};
    // const cardImgTopId = `card-img-top card-img-top-${card.id} d-flex justify-content-center align-items-center`;
    // const faHeartId = `fa-heart-${card.id} d-none text-danger display-3`;
    // const hrefComments = `/recipes/${card.slug}#comments`;
    // const recipeLike = `/recipes/${card.slug}/likes`;
    // const recipeBookmark = `/recipes/${card.slug}/bookmarks`;

    // console.log(`card id ${card.id} likes ${card.likes.count}`);

    return (
      <div className="col-md-4 col-lg-3 col-xl-2">
        <div className="card border-0" data-recipe={card.id}>
          <div className={`card-img-top card-img-top-${card.id} d-flex justify-content-center align-items-center`} style={{backgroundImage: `url(${card.photo.card.url})`}}>
            <div className={`fa-heart-${card.id} d-none text-danger display-3`}>
              <i className="fas fa-heart"></i>
            </div>
            <div className={`fa-bookmark-${card.id} d-none text-body display-3`}>
              <i className="fas fa-bookmark"></i>
            </div>
          </div>
          <div className="card-body py-2 px-0">
            <div className="d-flex justify-content-between align-items-center">
              <a className="btn p-0 text-danger" data-like-recipe={card.id} data-remote="true" rel="nofollow" data-method="patch" href={`/recipes/${card.slug}/likes`}>
                <i className="fas fa-heart"></i>
                &nbsp;<span className="text-muted font-weight-lighter">{card.likes_count}</span>
              </a>
              <div className="d-flex align-items-center">
                <a className="btn p-0 ml-3" href={`/recipes/${card.slug}#comments`}><i className="far fa-comment-alt"></i></a>
                <a className="btn p-0 ml-3" data-bookmark-recipe={card.id} data-remote="true" rel="nofollow" data-method="patch" href={`/recipes/${card.slug}/bookmarks`}>
                  <i className="fas fa-bookmark"></i>
                </a>
              </div>
            </div>
            <a href={`/recipes/${card.slug}`} className="card-link text-body text-uppercase">{card.title}</a>
            <div className="card-text font-weight-lighter">{card.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

// id
// title
// subtitle
// video
// direction
// description
// photo.url
// photo.thumb.url
// photo.preview.url
// photo.card.url
// photo.full.url
// comments
