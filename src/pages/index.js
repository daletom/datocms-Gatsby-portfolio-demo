import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Imgix from "react-imgix";
import Layout from "../components/layout";
import "lazysizes";

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            <Link to={`/works/${work.slug}`} className="card__image">
              <Imgix
                className="lazyload"
                src={`${work.coverImage.fluid.src}`}
                sizes="(min-width: 1400px) 20vw, (min-width: 900px) 33vw, 50vw"
                attributeConfig={{
                  src: "data-src",
                  srcSet: "data-srcset",
                  sizes: "data-sizes"
                }}
              />
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
);

export default IndexPage;

export const query = graphql`
query IndexQuery {
  work {
    id
    slug
    coverImage {
      responsiveImage(imgixParams: {auto: compress}) {
        src
        srcSet
      }
    }
    excerpt
    title
  }
}
`;
