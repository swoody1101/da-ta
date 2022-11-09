import moment from "moment/moment";
import React from "react";
import styled from "styled-components";
import { ContentElement, ContentLine, ContentWrapper } from "../../../styles/Admin";
import { AdminWrapper } from "../../../styles/Wrapper";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import { MainText, MainSmallText } from "./../../atoms/Text";

const ReportsTemplate = ({ title, categoryList, itemList, handleModal, handleAccuse, flexRate }) => {
	return (
		<AdminWrapper>
			<Title fontSize="2.5rem" color="black" hoverBgOpacity="1">
				{title}
			</Title>
			<ContentWrapper>
				<ContentLine backgroundColor="#B3E5FC">
					{categoryList.map((item, index) => (
						<ContentElement flex={flexRate[index]} fontWeight="bold" key={index}>
							{item}
						</ContentElement>
					))}
				</ContentLine>
				<>
					{itemList && itemList.length > 0 ? (
						itemList.map((item, index) => (
							<ContentLine key={index}>
								<ContentElement flex={flexRate[0]}>{index + 1}</ContentElement>
								<ContentElement flex={flexRate[1]}>{moment(item.reportedTime).format("YYYY년 MM월 DD일")}</ContentElement>
								<ContentElement flex={flexRate[2]}>{item.reporterNickname}</ContentElement>
								<ContentElement flex={flexRate[3]}>{item.reportedNickname}</ContentElement>
								<ContentElement flex={flexRate[4]}>{item.reason}</ContentElement>
								<ContentElement flex={flexRate[5]}>
									<Button bgColor="#49C288" width="90%" height="70%" onClick={() => handleModal(item)}>
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

export default ReportsTemplate;
