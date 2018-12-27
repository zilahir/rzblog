import React, { Component } from 'react';
import styled from 'styled-components'
import { FaTwitter, FaYoutube, FaLastfm, FaGithub, FaInstagram } from 'react-icons/fa';


const SocialList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    li {        
        a {
            margin-right: 10px;
            color: #ff69b4;
            text-decoration: none;
            box-shadow: none;
            &:hover {
                transition: all .4s ease;
                color: #ccc;
                cursor: pointer;
            }
        }
    }
`;

class Social extends Component {

    render() {
        return (
            <SocialList>
                <li>
                    <a target="_blank" href="https://twitter.com/zilahy">
                        <FaTwitter size="2em" />
                    </a>
                    <a target="_blank" href="http://instagram.com/richardzilahi/">
                        <FaInstagram size="2em" />
                    </a>
                    <a target="_blank" href="https://github.com/zilahir">
                        <FaGithub size="2em" />
                    </a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCNEMEZVKE6a4-9uRGFL8r1Q">
                        <FaYoutube size="2em" />
                    </a>
                    <a target="_blank" href="http://last.fm/user/zilahy">
                        <FaLastfm size="2em" />
                    </a>
                </li>
            </SocialList>
        );
    }
}

export default Social;