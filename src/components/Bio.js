import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import ZilahirProfile from './images/me.jpg';
import { rhythm } from '../utils/typography'
import Project from './Project';

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <img src={ZilahirProfile} style={
                {marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
                widht: `50px`,
                height: `50px`}}
            />
            <p>
              Written by <strong>{author}</strong> who lives and works in Helsinki, Finland
              {` `}
              <a href={`https://twitter.com/${social.twitter}`}>                
                I do tweet
              </a>
            </p>            
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
