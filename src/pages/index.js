import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Imgix from 'react-imgix'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            <Link to={`/works/${work.slug}`} className="card__image">
              <Imgix src={`${work.coverImage.fluid.src}`} sizes="(min-width: 1400px) 33vw, (min-width: 401px) 50vw, 100vw" loading="lazy" />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: {fields: [position], order: ASC}) {
      edges {
        node {
          id
          title
          slug
          excerpt
          gallery {
            id
          }
          coverImage {
            fluid {
              src
            }
          }
        }
      }
    }
  }

`
