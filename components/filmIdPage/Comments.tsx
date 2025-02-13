"use client"
import {
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useStore } from 'react-redux';
import useAppStore from '@/hooks/useAppStore';
import { useAppSelector } from '@/hooks';

const CommentSection = () => {
  const user = useAppSelector(state=>state['user/data'].user)
  
    
   return(
    <div className=" text-white p-6 space-y-6">
      {/* Comment */}
      <div className="flex space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt="avatar"
          className="rounded-full"
        />
        <div className="flex-1">
          <div className="font-bold">@kawaii_kat</div>
          <p className="text-gray-300 text-sm">
            Lorem ipsum dolor sit amet consectetur. Blandit luctus nunc nulla ut
            etiam penatibus gravida fusce. Id viverra erat nisl tincidunt risus
            elit. Lect diamn on leo volutpat nulla. Aliquet a at iaculis
            imperdiet diam tincidunt venenatis eget. Urna elementum rhoncus eu
            tristique lorem.
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <LikeOutlined />
              <span>50K</span>
            </div>
            <div className="flex items-center space-x-1">
              <DislikeOutlined />
              <span>50K</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageOutlined />
              <span>Reply</span>
            </div>
            <span className="ml-auto text-gray-400">5 minutes ago</span>
          </div>
        </div>
      </div>

      <div className="text-gray-400 cursor-pointer">Load More Comments ▼</div>

      <div className="text-right text-gray-400">40 of 1500</div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Leave a Comment</h2>
        <p className="text-gray-400">Your email will be kept private.</p>

        {user.id? <><TextArea
                   rows={4}
                   placeholder="Your Comment"
                   className="bg-gray-800 text-white" /><Button type="primary" className="bg-blue-600">
                       Submit
                   </Button></>:<Button href='/auth/signup'>Вход</Button> }
      </div>
    </div>,
  );
};

export default CommentSection;
