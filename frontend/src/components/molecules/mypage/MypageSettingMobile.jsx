/**
 * @author boyeon
 */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { deleteUser, setUserAlert, userInfo } from "../../../api/mypageAPI";
import { ClickableSpan } from "../../atoms/ClickableSpan";

export const MypageSettingMobile = () => {
  const [user, setUser] = useState({
    userId: 0,
    ageRange: "0",
    alertOption: false,
  });
  useEffect(async () => {
    const response = await userInfo();
    if (response.status === 200) {
      setUser({ ...response.data });
    } // TODO : 예외처리
  }, []);

  return (
    <>
      <SettingDiv>
        <SettingWordsDiv>
          <SettingTitleDiv>{"회원님의 연령: "}</SettingTitleDiv>
          <SettingExpln>
            회원님의 연령대를 등록하거나 변경하실 수 있습니다.
          </SettingExpln>
        </SettingWordsDiv>
        <SettingButtonDiv>
          <ClickableSpan
            onClick={() => {
              console.log("연령대 변경");
            }}
          >
            변경하기
          </ClickableSpan>
        </SettingButtonDiv>
      </SettingDiv>
      <SettingDiv>
        <SettingWordsDiv>
          <SettingTitleDiv>카카오톡 알림 설정</SettingTitleDiv>
          <SettingExpln>
            보낸 편지에 대한 답장의 실시간 알림을 받으실 수 있습니다.
          </SettingExpln>
        </SettingWordsDiv>
        <SettingButtonDiv>
          <ClickableSpan
            isHide={!user.alertOption}
            onClick={async () => {
              const response = await setUserAlert(false);
              console.log(response);
              console.log("카카오톡 알림 설정 OFF");
            }}
          >
            OFF
          </ClickableSpan>
          <ClickableSpan
            isHide={user.alertOption}
            onClick={async () => {
              const response = await setUserAlert(true);
              console.log(response);
              console.log("카카오톡 알림 설정 ON");
            }}
          >
            ON
          </ClickableSpan>
        </SettingButtonDiv>
      </SettingDiv>
      <SettingDiv>
        <SettingWordsDiv>
          <SettingTitleDiv>계정 비활성화</SettingTitleDiv>
          <SettingExpln>
            현재 접속한 계정의 정보를 비활성화 합니다.
          </SettingExpln>
        </SettingWordsDiv>
        <SettingButtonDiv>
          <ClickableSpan
            onClick={() => {
              deleteUser();
              console.log("탈퇴 버튼 클릭");
            }}
          >
            계정탈퇴
          </ClickableSpan>
        </SettingButtonDiv>
      </SettingDiv>
    </>
  );
};

const SettingDiv = styled.div`
  display: flex;
  height: 100px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 24px;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const SettingWordsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 70%;
  justify-content: space-between;
  align-items: center;
  border-right: 2px solid #d9d9d9;
  margin: 0;
`;

const SettingButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
  height: 80%;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const SettingTitleDiv = styled.div`
  height: 25px;
  width: 90%;
  font-size: 20px;
  text-align: left;
`;

const SettingExpln = styled.div`
  height: 34px;
  width: 90%;
  text-align: left;
  color: #555555;
`;
