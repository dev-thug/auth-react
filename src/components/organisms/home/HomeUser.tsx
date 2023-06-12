import { Box, Typography } from "@mui/material";

import { observer } from "mobx-react-lite";

const HomeUser = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h1>기능</h1>
      <li>
        사용자 등록
        <ul>필요한 속성(이름, 이메일, 전화번호)을 제공하여 사용자 등록</ul>
        <ul>유효성 검사를 수행하고 사용자 자격 증명을 안전하게 저장</ul>
        <ul>이메일 검증을 위한 모드(link, otp)</ul>
      </li>
      <li>
        사용자 로그인
        <ul>사용자가 자신을 인증할 수 있는 로그인 메커니즘을 제공</ul>
        <ul>사용자의 자격 증명을 확인하고 추가 권한 부여를 위해 토큰을 생성</ul>
      </li>
      <li>
        암호 관리
        <ul>암호 재설정, 암호 변경, 암호 강도 검증과 같은 암호 관리 기능</ul>
        <ul>해싱 기술을 사용하여 암호가 안전하게 저장</ul>
      </li>
      <li>
        권한 부여
        <ul>리소스 또는 API에 대한 액세스를 제어하는 권한 부여 메커니즘</ul>
        <ul>
          사용자 권한에 따라 액세스를 제한하거나 부여하는 역할, 권한 및 정책을
          정의
        </ul>
      </li>
      <li>
        토큰 관리
        <ul>
          Access Token과 토큰 새로 고침을 위한 메커니즘인 Refresh Token 제공
        </ul>
        <ul>발행된 토큰 취소 리 기능</ul>
        <ul>
          토큰 페이로드에 사용자의 식별자, 역할 또는 권한과 같은 관련 정보를
          포함
        </ul>
        <ul>만료된 토큰 자동 새로고침 (Client-Side)</ul>
      </li>
    </Box>
  );
};

export default observer(HomeUser);
