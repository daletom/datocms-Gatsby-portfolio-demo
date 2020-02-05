import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Imgix from "react-imgix";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsWork.gallery.map(({ fluid }) => (
              /*<img alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src} />*/
              <Imgix
                src={fluid.src}
                sizes="(min-width: 650px) 600px, 100vw"
                attributeConfig={{
                  src: "data-src",
                  srcSet: "data-srcset",
                  sizes: "data-sizes"
                }}
              />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html
          }}
        />
        <div className="sheet__gallery">
          <Imgix
            src={data.datoCmsWork.coverImage.fluid}
            sizes="(min-width: 650px) 600px, 100vw"
            attributeConfig={{
              src: "data-src",
              srcSet: "data-srcset",
              sizes: "data-sizes"
            }}
          />
        </div>
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
