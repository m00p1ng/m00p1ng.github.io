// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'
import Banner from '../components/Banner'

import PageProps from '../models/PageProps'

const ResultWrapper = styled.div`
  margin-top: -1.5rem;
`

const Tags = ({ pageContext }: PageProps) => {
  const {
    next,
    prev,
    nodes,
    page,
    pages,
    total,
    siteTitle,
    tag
  } = pageContext

  return (
    <Layout>
      <Banner
        title={`#${tag}`}
        subtitle={
          `${total} post${(total !== 1) ? 's' : ''} ${(pages !== 1) ? `• Page ${page} of ${pages} ` : ''}`
        }
      />
      <ResultWrapper className="container">
        <Helmet title={`#${tag}${page !== 1 ? ` • Page ${page}` : ''} | ${siteTitle}`} /> :

        <div className="blog-padding">
          {
            nodes.map(({ node }) => (
              <PostPreview key={node.id} post={node} />
            ))
          }
          {(next || prev) && (
            <Pagination
              next={next}
              prev={prev}
              page={page}
              pages={pages}
            />
          )}
        </div>
      </ResultWrapper>
    </Layout >
  )
}

export default Tags
