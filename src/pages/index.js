import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

const languages = [
  { label: 'hu', value: '🇭🇺' },
  { label: 'en', value: '🇬🇧' },
  { label: 'fin', value: '🇫🇮' }
]

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    const renderLanguages = langs => langs.map(currentLanguage => (
      <span>
        {languages.find(lang => lang.label === currentLanguage).value}
      </span>
    ))

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `richardzilahi`, `javascript`, `react`, `code`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          if (node.frontmatter.isPublic !== false) {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                    color: '#ff9cce'
                  }}
                >
                  <Link style={{ boxShadow: `none`, color: `inherit` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small style={{ color: '#ff69b4', fontSize: 16, }}>
                  {node.frontmatter.date} | {node.fields.readingTime.text} | {renderLanguages(node.frontmatter.languages)}
                </small>
                <p style={{ color: "#fff"  }} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            )
          }
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            isPublic
            languages
          }
        }
      }
    }
  }
`
