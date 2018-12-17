import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'
import React from 'react'

interface Props {
  tags: string[]
  size?: string
  color?: string
}

const TagList = ({ tags, size, color }: Props) => (
  <div className="tags">
    {tags.map((tag) => (
      <Link
        key={tag}
        className={`tag ${color || ''} ${size || ''}`}
        to={`/tags/${KebabCase(tag)}`}
      >
        {tag}
      </Link>
    ))}
  </div>
)

export default TagList
