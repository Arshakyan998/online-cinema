import {
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import commentsApi from '@/store/commentsQuery/commentsApi';
import AddCommentSection from './AddCommentSection';
import { SearchParams } from '@/app/Types';
import { store } from '@/store/store';
import { Loading } from '@/shared';
import { Avatar } from 'antd';
import React from 'react';

const CommentSection = async ({ movieId }: { movieId: string }) => {
  const { data, isLoading } = await store.dispatch(
    commentsApi.endpoints.getCommentsForFilm.initiate(movieId, {
      forceRefetch: true,
    }),
  );
  if (isLoading) return <Loading />;

  return (
    <div className=" text-white p-6 space-y-6">
      {data?.map(({ User: { avatarUrl, fullName }, comment }) => {
        return (
          <div className="flex space-x-4">
            <Avatar
              className="cursor-pointer"
              alt={fullName}
              src={avatarUrl}
              size={50}
            >
              {fullName[0].toUpperCase()}
            </Avatar>
            <div className="flex-1">
              <div className="font-bold">{fullName}</div>
              <p className="text-gray-300 text-sm">{comment}</p>
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
        );
      })}

      <div className="text-gray-400 cursor-pointer">Load More Comments ▼</div>

      <div className="text-right text-gray-400">40 of 1500</div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Leave a Comment</h2>
        <p className="text-gray-400">Your email will be kept private.</p>

        <AddCommentSection />
      </div>
    </div>
  );
};

export default CommentSection;
