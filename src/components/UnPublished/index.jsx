import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
  background-color: #ff6767;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #ff3434;
  margin-bottom: 20px;

  p {
    margin: 0;
    color: #ffffff;
    font-weight: 500;
  }
`

export const UnPublished = () => (
  <Container>
    <p>
      This post is not officially published yet. Please don't share the URL anywhere.
    </p>
  </Container>
)