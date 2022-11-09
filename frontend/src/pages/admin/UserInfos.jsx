import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { getUserList, putPermission } from "../../api/adminAPI";
import { loadingState } from "../../recoil/Atoms";
import { popSuccessAlert, popWarningAlert } from "./../../utils/sweetAlert";
import UserInfosTemplate from "./../../components/templates/admin/UserInfosTemplate";
import { RoleTypes } from "./../../constants/Roles";

const UserInfos = () => {
  const flexRate = [1, 4, 2, 2, 1, 1];
  const categoryList = [
    "번호",
    "닉네임",
    "연령대",
    "사용자 권한",
    "활성 여부",
    "정지 여부",
  ];
  const setLoading = useSetRecoilState(loadingState);
  const [itemList, setItemList] = useState([]);
  const [trigger, setTrigger] = useState();

  useEffect(async () => {
    setLoading(true);
    const response = await getUserList();
    setLoading(false);

    if (response.status !== 200) {
      popWarningAlert(
        "사용자 목록 조회 실패",
        "사용자 목록을 불러오던 중 문제가 발생했습니다."
      );
      return;
    }
    setItemList([...response.data.users]);
  }, []);

  /** 권한부여 처리 */
  const handlePermission = async (userId, role, e) => {
    setLoading(true);
    const response = await putPermission(userId, role);
    setLoading(false);

    if (response.status !== 200 && response.status !== 201) {
      popWarningAlert("권한 변경 실패", "권한 변경 중 문제가 발생했습니다.");
      return;
    }

    popSuccessAlert("권한 변경 성공", "권한이 성공적으로 변경되었습니다");
    let tmp = [...itemList];
    tmp[userId - 1].role =
      role === RoleTypes.ADMIN ? RoleTypes.MEMBER : RoleTypes.ADMIN;
    setItemList(tmp);
  };

  return (
    <>
      <UserInfosTemplate
        title={"사용자 목록 조회"}
        categoryList={categoryList}
        itemList={itemList}
        handlePermission={handlePermission}
        flexRate={flexRate}
      />
    </>
  );
};

export default UserInfos;
