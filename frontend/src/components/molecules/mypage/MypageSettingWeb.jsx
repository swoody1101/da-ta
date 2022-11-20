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
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import {
  userInfo,
  setUserAge,
  setUserAlert,
  cancellation,
} from "../../../api/mypageAPI";
import { useState } from "react";
import DropDownInput from "../../atoms/DropDownInput";
import {
  popConfirmAlert,
  popErrorAlert,
  popSuccessAlert,
} from "../../../utils/sweetAlert";
import { LetterOptions } from "../../../constants/Options";
import { loginState, userState } from "../../../recoil/Atoms";

export const MypageSettingWeb = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const setIsLogin = useSetRecoilState(loginState);
  const setUserState = useSetRecoilState(userState);
  const [dropDownIndex, setDropDownIndex] = useState(0);
  const itemList = LetterOptions.AGES;

  useEffect(() => {
    setSelectedIndex(2);
    callUserInfo();
  }, []);

  const callUserInfo = async () => {
    const response = await userInfo();
    if (response.status === 200) {
      setUser(response.data);
      setDropDownIndex(parseInt(response.data.ageRange[4]) + 1);
      setIsLoading(false);
    } else {
      popErrorAlert("", "유저 정보를 불러오는데 실패했습니다.");
    }
  };

  const setAge = async (body) => {
    const response = await setUserAge(body);
    if (response.status - 200 < 3 && response.status) {
      callUserInfo();
    } else {
      popErrorAlert("", "연령대 변경 요청 실패!");
    }
    // 새로고침
  };

  const setCancellation = () => {
    popConfirmAlert(
      "",
      "탈퇴를 진행하시겠습니까?",
      "네",
      "아니오",
      async () => {
        const response = await cancellation();
        if (response.status - 200 < 3 && response.status) {
          popSuccessAlert("", "회원 탈퇴 되셨습니다");
          setUserState({});
          sessionStorage.removeItem("ACCESS_TOKEN");
          setTimeout(() => {
            setIsLogin(false);
            window.location.href = "/";
          }, 1000);
        } else {
          popErrorAlert("", "회원 탈퇴 요청 실패!");
        }
      }
    );
  };

  return (
    <>
      {isLoading ? null : (
        <>
          <SettingDiv>
            <MypagePngs width={"80px"} height={"80px"} name={"calendar"} />
            <SettingWordsDiv>
              <SettingExpln>
                회원님의 연령 정보를 등록하거나 변경하실 수 있습니다.
                <br />
                공감대가 맞는 사람들과 소통해보세요
              </SettingExpln>
              <SettingChange>
                <Span>현재 회원님의 나이대 : </Span>
                <DropDownInput
                  itemList={itemList}
                  width={"80px"}
                  height={"40px"}
                  margin={"0 0 0 10px"}
                  value={LetterOptions.AGES[dropDownIndex]}
                  onChange={(e) => {
                    setAge({ age: LetterOptions.AGES_VALUE[e.target.value] });
                  }}
                ></DropDownInput>
              </SettingChange>
            </SettingWordsDiv>
          </SettingDiv>
          <SettingDiv>
            <MypagePngs width={"80px"} height={"80px"} name={"exit"} />
            <SettingWordsDiv>
              <SettingExpln>
                회원 탈퇴를 진행하시면 작성한 모든 활동 내역이 사라집니다.
              </SettingExpln>
              <SettingChange>
                <ClickableSpan
                  onClick={() => {
                    setCancellation();
                  }}
                >
                  탈퇴하기
                </ClickableSpan>
              </SettingChange>
            </SettingWordsDiv>
          </SettingDiv>
        </>
      )}
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
  filter: drop-shadow(0px 2px 2px #999);

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
  margin: 10px 0 10px 0;
`;

const SettingExpln = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 18px;
  width: 100%;
  height: 40px;
  text-align: left;
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
`;
