import React from "react";
import styled from "styled-components";
import { AdminWrapper } from "../../../styles/Wrapper";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import { MainText, MainSmallText } from "./../../atoms/Text";

const ReportsTemplate = ({
  title,
  categoryList,
  itemList,
  handleModal,
  handleAccuse,
  flexRate,
}) => {
  return (
    <AdminWrapper>
      <Title fontSize="2.5rem" color="black" hoverBgOpacity="1">
        {title}
      </Title>
      <ContentWrapper>
        <ContentLine>
          {categoryList.map((item, index) => (
            <ContentElement
              flex={flexRate[index]}
              fontWeight="bold"
              key={index}
            >
              {item}
            </ContentElement>
          ))}
        </ContentLine>
        <>
          {itemList.length > 0 ? (
            itemList.map((item, index) => (
              <ContentLine key={index}>
                <ContentElement flex={flexRate[0]}>{index + 1}</ContentElement>
                <ContentElement flex={flexRate[1]}>
                  {item.reportedTime}
                </ContentElement>
                <ContentElement flex={flexRate[2]}>
                  {item.reporterNickname}
                </ContentElement>
                <ContentElement flex={flexRate[3]}>
                  {item.reportedNickname}
                </ContentElement>
                <ContentElement flex={flexRate[4]}>
                  {item.reason}
                </ContentElement>
                <ContentElement flex={flexRate[5]}>
                  <Button
                    bgColor="#49C288"
                    width="90%"
                    height="70%"
                    onClick={() => handleModal(item)}
                  >
                    보기
                  </Button>
                </ContentElement>
                <ContentElement flex={flexRate[6]}>
                  <Button
                    bgColor={item.isAccused ? "#d9d9d9" : "#FF6C00"}
                    width="90%"
                    height="70%"
                    onClick={(e) => handleAccuse(item, item.reportedUserId, e)}
                  >
                    {item.isAccused ? "완료" : "처리"}
                  </Button>
                </ContentElement>
              </ContentLine>
            ))
          ) : (
            <MainSmallText color={"black"} fontWeight={"bold"}>
              목록이 비어 있습니다.
            </MainSmallText>
          )}
        </>
      </ContentWrapper>
    </AdminWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
`;

const ContentLine = styled.div`
  display: flex;
  width: 100%;
  border-bottom: ${(props) => props.borderBottom};
  font-size: 1rem;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const ContentElement = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  height: 4rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: ${(props) => props.fontWeight};
`;

export default ReportsTemplate;
