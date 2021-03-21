import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { UnPublished } from '../components/UnPublished'

const PostContainer = styled.div`
      color: #fff;
      h2, h3 {
        color: #ff9cce;
      }
      aside {
        background-color: #ffeeba;
        padding: 10px;
        margin-bottom: 30px;
      }
      blockquote {
        background: #ffb6db;
        padding: 2rem;
        box-shadow: 0 0 20px 10px rgb(0 0 0 / 10%);
        border-left: 8px solid #ff69b4;
      }
    `;

deckDeckGoHighlightElement()

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1 style={{color: `#ff69b4`}}>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(0),
            color: '#ff69b4',
            textTransform: 'uppercase',
          }}
        >
          {post.frontmatter.date}
        </p>
        <PostContainer>
          {
            post.frontmatter.isPublic === false && (
              <UnPublished />
            )
          }
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </PostContainer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        {
          post.frontmatter.isPublic === false && (
            <UnPublished />
          )
        }
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        isPublic
        languages
      }
    }
  }
`
