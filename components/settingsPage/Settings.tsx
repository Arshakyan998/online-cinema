'use client';

import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '@/hooks';

import { useEditUserProfileMutation } from '@/store/user/editFiedsQuery';
import { Form, Input, Upload, Avatar, Card, Switch } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useChangeAvatarUrlMutation } from '@/store/user/api';
import { UploadOutlined } from '@ant-design/icons';
import { EditUser } from '@/GlobalTypes/User';
import { Button } from '@/UIkit';

const Settings: React.FC = () => {
  const user = useAppSelector(state => state['user/data'].user);

  const router = useRouter();
  const getCurrentLocation = usePathname();

  if (!user.id) {
    redirect('/auth/signup');
  }
  const uploadRef = useRef(null);

  const [file, setFile] = useState<FormData | null>(null);

  const [editedData, setEditedData] = useState<EditUser>({} as EditUser);

  const [trigger, { data }] = useChangeAvatarUrlMutation();
  const [editFieldsTrigger, { data: editFieldsData }] =
    useEditUserProfileMutation();
  const [viewChangedPhoto, setViewChangedPhoto] = useState('');

  const handleUpload = (dataset: UploadChangeParam<any>) => {
    const selectedFile = dataset.file;
    let formData = new FormData();
    formData.append('avatar', selectedFile);
    setFile(formData);

    const becomeBlob = URL.createObjectURL(new Blob([dataset.file]));
    setViewChangedPhoto(becomeBlob);
  };

  const userEditHandler = (name: keyof EditUser, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (editFieldsData || data) {
      toast.success(editFieldsData?.message || data?.message);
    }
  }, [editFieldsData, data]);

  const sendData: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    e.stopPropagation();

    if (file) {
      trigger({
        id: user.id,
        file,
      });
    }

    if (Object.values(editedData)) {
      editFieldsTrigger({ data: editedData, id: user.id });
    }
    setFile(null);
    setEditedData({});
  };

  return (
    <div className="min-h-screen p-6 text-white flex justify-center">
      <div className="p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Мой профиль</h2>
        <p className="text-gray-400 mb-6">Настройки вашего профиля</p>{' '}
        <ToastContainer position="bottom-right" />
        <Form onSubmitCapture={sendData}>
          <div className="flex flex-col items-center mb-4">
            <Avatar
              size={100}
              src={viewChangedPhoto || user.avatarUrl}
              alt="Аватар"
              className="rounded-full mb-2"
            >
              {user.name[0].toUpperCase()}
            </Avatar>
            <Upload
              ref={uploadRef}
              beforeUpload={() => false}
              onChange={handleUpload}
              showUploadList={false}
            >
              <Button
                Icon={<UploadOutlined />}
                typeof="submit"
                className="bg-purple-500 text-white"
                disabled={!!(file || Object.values(editedData).length)}
              >
                Сменить фото
              </Button>
            </Upload>
          </div>

          <label className="block text-gray-300">Имя</label>
          <Input
            className="mb-2"
            placeholder={user.name}
            defaultValue={user.name}
            onChange={e => userEditHandler('name', e.currentTarget.value)}
          />

          <label className="block text-gray-300">Фамилия</label>
          <Input
            className="mb-2"
            placeholder={user.fullName}
            defaultValue={user.fullName}
            onChange={e => userEditHandler('fullName', e.currentTarget.value)}
          />

          <label className="block text-gray-300">Пароль</label>
          <Input
            className="mb-2"
            placeholder="Пароль"
            type="password"
            onChange={e => userEditHandler('password', e.currentTarget.value)}
          />

          <label className="block text-gray-300">Email</label>
          <Input
            disabled
            className=" text-medium-gray"
            style={{
              background: '#fff',
            }}
            defaultValue={user.email}
          />

          <div className="flex gap-2 mb-2 mt-4">
            <Button type="submit">Сохранить</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Settings;
