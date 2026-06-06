import React, { useState } from 'react'
import MyFeeds from './MyFeeds'
import CreatePost from './CreatePost'

const community = () => {
  return (
    <div>
      <CreatePost />
      <MyFeeds /> 
    </div>
  )
}

export default community