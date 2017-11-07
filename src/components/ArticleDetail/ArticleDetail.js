import React from 'react'
import './ArticleDetail.scss'
import PropTypes from 'prop-types'
import FacebookProvider, { Comments } from 'react-facebook'
// import ArticleMeta from './ArticleMeta'
import LazyLoad from 'react-lazy-load'

class ArticleDetail extends React.Component {
  


  render () {
    // console.log(featuredImage)
    const { post, media } = this.props
    let featuredImage = ''
    
    if (typeof media === 'undefined') {
      featuredImage = 'http://via.placeholder.com/800x350'
    } else if (typeof media.media_details.sizes.medium !== 'undefined') {
      featuredImage = media.media_details.sizes.full.source_url
    } else if (typeof media.media_details.sizes.full === 'undefined'){
      featuredImage = media.source_url
    } else {
      featuredImage = null
    }
    let figureImage = ''
    if (featuredImage !== null) {
      figureImage = <figure className='image article-featured-image is-16by9'>
        <img src={featuredImage} alt='Gambar artikel' className=' lazy lazyLoaded' />
        <div className='caption'></div>
      </figure>
    }

    return (
      <div>
        <div className='is-single'>
          <div className='article-title'>
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </div>
          <div className='article-detail-meta'>
            <ul>
              <li> Sabtu, 04 Nov 2017 </li>
              <li> Oleh : Adjie Guntoro </li>
              {/* <li><span className='tag is-info'>Info</span></li> */}
            </ul>
          </div>
          <LazyLoad>
          { figureImage }
          </LazyLoad>
          <div className='content'>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>
          <FacebookProvider appId='373119386442338'>
            <Comments width='100%' href={'localhost:3000/' + post.slug} />
          </FacebookProvider>
          {/* <div className='tags'>
            <span className='tag is-info'>Unpam</span>
            <span className='tag is-info'>Kabar Alumni</span>
            <span className='tag is-info'>Event</span>
          </div> */}
        </div>
      </div>
    )
  }
}

ArticleDetail.propTypes = {
  post : PropTypes.object,
  media : PropTypes.object
}

export default ArticleDetail