/**
 * @author boyeon
 */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  setUserAlert,
  userInfo,
  setUserAge,
  cancellation,
} from "../../../api/mypageAPI";
import { ClickableSpan } from "../../atoms/ClickableSpan";
import { LetterOptions } from "../../../constants/Options";
import DropDownInput from "../../atoms/DropDownInput";
import {
  popConfirmAlert,
  popErrorAlert,
  popSuccessAlert,
} from "../../../utils/sweetAlert";
import { useSetRecoilState } from "recoil";
import { loginState, userState } from "../../../recoil/Atoms";

export const MypageSettingMobile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const setIsLogin = useSetRecoilState(loginState);
  const setUserState = useSetRecoilState(userState);
  const [dropDownIndex, setDropDownIndex] = useState(0);
  const itemList = LetterOptions.AGES;

  useEffect(() => {
    callUserInfo();
  }, []);

  const callUserInfo = async () => {
    const response = await userInfo();
    if (response.status === 200) {
      setUser(response.data);
      setDropDownIndex(parseInt(response.data.ageRange[4]) + 1);
      setIsLoading(false);
    }
  };

  const setAge = async (body) => {
    console.log(body);
    const response = await setUserAge(body);
    if (response.status - 200 < 3 && response.status) {
      popSuccessAlert("", "연령대를 수정하였습니다");
      callUserInfo();
    } else {
      popErrorAlert("", "연령대 변경 요청 실패!");
    }
  };

  const setAlert = async (body) => {
    const response = await setUserAlert(body);
    if (response.status - 200 < 3 && response.status) {
      popSuccessAlert("", "알람 설정을 변경하였습니다.");
      callUserInfo();
    } else {
      popErrorAlert("", "알람 요청 실패!");
    }
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
            <SettingWordsDiv>
              <SettingTitleDiv>
                {"회원님의 연령: "}
                {user.ageRange}
              </SettingTitleDiv>
              <SettingExpln>
                회원님의 연령대를 등록하거나 변경하실 수 있습니다.
              </SettingExpln>
            </SettingWordsDiv>
            <SettingButtonDiv>
              <ClickableSpan>변경하기</ClickableSpan>
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
                isHide={user.isAlertActive}
                onClick={() => {
                  setAlert({ isAlertActive: true });
                }}
              >
                OFF
              </ClickableSpan>
              <ClickableSpan
                isHide={!user.isAlertActive}
                onClick={() => {
                  setAlert({ isAlertActive: false });
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
                  setCancellation();
                }}
              >
                계정탈퇴
              </ClickableSpan>
            </SettingButtonDiv>
          </SettingDiv>
        </>
      )}
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
