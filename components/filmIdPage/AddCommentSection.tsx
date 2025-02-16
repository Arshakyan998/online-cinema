'use client';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useAddCommentMutation } from '@/store/commentsQuery/api';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/hooks';
import { Button, Form } from 'antd';

const AddCommentSection: React.FC = () => {
  const [comment, setComment] = useState('');

  const user = useAppSelector(state => state['user/data'].user);
  const params = useParams();
  const [addCommentTrigger] = useAddCommentMutation();

  const saveComment: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setComment(e.currentTarget.value);
  };

  const sendData: FormEventHandler<HTMLElement> = e => {
    e.preventDefault();

    if (comment && params.id && user.id) {
      addCommentTrigger({
        comment,
        movieId: params.id as string,
        userId: user.id,
      });
      setComment('');
    }
  };

  return (
    <>
      {user.id ? (
        <Form onSubmitCapture={sendData}>
          <TextArea
            rows={4}
            placeholder="Your Comment"
            className="bg-gray-800 text-black"
            onChange={saveComment}
            value={comment}
          />
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Submit
          </Button>
        </Form>
      ) : (
        <Button href="/auth/signin">Вход</Button>
      )}
    </>
  );
};

export default AddCommentSection;
