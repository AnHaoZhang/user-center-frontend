import Footer from '@/components/Footer';
import { register} from '@/services/ant-design-pro/api';
import {

  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import { SYSTEM_LOG} from "@/constant";
// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );
const Register: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  // const { initialState, setInitialState } = useModel('@@initialState');
  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     await setInitialState((s) => ({
  //       ...s,
  //       currentUser: userInfo,
  //     }));
  //   }
  // };
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword,checkPassword} = values;
    //校验
    if (userPassword !== checkPassword){
      message.error("两次密码不一致")
      return;
    }
    try {
      // 注册
      const id = await register(values);
      // if(res.code == 0){

      // }

      if (id>0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        // await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname:'/user/login',
          query
        });
        return;
      }else {
        throw new Error('register error id = ${id}');
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  // const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter = {{
            searchConfig:{
              submitText:'注册'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOG} />}
          title="用户中心系统"
          subTitle={'练习的一个项目'}
          initialValues={{
            autoLogin: true,
          }}
          /** 删除注释不需要的代码 */
          // actions={[
          //   '其他注册方式 :',
          //   <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
          //   <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
          //   <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          // ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码注册'} />
            {/*<Tabs.TabPane key="mobile" tab={'手机号注册'} />*/}
          </Tabs>

          {/*{status === 'error' && loginType === 'account' && (*/}
          {/*  <LoginMessage content={'错误的用户名和密码(yupi/12345678)'} />*/}
          {/*)}*/}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: yupi or dogyupi'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: 12345678'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min:8,
                    type:'string',
                    message:'长度不能小于8',
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: 12345678'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min:8,
                    type:'string',
                    message:'长度不能小于8',
                  }
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'星球编号'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                ]}
              />
            </>
          )}

          {/*<div*/}
          {/*  style={{*/}
          {/*    marginBottom: 24,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  /!*<ProFormCheckbox noStyle name="autoLogin">*!/*/}
          {/*  /!*  自动注册*!/*/}
          {/*  /!*</ProFormCheckbox>*!/*/}
          {/*  <a*/}
          {/*    style={{*/}
          {/*      float: 'right',*/}
          {/*    }}*/}
          {/*    href={PLANET_LINK}*/}
          {/*    target="_blank" rel="noreferrer"*/}
          {/*  >*/}
          {/*    忘记密码请联系管理员 ?*/}
          {/*  </a>*/}
          {/*</div>*/}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
