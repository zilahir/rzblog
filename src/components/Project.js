import React, { Component } from 'react';
import styled from 'styled-components'

const ProjectWrapper = styled.div`
    display: flex;
    padding: 10px;
    max-width: 900px;
    background-color: #ffc04d;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
    p {
        color: #fff;
        font-size: 22px;
    }
`;
class Project extends Component {
    render() {
        <ProjectWrapper>
            <p>
                Do you have a project for me? 
            </p>
        </ProjectWrapper>
    }
}

export default Project;