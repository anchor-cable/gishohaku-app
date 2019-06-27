import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import styled from '@emotion/styled'
import { Container } from 'sancho'
import { initFirebase, refToPath } from '../../utils/firebase'
import Book from '../../utils/book'
import { NextPage } from 'next'

const Content = styled.div`
  max-width: 720px;
  margin: 0 auto;
  h2 {
    font-size: 28px;
    margin-top: 48px;
    margin-bottom: 24px;
    font-weight: 600;
  }

  h3 {
    font-size: 20px;
    margin: 32px 0 24px;
    font-weight: 600;
  }

  h4 {
    font-weight: 600;
  }

  h2 + h3 {
    margin-top: 0;
  }

  img {
    max-width: 100%;
  }

  ul,
  ol {
    padding-left: 24px;
  }

  li {
    margin: 10px 0;
  }

  ul > li {
    list-style-type: disc;
  }

  li > p {
    margin: 0;
  }

  table {
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 20px 0;
    margin-bottom: 30px;
  }

  table tr:nth-of-type(n + 1) td {
    background-color: #f9f9f9;
  }

  table tr th,
  table tr td {
    padding: 8px;
    line-height: 1.6;
    vertical-align: top;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  table tr th {
    white-space: nowrap;
  }

  input[type='text'] {
    appearance: none;
    background-color: transparent;
    background-image: none;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 0;
    color: inherit;
    font-family: inherit;
    font-size: 1em;
    padding: 0.4em 0.8em;
    width: 100%;
  }

  select {
    appearance: none;
    background: transparent url(/images/icon-down.svg) no-repeat center right 8px/16px 16px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 0;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    padding: 0.4em 0.8em;
    width: 100%;
  }
`

interface Props {
  book: Book
}

const Post: NextPage<Props> = ({ book }) => {
  return (
    <Container>
      <Content>
        <h1>{book.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: book.description }} />
      </Content>
    </Container>
  )
}

Post.getInitialProps = async ({ query }) => {
  initFirebase()
  const db = firebase.firestore()
  const id = query.id as string
  const docRef = db.collection('books').doc(id)
  const book = await docRef.get()
  console.log(book.data())

  return {
    book: refToPath(book.data() as Book, 'circleRef')
  }
}

export default Post
