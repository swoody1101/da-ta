/**
 * @author boyeon
 */
/**
 *
 */
import React from "react";
import styled from "styled-components";
import MypagePngs from "../atoms/MypagePngs";

export const MypageSetting = () => {
  return (
    <>
      <SettingDiv>
        <MypagePngs width={"80px"} height={"80px"} name={"calendar"} />
        <SettingWordsDiv>
          <SettingExpln size={18}>
            회원님의 연령대 정보를 등록하거나 변경하실 수 있습니다.
          </SettingExpln>
          <SettingExpln size={18}>
            공감대가 맞는 사람들과 소통해보세요
          </SettingExpln>
          <SettingChange>
            <SettingExpln size={20}>회춘하기 버튼</SettingExpln>
          </SettingChange>
        </SettingWordsDiv>
      </SettingDiv>
      <SettingDiv>
        <MypagePngs width={"80px"} height={"80px"} name={"kakao"} />
        <SettingWordsDiv>
          <SettingExpln size={18}>
            연동된 계정으로 실시간 알람을 보내 드립니다.
          </SettingExpln>
          <SettingExpln size={18}>
            회원님의 편지에 대한 답장이 도착하면 바로 확인하실 수 있습니다.
          </SettingExpln>
          <SettingChange>
            <SettingExpln size={16}>실시간 알람 받기 체크빡스</SettingExpln>
          </SettingChange>
        </SettingWordsDiv>
      </SettingDiv>
      <SettingDiv>
        <MypagePngs width={"80px"} height={"80px"} name={"exit"} />
        <SettingWordsDiv>
          <SettingExpln size={18}>
            저희 서비스를 당분간 사용하지 않으실 계획이신가요?
          </SettingExpln>
          <SettingExpln size={18}>
            계정을 비활성화 하실 수 있습니다. 나중에 다시 뵙길 바래요!
          </SettingExpln>
          <SettingChange>
            <SettingExpln size={15}>탈퇴버튼</SettingExpln>
          </SettingChange>
        </SettingWordsDiv>
      </SettingDiv>
    </>
  );
};

const SettingDiv = styled.div`
  display: flex;
  height: 120px;
  width: 620px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 24px;

  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

const SettingWordsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

const SettingExpln = styled.p`
  font-size: ${(props) => props.size}px;
  width: 100%;
  height: 20px;
  text-align: start;
  color: #444444;
  margin-left: 25px;

  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

const SettingChange = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  width: 100%;
  height: 43px;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;
// 아이콘이 들어갈 영역 test코드
const Aaa = styled.div`
  width: 80px;
  height: 80px;
  background-color: bisque;
  margin: 0 0 0 25px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;