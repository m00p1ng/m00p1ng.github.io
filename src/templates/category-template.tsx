// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostPreview from '../components/shared/PostPreview'

import PageProps from '../models/PageProps'

const Categories = ({ pageContext, data }: PageProps) => {
  const { edges } = data.allMarkdownRemark
  const { title } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`${pageContext.category} | ${title}`} />
      <div className="container">
        <div className="content-padding">
          <h1 className="title">
            Category: {pageContext.category}
          </h1>
          {
            edges.map(({ node }) => {
              return <PostPreview key={node.id} post={node} />
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default Categories

export const query = graphql`
  query CategoryQuery($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      filter: {frontmatter: {published: {eq: true}, category: {eq: $category}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            category
            tags
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`