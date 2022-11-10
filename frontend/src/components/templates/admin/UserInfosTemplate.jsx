import React from "react";
import { LetterOptions } from "../../../constants/Options";
import { AdminWrapper } from "../../../styles/Wrapper";
import Title from "../../atoms/Title";
import { ContentElement, ContentLine, ContentWrapper } from "../../../styles/Admin";
import { RoleTypes } from "./../../../constants/Roles";
import { MainSmallText } from "../../atoms/Text";
import Button from "../../atoms/Button";

const UserInfosTemplate = ({ title, categoryList, itemList, handlePermission, flexRate }) => {
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
								<ContentElement flex={flexRate[0]}>{item.userId}</ContentElement>
								<ContentElement flex={flexRate[1]}>{item.nickname}</ContentElement>
								<ContentElement flex={flexRate[2]}>{item.ageRange}</ContentElement>
								<ContentElement flex={flexRate[3]}>
									<Button
										bgColor={item.role === RoleTypes.MEMBER ? "#49C288" : "#FF6C00"}
										width="90%"
										height="70%"
										onClick={(e) => handlePermission(item.userId, item.role, e)}
									>
										{item.role === RoleTypes.MEMBER ? "권한 부여" : "권한 제거"}
									</Button>
								</ContentElement>
								<ContentElement flex={flexRate[4]}>{item.active ? "O" : "X"}</ContentElement>
								<ContentElement flex={flexRate[5]}>{item.banStatus.isBan ? "O" : "X"}</ContentElement>
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

export default UserInfosTemplate;
