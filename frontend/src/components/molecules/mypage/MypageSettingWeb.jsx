/**
 * @author boyeon
 */
import React from "react";
import styled from "styled-components";
import MypagePngs from "../../atoms/mypage/MypagePngs";
import { media } from "../../../utils/styleUtil";
import Checkbox from "../../atoms/Checkbox";
import { ClickableSpan } from "../../atoms/ClickableSpan";
import { useEffect } from "react";

export const MypageSettingWeb = () => {
  useEffect(() => {
    console.log('settings')
  }, [])

  return (
    <>
      <SettingDiv>
        <MypagePngs width={"80px"} height={"80px"} name={"calendar"} />
        <SettingWordsDiv>
          <SettingExpln>
            <p>회원님의 연령 정보를 등록하거나 변경하실 수 있습니다.</p>
            <p>공감대가 맞는 사람들과 소통해보세요</p>
          </SettingExpln>
          <SettingChange>
            <Span>현재 회원님의 나이대 : </Span>
            <Span>10살</Span>
            <ClickableSpan margin={'0 0 0 20px'} fontSize={'20px'}>변경하기</ClickableSpan>
          </SettingChange>
        </SettingWordsDiv>
      </SettingDiv>
      <SettingDiv>
        <MypagePngs width={"80px"} height={"80px"} name={"kakao"} />
        <SettingWordsDiv>
          <SettingExpln>
            <p>연동된 계정으로 실시간 알람을 보내드립니다.</p>
            <p>
              회원님의 편지에 대한 답장이 도착하면 바로 확인하실 수 있습니다.
            </p>
          </SettingExpln>
          <SettingChange>
            <Checkbox text={"실시간 알림을 받습니다"} tagname={"알림설정"} />
            <div style={{width:'290px'}}></div>
          </SettingChange>
        </SettingWordsDiv>
      </SettingDiv>
      <SettingDiv>
        <MypagePngs width={"80px"} height={"80px"} name={"exit"} />
        <SettingWordsDiv>
          <SettingExpln>
            <p>저희 서비스를 당분간 사용하지 않으실 계획이신가요?</p>
            <p>계정을 비활성화 하실 수 있습니다. 나중에 다시 뵙길 바래요!</p>
          </SettingExpln>
          <SettingChange>
            <ClickableSpan>
              탈퇴하기
            </ClickableSpan>
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

  ${media.tablet1`
    display: none;
  `}
`;

const SettingWordsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 83px;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

const SettingExpln = styled.div`
  font-size: 18px;
  width: 100%;
  height: 40px;
  text-align: start;
  color: #444444;
`;

const SettingChange = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  text-align: left;
`;

const Span = styled.span`
  margin: 0;
`
