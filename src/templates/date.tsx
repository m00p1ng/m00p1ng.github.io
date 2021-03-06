import { Link } from 'gatsby'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Banner from '../components/Banner'
import PageContainer from '../components/PageContainer'
import Layout from '../layouts/Layout'

import PageProps from '../models/PageProps'
import PostByDate from '../models/PostByDate'

const LinkWrapper = styled.li`
  margin-bottom: 1.2rem;
`

const HeaderLinkWrapper = styled(Link).attrs({
  className: 'rainbow'
})`
  color: #363636;
`

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

interface GroupPostByDate {
  [key: string]: PostByDate[]
}

interface RenderProps {
  groupDate: GroupPostByDate
  type: string
  date: string
}

const groupDateBy = (type: string, posts: PostByDate[]) => {
  if (type === 'year') {
    return groupBy(posts, (post) => (
      post.ISODate.slice(5, 7)
    ))
  } else {
    return groupBy(posts, (post) => (
      post.ISODate.slice(8, 10)
    ))
  }
}

const bannerTitle = (type: string, date: string) => {
  if (type === 'year') {
    return `Year: ${date}`
  } else if (type === 'month') {
    const [year, month] = date.split('-')

    return `${monthNames[parseInt(month, 10) - 1]} ${year}`
  } else {
    const [year, month, day] = date.split('-')

    return `${monthNames[parseInt(month, 10) - 1]} ${day}, ${year}`
  }
}

const toSubDate = (type: string, subDate: string, date: string) => {
  if (type === 'year') {
    return (
      <HeaderLinkWrapper to={`/${date.replace('-', '/')}/${subDate}`}>
        {monthNames[parseInt(subDate, 10) - 1]}
      </HeaderLinkWrapper>
    )
  } else if (type === 'month') {
    const [year, month] = date.split('-')

    return (
      <HeaderLinkWrapper to={`/${date.replace('-', '/')}/${subDate}`}>
        {monthNames[parseInt(month, 10) - 1]} {subDate}, {year}
      </HeaderLinkWrapper>
    )
  } else {
    return 'Post'
  }
}

const renderByDatePost = ({ groupDate, type, date }: RenderProps) => {
  return Object.keys(groupDate).sort().map(subDate => (
    <Fragment key={subDate}>
      <h3>
        {toSubDate(type, subDate, date)}
      </h3>
      <ul>
        {sortBy(groupDate[subDate], 'ISODate').map(post => (
          <LinkWrapper key={post.id} >
            <div className="archive-content">
              {type === 'year' && (
                <span className="archive-date">
                  {post.shortDate}
                </span>
              )}
              <Link
                to={post.slug}
                className="rainbow"
              >
                {post.title}
              </Link>
            </div>
          </LinkWrapper>
        ))}
      </ul>
    </Fragment>
  ))
}

const DateTemplate = ({ pageContext }: PageProps) => {
  const {
    postByDate: posts,
    siteTitle,
    dateType: type,
    total,
    date
  } = pageContext!
  const groupDate = groupDateBy(type!, posts!)

  return (
    <Layout>
      <Helmet title={`${bannerTitle(type!, date!)} | ${siteTitle}`} />
      <Banner
        title={bannerTitle(type!, date!)}
        subtitle={`${total} post${total !== 1 ? 's' : ''}`}
      />
      <PageContainer>
        <div className="card">
          <div className="content page-content page-fontsize">
            {renderByDatePost({ groupDate, type: type!, date: date! })}
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}

export default DateTemplate
