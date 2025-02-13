import { Form, Input } from 'antd';
import { Button } from '@/uiKit';
import { FC } from 'react';

interface Props {
  email: string;
  onChange: (code: string[]) => void;
  onFinish: VoidFunction;
  buttonDisable: boolean;
}

const OTP: FC<Props> = ({ email, onChange, onFinish, buttonDisable }) => {
  return (
    <Form.Item
      label={
        <span className="text-white text-center">
          Твой код отпраленный на майл {email}{' '}
        </span>
      }
      labelCol={{
        color: '#fff',
      }}
      layout="vertical"
    >
      <Input.OTP onInput={onChange} />
      <Button onClick={onFinish} className="mt-2" disabled={buttonDisable}>
        Отправить
      </Button>
    </Form.Item>
  );
};
export default OTP;
